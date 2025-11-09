import { Home as HomeIcon, Compass, User, Bell, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent } from "@/components/ui/card.tsx";
import { Avatar, AvatarFallback } from "@/components/ui/avatar.tsx";
import { Authenticated, Unauthenticated } from "convex/react";
import { SignInButton } from "@/components/ui/signin.tsx";

export default function Home() {
  const posts = [
    { id: 1, author: "John Doe", content: "Just finished an amazing workout! Feeling great!", time: "2h ago" },
    { id: 2, author: "Jane Smith", content: "Beautiful sunset today. Nature is incredible.", time: "4h ago" },
    { id: 3, author: "Mike Johnson", content: "New project launched! Check it out!", time: "6h ago" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Unauthenticated>
        <div className="flex items-center justify-center min-h-screen px-4">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold">Welcome to Muyan</h1>
            <p className="text-muted-foreground">Sign in to get started</p>
            <SignInButton />
          </div>
        </div>
      </Unauthenticated>

      <Authenticated>
        <div className="max-w-2xl mx-auto pb-20">
          {/* Header */}
          <div className="sticky top-0 z-10 bg-card border-b px-4 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">Muyan</h1>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Search className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Bell className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 space-y-4">
            {posts.map((post) => (
              <Card key={post.id}>
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <Avatar>
                      <AvatarFallback>{post.author[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">{post.author}</h3>
                        <span className="text-sm text-muted-foreground">{post.time}</span>
                      </div>
                      <p className="text-sm mt-2">{post.content}</p>
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
                <Button variant="ghost" size="icon" className="text-primary">
                  <HomeIcon className="h-6 w-6" />
                </Button>
              </Link>
              <Link to="/explore">
                <Button variant="ghost" size="icon">
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
