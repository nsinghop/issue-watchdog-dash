import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { GitPullRequest, AlertCircle, CheckCircle2, Clock } from "lucide-react";

const Analytics = () => {
  const statsData = [
    {
      title: "Total Open Issues",
      value: "142",
      icon: AlertCircle,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Merged PRs",
      value: "89",
      icon: CheckCircle2,
      color: "text-success",
      bgColor: "bg-success/10",
    },
    {
      title: "Average Time to Merge",
      value: "4.2 days",
      icon: Clock,
      color: "text-warning",
      bgColor: "bg-warning/10",
    },
    {
      title: "Stale Issues",
      value: "23",
      icon: AlertCircle,
      color: "text-destructive",
      bgColor: "bg-destructive/10",
    },
  ];

  const weeklyData = [
    { name: "Mon", issues: 12, merged: 8 },
    { name: "Tue", issues: 19, merged: 15 },
    { name: "Wed", issues: 15, merged: 12 },
    { name: "Thu", issues: 22, merged: 18 },
    { name: "Fri", issues: 18, merged: 14 },
    { name: "Sat", issues: 9, merged: 7 },
    { name: "Sun", issues: 7, merged: 5 },
  ];

  const contributorData = [
    { name: "johndoe", prs: 23 },
    { name: "sarahsmith", prs: 18 },
    { name: "emilybrown", prs: 15 },
    { name: "mikejones", prs: 12 },
    { name: "alexchen", prs: 9 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-3">
            Analytics Dashboard
          </h1>
          <p className="text-lg text-muted-foreground">
            Track repository metrics and contributor activity over time
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsData.map((stat) => {
            const Icon = stat.icon;
            return (
              <Card key={stat.title} className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
                <h3 className="text-sm font-medium text-muted-foreground mb-1">
                  {stat.title}
                </h3>
                <p className="text-3xl font-bold text-foreground">
                  {stat.value}
                </p>
              </Card>
            );
          })}
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Weekly Activity */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-foreground mb-6">
              Weekly Activity
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="name" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="issues"
                  stroke="hsl(var(--primary))"
                  strokeWidth={2}
                  name="Issues"
                />
                <Line
                  type="monotone"
                  dataKey="merged"
                  stroke="hsl(var(--success))"
                  strokeWidth={2}
                  name="Merged"
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Top Contributors */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-foreground mb-6">
              Top Contributors
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={contributorData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                <XAxis dataKey="name" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="prs" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Additional Metrics */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold text-foreground mb-6">
            Issue Resolution Insights
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium text-foreground">
                  Fastest Resolution Time
                </p>
                <p className="text-sm text-muted-foreground">Issue #49</p>
              </div>
              <span className="text-2xl font-bold text-success">2 days</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium text-foreground">
                  Longest Pending Issue
                </p>
                <p className="text-sm text-muted-foreground">Issue #245</p>
              </div>
              <span className="text-2xl font-bold text-destructive">42 days</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div>
                <p className="font-medium text-foreground">
                  Most Active Day
                </p>
                <p className="text-sm text-muted-foreground">This week</p>
              </div>
              <span className="text-2xl font-bold text-primary">Thursday</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;
