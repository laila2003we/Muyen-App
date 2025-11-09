import { Home, Map as MapIcon, Briefcase, User, MapPin, Accessibility, ParkingSquare, DoorOpen } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent } from "@/components/ui/card.tsx";
import { Badge } from "@/components/ui/badge.tsx";
import { Authenticated, Unauthenticated } from "convex/react";
import { SignInButton } from "@/components/ui/signin.tsx";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api.js";
import { Skeleton } from "@/components/ui/skeleton.tsx";

export default function Map() {
  const places = useQuery(api.places.list);

  return (
    <div className="min-h-screen bg-background">
      <Unauthenticated>
        <div className="flex items-center justify-center min-h-screen px-4">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold">Welcome to Muyen</h1>
            <p className="text-muted-foreground">Sign in to explore accessible places</p>
            <SignInButton />
          </div>
        </div>
      </Unauthenticated>

      <Authenticated>
        <div className="max-w-2xl mx-auto pb-20">
          {/* Header */}
          <div className="sticky top-0 z-10 bg-card border-b px-4 py-4">
            <h1 className="text-2xl font-bold mb-4">Accessible Places</h1>
            <div className="flex gap-2 overflow-x-auto pb-2">
              <Button size="sm" variant="default">
                <Accessibility className="h-4 w-4 mr-2" />
                Wheelchair
              </Button>
              <Button size="sm" variant="outline">
                <ParkingSquare className="h-4 w-4 mr-2" />
                Parking
              </Button>
              <Button size="sm" variant="outline">
                <DoorOpen className="h-4 w-4 mr-2" />
                Elevator
              </Button>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="h-64 bg-muted m-4 rounded-lg flex items-center justify-center">
            <div className="text-center space-y-2">
              <MapPin className="h-12 w-12 mx-auto text-primary" />
              <p className="text-muted-foreground">Map view coming soon</p>
            </div>
          </div>

          {/* Places List */}
          <div className="p-4 space-y-3">
            <h2 className="text-lg font-semibold">Nearby Places</h2>
            {!places ? (
              Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-32 w-full" />
              ))
            ) : places.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-muted-foreground">No places found yet</p>
                </CardContent>
              </Card>
            ) : (
              places.map((place) => (
                <Card key={place._id}>
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="h-16 w-16 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-8 w-8 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{place.name}</h3>
                        <p className="text-sm text-muted-foreground">{place.location}</p>
                        <div className="flex gap-2 mt-2 flex-wrap">
                          {place.features.map((feature) => (
                            <Badge key={feature} variant="secondary" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
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
                <Button variant="ghost" size="icon" className="text-primary">
                  <MapIcon className="h-6 w-6" />
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
