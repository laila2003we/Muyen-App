import { Home, Compass, User, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent } from "@/components/ui/card.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Authenticated, Unauthenticated } from "convex/react";
import { SignInButton } from "@/components/ui/signin.tsx";

export default function Explore() {
  const categories = [
    { name: "Technology", posts: 1234 },
    { name: "Design", posts: 856 },
    { name: "Photography", posts: 2341 },
    { name: "Travel", posts: 1567 },
    { name: "Food", posts: 982 },
    { name: "Fitness", posts: 743 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Unauthenticated>
        <div className="flex items-center justify-center min-h-screen px-4">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold">Welcome to Muyan</h1>
            <p className="text-muted-foreground">Sign in to explore</p>
            <SignInButton />
          </div>
        </div>
      </Unauthenticated>

      <Authenticated>
        <div className="max-w-2xl mx-auto pb-20">
          {/* Header */}
          <div className="sticky top-0 z-10 bg-card border-b px-4 py-4">
            <h1 className="text-2xl font-bold mb-4">Explore</h1>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search topics..." className="pl-10" />
            </div>
          </div>

          {/* Content */}
          <div className="p-4 space-y-3">
            {categories.map((category) => (
              <Card key={category.name} className="cursor-pointer hover:bg-accent transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold">{category.name}</h3>
                      <p className="text-sm text-muted-foreground">{category.posts} posts</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Bottom Navigation */}
          <div className="fixed bottom-0 left-0 right-0 bg-card border-t">
            <div className="max-w-2xl mx-auto flex items-center justify-around px-4 py-3">
              <Link to="/home">
                <Button variant="ghost" size="icon">
                  <Home className="h-6 w-6" />
                </Button>
              </Link>
              <Link to="/explore">
                <Button variant="ghost" size="icon" className="text-primary">
                  <Compass className="h-6 w-6" />
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
