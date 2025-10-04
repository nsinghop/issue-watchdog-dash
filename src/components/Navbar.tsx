import { Cookie, Moon, Sun, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const Navbar = () => {
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="border-b border-border bg-card sticky top-0 z-50 backdrop-blur-sm bg-card/80">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <Cookie className="w-6 h-6 text-primary group-hover:scale-110 transition-transform" />
            <span className="text-xl font-bold text-foreground">
              Cookie-Licking Detector
            </span>
          </Link>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-1">
              <Link to="/">
                <Button
                  variant={isActive("/") ? "secondary" : "ghost"}
                  className="font-medium"
                >
                  Dashboard
                </Button>
              </Link>
              <Link to="/analytics">
                <Button
                  variant={isActive("/analytics") ? "secondary" : "ghost"}
                  className="font-medium"
                >
                  Analytics
                </Button>
              </Link>
              <Link to="/about">
                <Button
                  variant={isActive("/about") ? "secondary" : "ghost"}
                  className="font-medium"
                >
                  About
                </Button>
              </Link>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setDarkMode(!darkMode)}
                className="rounded-full"
              >
                {darkMode ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </Button>

              <Button variant="outline" size="sm" className="gap-2">
                <Github className="w-4 h-4" />
                <span className="hidden sm:inline">Sign in</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
