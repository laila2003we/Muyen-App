import { Home, Map, Briefcase, User, Calendar, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent } from "@/components/ui/card.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { Authenticated, Unauthenticated } from "convex/react";
import { SignInButton } from "@/components/ui/signin.tsx";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api.js";
import { Skeleton } from "@/components/ui/skeleton.tsx";

export default function Events() {
  const events = useQuery(api.events.list);

  return (
    <div className="min-h-screen bg-background">
      <Unauthenticated>
        <div className="flex items-center justify-center min-h-screen px-4">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold">Welcome to Muyen</h1>
            <p className="text-muted-foreground">Sign in to join events</p>
            <SignInButton />
          </div>
        </div>
      </Unauthenticated>

      <Authenticated>
        <div className="max-w-2xl mx-auto pb-20">
          {/* Header */}
          <div className="sticky top-0 z-10 bg-card border-b px-4 py-4">
            <h1 className="text-2xl font-bold mb-4">Events & Workshops</h1>
            <div className="flex gap-2 overflow-x-auto pb-2">
              <Button size="sm" variant="default">All</Button>
              <Button size="sm" variant="outline">Upcoming</Button>
              <Button size="sm" variant="outline">Online</Button>
              <Button size="sm" variant="outline">Free</Button>
            </div>
          </div>

          {/* Events List */}
          <div className="p-4 space-y-3">
            {!events ? (
              Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-40 w-full" />
              ))
            ) : events.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-muted-foreground">No events available yet</p>
                </CardContent>
              </Card>
            ) : (
              events.map((event) => (
                <Card key={event._id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="h-16 w-16 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Calendar className="h-8 w-8 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-semibold">{event.title}</h3>
                          {event.isFree && (
                            <Badge variant="secondary" className="bg-green-100 text-green-800">
                              Free
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {event.description}
                        </p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {event.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {event.location}
                          </span>
                        </div>
                        <div className="flex gap-2 mt-3 flex-wrap">
                          {event.accessibilityFeatures.slice(0, 2).map((feature) => (
                            <Badge key={feature} variant="outline" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                        <Button size="sm" className="mt-3 w-full">
                          Register for Event
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
                <Button variant="ghost" size="icon">
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
