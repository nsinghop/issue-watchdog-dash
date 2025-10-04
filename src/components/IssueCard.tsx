import { Issue } from "@/types/github";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ExternalLink, GitPullRequest, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";

interface IssueCardProps {
  issue: Issue;
  onViewTimeline: (issue: Issue) => void;
}

const IssueCard = ({ issue, onViewTimeline }: IssueCardProps) => {
  const getStatusBadge = () => {
    switch (issue.status) {
      case "merged":
        return (
          <Badge className="bg-success text-success-foreground hover:bg-success/90">
            ✅ Merged
          </Badge>
        );
      case "in-progress":
        return (
          <Badge className="bg-warning text-warning-foreground hover:bg-warning/90">
            🔄 In Progress
          </Badge>
        );
      case "stale":
        return (
          <Badge className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
            ⚠️ Stale
          </Badge>
        );
      default:
        return (
          <Badge variant="secondary">
            📋 Unassigned
          </Badge>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="p-5 hover:shadow-lg transition-shadow duration-200">
        <div className="flex flex-col gap-4">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-muted-foreground font-mono text-sm">
                  #{issue.number}
                </span>
                {getStatusBadge()}
              </div>
              <h3 className="text-lg font-semibold text-foreground line-clamp-2 mb-2">
                {issue.title}
              </h3>
              <div className="flex flex-wrap gap-2 mb-3">
                {issue.labels.map((label) => (
                  <Badge
                    key={label.name}
                    variant="outline"
                    style={{
                      borderColor: `#${label.color}`,
                      color: `#${label.color}`,
                    }}
                  >
                    {label.name}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-border">
            <div className="flex items-center gap-3">
              {issue.assignee ? (
                <>
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={issue.assignee.avatar_url} />
                    <AvatarFallback>
                      {issue.assignee.login.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-foreground">
                      {issue.assignee.login}
                    </span>
                    {issue.days_since_assigned && (
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {issue.days_since_assigned}d ago
                      </span>
                    )}
                  </div>
                </>
              ) : (
                <span className="text-sm text-muted-foreground">
                  No assignee
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              {issue.pr_url && (
                <Button variant="ghost" size="sm" asChild>
                  <a
                    href={issue.pr_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gap-1"
                  >
                    <GitPullRequest className="w-4 h-4" />
                  </a>
                </Button>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={() => onViewTimeline(issue)}
              >
                Timeline
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <a
                  href={issue.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default IssueCard;
