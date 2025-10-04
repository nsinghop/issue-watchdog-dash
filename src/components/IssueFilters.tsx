import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";

interface IssueFiltersProps {
  statusFilter: string;
  assignmentFilter: string;
  labelFilter: string;
  onStatusChange: (value: string) => void;
  onAssignmentChange: (value: string) => void;
  onLabelChange: (value: string) => void;
}

const IssueFilters = ({
  statusFilter,
  assignmentFilter,
  labelFilter,
  onStatusChange,
  onAssignmentChange,
  onLabelChange,
}: IssueFiltersProps) => {
  return (
    <Card className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Status</label>
          <Select value={statusFilter} onValueChange={onStatusChange}>
            <SelectTrigger>
              <SelectValue placeholder="All statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="merged">Merged</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="stale">Stale</SelectItem>
              <SelectItem value="unassigned">Unassigned</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Assignment
          </label>
          <Select value={assignmentFilter} onValueChange={onAssignmentChange}>
            <SelectTrigger>
              <SelectValue placeholder="All issues" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="assigned">Assigned</SelectItem>
              <SelectItem value="unassigned">Unassigned</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Label</label>
          <Select value={labelFilter} onValueChange={onLabelChange}>
            <SelectTrigger>
              <SelectValue placeholder="All labels" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="bug">Bug</SelectItem>
              <SelectItem value="feature">Feature</SelectItem>
              <SelectItem value="docs">Docs</SelectItem>
              <SelectItem value="enhancement">Enhancement</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </Card>
  );
};

export default IssueFilters;
