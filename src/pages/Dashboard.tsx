import { useState } from "react";
import SearchBar from "@/components/SearchBar";
import IssueCard from "@/components/IssueCard";
import TimelineModal from "@/components/TimelineModal";
import ContributorsSidebar from "@/components/ContributorsSidebar";
import StaleIssuesSection from "@/components/StaleIssuesSection";
import IssueFilters from "@/components/IssueFilters";
import { Issue } from "@/types/github";
import { dummyIssues, dummyContributors } from "@/lib/dummyData";
import { toast } from "sonner";

const Dashboard = () => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [isTimelineOpen, setIsTimelineOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [assignmentFilter, setAssignmentFilter] = useState("all");
  const [labelFilter, setLabelFilter] = useState("all");

  const handleSearch = async (repo: string) => {
    setIsLoading(true);
    toast.info(`Searching for issues in ${repo}...`);
    
    // Simulate API call
    setTimeout(() => {
      setIssues(dummyIssues);
      setIsLoading(false);
      toast.success(`Found ${dummyIssues.length} issues`);
    }, 1500);
  };

  const handleViewTimeline = (issue: Issue) => {
    setSelectedIssue(issue);
    setIsTimelineOpen(true);
  };

  const filteredIssues = issues.filter((issue) => {
    if (statusFilter !== "all" && issue.status !== statusFilter) return false;
    if (assignmentFilter === "assigned" && !issue.assignee) return false;
    if (assignmentFilter === "unassigned" && issue.assignee) return false;
    if (
      labelFilter !== "all" &&
      !issue.labels.some((label) => label.name === labelFilter)
    )
      return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Hero Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-3">
            Track GitHub Issue Progress
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Detect cookie-licking behavior: when contributors claim issues but
            never deliver. Monitor assignments, PRs, and timelines in real-time.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        </div>

        {issues.length > 0 && (
          <>
            {/* Stale Issues Alert */}
            <div className="mb-6">
              <StaleIssuesSection issues={issues} />
            </div>

            {/* Filters */}
            <div className="mb-6">
              <IssueFilters
                statusFilter={statusFilter}
                assignmentFilter={assignmentFilter}
                labelFilter={labelFilter}
                onStatusChange={setStatusFilter}
                onAssignmentChange={setAssignmentFilter}
                onLabelChange={setLabelFilter}
              />
            </div>

            {/* Main Content */}
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Issues Grid */}
              <div className="lg:col-span-2">
                <div className="mb-4">
                  <h2 className="text-xl font-semibold text-foreground">
                    Issues ({filteredIssues.length})
                  </h2>
                </div>
                <div className="grid gap-4">
                  {filteredIssues.map((issue) => (
                    <IssueCard
                      key={issue.id}
                      issue={issue}
                      onViewTimeline={handleViewTimeline}
                    />
                  ))}
                </div>
              </div>

              {/* Contributors Sidebar */}
              <div>
                <ContributorsSidebar contributors={dummyContributors} />
              </div>
            </div>
          </>
        )}

        {!isLoading && issues.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              No repository searched yet
            </h3>
            <p className="text-muted-foreground">
              Enter a GitHub repository above to start tracking issues
            </p>
          </div>
        )}

        {/* Timeline Modal */}
        <TimelineModal
          issue={selectedIssue}
          isOpen={isTimelineOpen}
          onClose={() => setIsTimelineOpen(false)}
        />
      </div>
    </div>
  );
};

export default Dashboard;
