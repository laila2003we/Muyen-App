import { Home, Map, Briefcase, User, Building2, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent } from "@/components/ui/card.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { Authenticated, Unauthenticated } from "convex/react";
import { SignInButton } from "@/components/ui/signin.tsx";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api.js";
import { Skeleton } from "@/components/ui/skeleton.tsx";

export default function Jobs() {
  const jobs = useQuery(api.jobs.list);

  return (
    <div className="min-h-screen bg-background">
      <Unauthenticated>
        <div className="flex items-center justify-center min-h-screen px-4">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold">Welcome to Muyen</h1>
            <p className="text-muted-foreground">Sign in to find inclusive jobs</p>
            <SignInButton />
          </div>
        </div>
      </Unauthenticated>

      <Authenticated>
        <div className="max-w-2xl mx-auto pb-20">
          {/* Header */}
          <div className="sticky top-0 z-10 bg-card border-b px-4 py-4">
            <h1 className="text-2xl font-bold mb-4">Inclusive Jobs</h1>
            <div className="flex gap-2 overflow-x-auto pb-2">
              <Button size="sm" variant="default">All</Button>
              <Button size="sm" variant="outline">IT</Button>
              <Button size="sm" variant="outline">Design</Button>
              <Button size="sm" variant="outline">Retail</Button>
              <Button size="sm" variant="outline">Remote</Button>
            </div>
          </div>

          {/* Jobs List */}
          <div className="p-4 space-y-3">
            {!jobs ? (
              Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-40 w-full" />
              ))
            ) : jobs.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-muted-foreground">No jobs available yet</p>
                </CardContent>
              </Card>
            ) : (
              jobs.map((job) => (
                <Card key={job._id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Building2 className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="font-semibold">{job.title}</h3>
                            <p className="text-sm text-muted-foreground">{job.company}</p>
                          </div>
                          <Badge variant="secondary">♿</Badge>
                        </div>
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {job.location}
                          </span>
                          {job.salary && <span>{job.salary}</span>}
                        </div>
                        <div className="flex gap-2 mt-3 flex-wrap">
                          {job.accessibilityFeatures.slice(0, 3).map((feature) => (
                            <Badge key={feature} variant="outline" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                        <Button size="sm" className="mt-3 w-full">
                          Apply Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {/* Bottom Navigation */}
          <div className="fixed bottom-0 left-0 right-0 bg-card border-t shadow-lg">
            <div className="max-w-2xl mx-auto flex items-center justify-around px-4 py-3">
              <Link to="/home">
                <Button variant="ghost" size="icon">
                  <Home className="h-6 w-6" />
                </Button>
              </Link>
              <Link to="/map">
                <Button variant="ghost" size="icon">
                  <Map className="h-6 w-6" />
                </Button>
              </Link>
              <Link to="/jobs">
                <Button variant="ghost" size="icon" className="text-primary">
                  <Briefcase className="h-6 w-6" />
                </Button>
              </Link>
              <Link to="/profile">
                <Button variant="ghost" size="icon">
                  <User className="h-6 w-6" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Authenticated>
    </div>
  );
}
