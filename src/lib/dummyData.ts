import { Issue, Contributor, TimelineEvent } from "@/types/github";

export const dummyIssues: Issue[] = [
  {
    id: 1,
    number: 49,
    title: "Add dark mode support to settings panel",
    state: "open",
    created_at: "2024-09-15T10:30:00Z",
    updated_at: "2024-09-20T14:22:00Z",
    assignee: {
      login: "johndoe",
      avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=johndoe",
      html_url: "https://github.com/johndoe",
    },
    labels: [{ name: "feature", color: "0969DA" }],
    html_url: "https://github.com/example/repo/issues/49",
    status: "merged",
    pr_url: "https://github.com/example/repo/pull/52",
  },
  {
    id: 2,
    number: 87,
    title: "Fix memory leak in data processing module",
    state: "open",
    created_at: "2024-09-18T08:15:00Z",
    updated_at: "2024-09-25T16:45:00Z",
    assignee: {
      login: "sarahsmith",
      avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarahsmith",
      html_url: "https://github.com/sarahsmith",
    },
    labels: [{ name: "bug", color: "d73a4a" }],
    html_url: "https://github.com/example/repo/issues/87",
    status: "in-progress",
    pr_url: "https://github.com/example/repo/pull/90",
    days_since_assigned: 5,
  },
  {
    id: 3,
    number: 112,
    title: "Update documentation for API endpoints",
    state: "open",
    created_at: "2024-08-20T12:00:00Z",
    updated_at: "2024-08-22T09:30:00Z",
    assignee: {
      login: "mikejones",
      avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=mikejones",
      html_url: "https://github.com/mikejones",
    },
    labels: [{ name: "docs", color: "0075ca" }],
    html_url: "https://github.com/example/repo/issues/112",
    status: "stale",
    days_since_assigned: 35,
  },
  {
    id: 4,
    number: 156,
    title: "Implement OAuth2 authentication flow",
    state: "open",
    created_at: "2024-09-22T14:20:00Z",
    updated_at: "2024-09-28T11:10:00Z",
    assignee: {
      login: "emilybrown",
      avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=emilybrown",
      html_url: "https://github.com/emilybrown",
    },
    labels: [{ name: "feature", color: "0969DA" }],
    html_url: "https://github.com/example/repo/issues/156",
    status: "in-progress",
    pr_url: "https://github.com/example/repo/pull/160",
    days_since_assigned: 3,
  },
  {
    id: 5,
    number: 203,
    title: "Refactor database connection pooling",
    state: "open",
    created_at: "2024-09-01T09:45:00Z",
    updated_at: "2024-09-03T15:20:00Z",
    assignee: null,
    labels: [{ name: "enhancement", color: "a2eeef" }],
    html_url: "https://github.com/example/repo/issues/203",
    status: "unassigned",
  },
  {
    id: 6,
    number: 245,
    title: "Add unit tests for payment processing",
    state: "open",
    created_at: "2024-08-15T11:30:00Z",
    updated_at: "2024-08-17T10:15:00Z",
    assignee: {
      login: "alexchen",
      avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=alexchen",
      html_url: "https://github.com/alexchen",
    },
    labels: [{ name: "testing", color: "d876e3" }],
    html_url: "https://github.com/example/repo/issues/245",
    status: "stale",
    days_since_assigned: 42,
  },
];

export const dummyContributors: Contributor[] = [
  {
    user: {
      login: "johndoe",
      avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=johndoe",
      html_url: "https://github.com/johndoe",
    },
    merged_count: 23,
    total_prs: 25,
  },
  {
    user: {
      login: "sarahsmith",
      avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarahsmith",
      html_url: "https://github.com/sarahsmith",
    },
    merged_count: 18,
    total_prs: 20,
  },
  {
    user: {
      login: "emilybrown",
      avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=emilybrown",
      html_url: "https://github.com/emilybrown",
    },
    merged_count: 15,
    total_prs: 17,
  },
  {
    user: {
      login: "mikejones",
      avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=mikejones",
      html_url: "https://github.com/mikejones",
    },
    merged_count: 12,
    total_prs: 15,
  },
  {
    user: {
      login: "alexchen",
      avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=alexchen",
      html_url: "https://github.com/alexchen",
    },
    merged_count: 9,
    total_prs: 12,
  },
];

export const getTimelineForIssue = (issueId: number): TimelineEvent[] => {
  const timelines: Record<number, TimelineEvent[]> = {
    1: [
      {
        id: "1",
        type: "opened",
        date: "2024-09-15T10:30:00Z",
        user: {
          login: "projectowner",
          avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=projectowner",
          html_url: "https://github.com/projectowner",
        },
        description: "Issue opened",
      },
      {
        id: "2",
        type: "assigned",
        date: "2024-09-16T09:15:00Z",
        user: {
          login: "johndoe",
          avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=johndoe",
          html_url: "https://github.com/johndoe",
        },
        description: "Assigned to johndoe",
      },
      {
        id: "3",
        type: "pr_linked",
        date: "2024-09-18T14:20:00Z",
        user: {
          login: "johndoe",
          avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=johndoe",
          html_url: "https://github.com/johndoe",
        },
        description: "PR #52 opened",
      },
      {
        id: "4",
        type: "pr_merged",
        date: "2024-09-20T14:22:00Z",
        user: {
          login: "projectowner",
          avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=projectowner",
          html_url: "https://github.com/projectowner",
        },
        description: "PR #52 merged",
      },
    ],
    2: [
      {
        id: "1",
        type: "opened",
        date: "2024-09-18T08:15:00Z",
        user: {
          login: "projectowner",
          avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=projectowner",
          html_url: "https://github.com/projectowner",
        },
        description: "Issue opened",
      },
      {
        id: "2",
        type: "assigned",
        date: "2024-09-19T11:30:00Z",
        user: {
          login: "sarahsmith",
          avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarahsmith",
          html_url: "https://github.com/sarahsmith",
        },
        description: "Assigned to sarahsmith",
      },
      {
        id: "3",
        type: "pr_linked",
        date: "2024-09-23T16:45:00Z",
        user: {
          login: "sarahsmith",
          avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarahsmith",
          html_url: "https://github.com/sarahsmith",
        },
        description: "PR #90 opened",
      },
    ],
  };

  return timelines[issueId] || [];
};
