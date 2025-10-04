export interface GitHubUser {
  login: string;
  avatar_url: string;
  html_url: string;
}

export interface Issue {
  id: number;
  number: number;
  title: string;
  state: "open" | "closed";
  created_at: string;
  updated_at: string;
  assignee: GitHubUser | null;
  labels: { name: string; color: string }[];
  html_url: string;
  status: "merged" | "in-progress" | "stale" | "unassigned";
  pr_url?: string;
  days_since_assigned?: number;
}

export interface TimelineEvent {
  id: string;
  type: "opened" | "assigned" | "pr_linked" | "pr_merged" | "comment";
  date: string;
  user: GitHubUser;
  description: string;
}

export interface Contributor {
  user: GitHubUser;
  merged_count: number;
  total_prs: number;
}
