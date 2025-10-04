import { Card } from "@/components/ui/card";
import { Cookie, Github, AlertTriangle, TrendingUp } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Cookie className="w-16 h-16 text-primary" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-4">
            About Cookie-Licking Detector
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Helping open-source maintainers identify and resolve the
            "cookie-licking" problem in their repositories
          </p>
        </div>

        {/* Problem Statement */}
        <Card className="p-8 mb-8">
          <div className="flex items-start gap-4 mb-4">
            <AlertTriangle className="w-8 h-8 text-warning shrink-0" />
            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-3">
                The Cookie-Licking Problem
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                In open-source projects, "cookie-licking" occurs when a
                contributor claims an issue but never actually delivers a
                solution. Like someone licking a cookie at a party so no one
                else can have it, they're blocking others from contributing
                without making progress themselves.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                This creates bottlenecks, frustrates potential contributors, and
                slows down project development. Our tool helps maintainers detect
                these situations early and take appropriate action.
              </p>
            </div>
          </div>
        </Card>

        {/* Features */}
        <Card className="p-8 mb-8">
          <div className="flex items-start gap-4 mb-6">
            <TrendingUp className="w-8 h-8 text-primary shrink-0" />
            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-3">
                How It Works
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Our platform integrates with GitHub to provide real-time insights
                into issue assignments and progress.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-muted/30 rounded-lg">
              <h3 className="font-semibold text-foreground mb-2">
                🔍 Automatic Detection
              </h3>
              <p className="text-sm text-muted-foreground">
                Identifies issues that have been assigned for 10+ days without any
                linked pull request or recent activity.
              </p>
            </div>

            <div className="p-4 bg-muted/30 rounded-lg">
              <h3 className="font-semibold text-foreground mb-2">
                📊 Visual Timeline
              </h3>
              <p className="text-sm text-muted-foreground">
                Track the complete lifecycle of each issue from creation to
                assignment to merge, with detailed event timelines.
              </p>
            </div>

            <div className="p-4 bg-muted/30 rounded-lg">
              <h3 className="font-semibold text-foreground mb-2">
                👥 Contributor Insights
              </h3>
              <p className="text-sm text-muted-foreground">
                See who your most productive contributors are based on merged PRs
                and completion rates.
              </p>
            </div>

            <div className="p-4 bg-muted/30 rounded-lg">
              <h3 className="font-semibold text-foreground mb-2">
                ⚡ Quick Actions
              </h3>
              <p className="text-sm text-muted-foreground">
                Easily release stale assignments, allowing other contributors to
                step in and make progress.
              </p>
            </div>
          </div>
        </Card>

        {/* Get Started */}
        <Card className="p-8 bg-primary/5 border-primary/20">
          <div className="flex items-start gap-4">
            <Github className="w-8 h-8 text-primary shrink-0" />
            <div>
              <h2 className="text-2xl font-semibold text-foreground mb-3">
                Get Started
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Simply enter any public GitHub repository in the format
                "owner/repo" (e.g., "apache/airflow") on the Dashboard page to
                start tracking issues and detecting cookie-licking behavior.
              </p>
              <p className="text-sm text-muted-foreground">
                Note: Currently using demo data for demonstration purposes. Full
                GitHub API integration coming soon!
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default About;
