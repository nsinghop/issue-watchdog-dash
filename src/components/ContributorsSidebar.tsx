import { Contributor } from "@/types/github";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy } from "lucide-react";

interface ContributorsSidebarProps {
  contributors: Contributor[];
}

const ContributorsSidebar = ({ contributors }: ContributorsSidebarProps) => {
  return (
    <Card className="p-5">
      <div className="flex items-center gap-2 mb-4">
        <Trophy className="w-5 h-5 text-warning" />
        <h2 className="text-lg font-semibold text-foreground">
          Top Contributors
        </h2>
      </div>

      <div className="space-y-3">
        {contributors.map((contributor, index) => (
          <a
            key={contributor.user.login}
            href={contributor.user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors group"
          >
            <div className="relative">
              <Avatar className="w-10 h-10">
                <AvatarImage src={contributor.user.avatar_url} />
                <AvatarFallback>
                  {contributor.user.login.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              {index === 0 && (
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-warning rounded-full flex items-center justify-center text-xs">
                  🥇
                </div>
              )}
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">
                {contributor.user.login}
              </p>
              <p className="text-xs text-muted-foreground">
                {contributor.merged_count} merged PRs
              </p>
            </div>

            <div className="text-right">
              <p className="text-sm font-bold text-primary">
                {contributor.merged_count}
              </p>
              <p className="text-xs text-muted-foreground">
                / {contributor.total_prs}
              </p>
            </div>
          </a>
        ))}
      </div>
    </Card>
  );
};

export default ContributorsSidebar;
