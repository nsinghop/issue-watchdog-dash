import { Issue, TimelineEvent, Contributor, GitHubUser } from "@/types/github";

const GITHUB_API_BASE = "https://api.github.com";

interface GitHubIssue {
  id: number;
  number: number;
  title: string;
  state: string;
  created_at: string;
  updated_at: string;
  assignee: GitHubUser | null;
  labels: Array<{ name: string; color: string }>;
  html_url: string;
  pull_request?: { url: string; html_url: string; merged_at: string | null };
  user: GitHubUser;
}

interface GitHubTimelineEvent {
  id: number;
  event: string;
  created_at: string;
  actor: GitHubUser;
  assignee?: GitHubUser;
  source?: {
    issue?: {
      pull_request?: { html_url: string; merged_at: string | null };
    };
  };
}

export const parseRepoUrl = (input: string): { owner: string; repo: string } | null => {
  // Handle formats: "owner/repo", "https://github.com/owner/repo", "https://api.github.com/repos/owner/repo"
  const patterns = [
    /github\.com\/([^\/]+)\/([^\/]+)/,
    /^([^\/]+)\/([^\/]+)$/,
    /api\.github\.com\/repos\/([^\/]+)\/([^\/]+)/,
  ];

  for (const pattern of patterns) {
    const match = input.match(pattern);
    if (match) {
      return { owner: match[1], repo: match[2].replace(/\.git$/, "") };
    }
  }
  return null;
};

const determineIssueStatus = (
  issue: GitHubIssue,
  daysSinceAssigned?: number
): Issue["status"] => {
  if (issue.pull_request?.merged_at) return "merged";
  if (issue.assignee && issue.pull_request) return "in-progress";
  if (issue.assignee && daysSinceAssigned && daysSinceAssigned >= 10) return "stale";
  if (issue.assignee) return "in-progress";
  return "unassigned";
};

export const fetchIssues = async (owner: string, repo: string): Promise<Issue[]> => {
  const response = await fetch(
    `${GITHUB_API_BASE}/repos/${owner}/${repo}/issues?state=all&per_page=50`,
    {
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch issues: ${response.statusText}`);
  }

  const data: GitHubIssue[] = await response.json();

  return data.map((issue) => {
    const daysSinceAssigned = issue.assignee
      ? Math.floor(
          (Date.now() - new Date(issue.updated_at).getTime()) / (1000 * 60 * 60 * 24)
        )
      : undefined;

    return {
      id: issue.id,
      number: issue.number,
      title: issue.title,
      state: issue.state as "open" | "closed",
      created_at: issue.created_at,
      updated_at: issue.updated_at,
      assignee: issue.assignee,
      labels: issue.labels,
      html_url: issue.html_url,
      status: determineIssueStatus(issue, daysSinceAssigned),
      pr_url: issue.pull_request?.html_url,
      days_since_assigned: daysSinceAssigned,
    };
  });
};

export const fetchIssueTimeline = async (
  owner: string,
  repo: string,
  issueNumber: number
): Promise<TimelineEvent[]> => {
  const response = await fetch(
    `${GITHUB_API_BASE}/repos/${owner}/${repo}/issues/${issueNumber}/timeline`,
    {
      headers: {
        Accept: "application/vnd.github.mockingbird-preview+json",
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch timeline: ${response.statusText}`);
  }

  const data: GitHubTimelineEvent[] = await response.json();

  const mappedEvents: TimelineEvent[] = [];

  data.forEach((event) => {
    if (event.event === "assigned" && event.assignee) {
      mappedEvents.push({
        id: `${event.id}`,
        type: "assigned",
        date: event.created_at,
        user: event.actor,
        description: `assigned to ${event.assignee.login}`,
      });
    } else if (event.event === "cross-referenced" && event.source?.issue?.pull_request) {
      mappedEvents.push({
        id: `${event.id}`,
        type: event.source.issue.pull_request.merged_at ? "pr_merged" : "pr_linked",
        date: event.created_at,
        user: event.actor,
        description: event.source.issue.pull_request.merged_at
          ? "merged pull request"
          : "linked pull request",
      });
    } else if (event.event === "commented") {
      mappedEvents.push({
        id: `${event.id}`,
        type: "comment",
        date: event.created_at,
        user: event.actor,
        description: "commented",
      });
    }
  });

  return mappedEvents;
};

export const fetchContributors = async (
  owner: string,
  repo: string
): Promise<Contributor[]> => {
  const response = await fetch(
    `${GITHUB_API_BASE}/repos/${owner}/${repo}/contributors?per_page=10`,
    {
      headers: {
        Accept: "application/vnd.github.v3+json",
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch contributors: ${response.statusText}`);
  }

  const data: Array<GitHubUser & { contributions: number }> = await response.json();

  return data.map((contributor) => ({
    user: {
      login: contributor.login,
      avatar_url: contributor.avatar_url,
      html_url: contributor.html_url,
    },
    merged_count: contributor.contributions,
    total_prs: contributor.contributions,
  }));
};
