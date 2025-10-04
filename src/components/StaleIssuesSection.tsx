import { Issue } from "@/types/github";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertTriangle, UserX } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "sonner";

interface StaleIssuesSectionProps {
  issues: Issue[];
}

const StaleIssuesSection = ({ issues }: StaleIssuesSectionProps) => {
  const staleIssues = issues.filter((issue) => issue.status === "stale");

  const handleReleaseAssignment = (issue: Issue) => {
    toast.success(`Assignment released for issue #${issue.number}`);
  };

  if (staleIssues.length === 0) {
    return null;
  }

  return (
    <Card className="p-5 bg-destructive/5 border-destructive/20">
      <div className="flex items-center gap-2 mb-4">
        <AlertTriangle className="w-5 h-5 text-destructive" />
        <h2 className="text-lg font-semibold text-foreground">
          Stale Issues Detected
        </h2>
      </div>

      <p className="text-sm text-muted-foreground mb-4">
        These issues have been assigned for 10+ days without any linked PR.
        Consider releasing the assignment to allow others to contribute.
      </p>

      <div className="space-y-3">
        {staleIssues.map((issue) => (
          <div
            key={issue.id}
            className="flex items-center justify-between gap-4 p-3 bg-card rounded-lg border border-border"
          >
            <div className="flex items-center gap-3 flex-1 min-w-0">
              <span className="text-sm font-mono text-muted-foreground">
                #{issue.number}
              </span>
              {issue.assignee && (
                <Avatar className="w-7 h-7">
                  <AvatarImage src={issue.assignee.avatar_url} />
                  <AvatarFallback>
                    {issue.assignee.login.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{issue.title}</p>
                <p className="text-xs text-muted-foreground">
                  {issue.days_since_assigned} days without activity
                </p>
              </div>
            </div>

            <Button
              variant="destructive"
              size="sm"
              onClick={() => handleReleaseAssignment(issue)}
              className="gap-2 shrink-0"
            >
              <UserX className="w-4 h-4" />
              Release
            </Button>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default StaleIssuesSection;
