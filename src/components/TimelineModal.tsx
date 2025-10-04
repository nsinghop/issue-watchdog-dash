import { Issue, TimelineEvent } from "@/types/github";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { GitBranch, UserPlus, GitPullRequest, GitMerge, MessageSquare, Loader2 } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { fetchIssueTimeline, parseRepoUrl } from "@/lib/githubApi";
import { useState, useEffect } from "react";

interface TimelineModalProps {
  issue: Issue | null;
  isOpen: boolean;
  onClose: () => void;
}

const TimelineModal = ({ issue, isOpen, onClose }: TimelineModalProps) => {
  const [timeline, setTimeline] = useState<TimelineEvent[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!issue || !isOpen) return;

    const loadTimeline = async () => {
      setIsLoading(true);
      try {
        const repoInfo = parseRepoUrl(issue.html_url);
        if (repoInfo) {
          const timelineData = await fetchIssueTimeline(
            repoInfo.owner,
            repoInfo.repo,
            issue.number
          );
          setTimeline(timelineData);
        }
      } catch (error) {
        console.error("Error fetching timeline:", error);
        setTimeline([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadTimeline();
  }, [issue, isOpen]);

  if (!issue) return null;

  const getIcon = (type: TimelineEvent["type"]) => {
    switch (type) {
      case "opened":
        return <GitBranch className="w-5 h-5 text-primary" />;
      case "assigned":
        return <UserPlus className="w-5 h-5 text-warning" />;
      case "pr_linked":
        return <GitPullRequest className="w-5 h-5 text-primary" />;
      case "pr_merged":
        return <GitMerge className="w-5 h-5 text-success" />;
      case "comment":
        return <MessageSquare className="w-5 h-5 text-muted-foreground" />;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">
            Issue #{issue.number}: {issue.title}
          </DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : timeline.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            No timeline events available
          </div>
        ) : (
          <div className="space-y-6 mt-4">
            {timeline.map((event, index) => (
            <div key={event.id} className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                  {getIcon(event.type)}
                </div>
                {index < timeline.length - 1 && (
                  <div className="w-0.5 h-full min-h-[40px] bg-border mt-2" />
                )}
              </div>

              <div className="flex-1 pb-6">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Avatar className="w-6 h-6">
                      <AvatarImage src={event.user.avatar_url} />
                      <AvatarFallback>
                        {event.user.login.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-sm">
                      {event.user.login}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {event.description}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {formatDistanceToNow(new Date(event.date), {
                      addSuffix: true,
                    })}
                  </span>
                </div>
              </div>
            </div>
          ))}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default TimelineModal;
