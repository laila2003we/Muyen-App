import { Home, Compass, User, Settings, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent } from "@/components/ui/card.tsx";
import { Avatar, AvatarFallback } from "@/components/ui/avatar.tsx";
import { Authenticated, Unauthenticated } from "convex/react";
import { SignInButton } from "@/components/ui/signin.tsx";
import { useAuth } from "@/hooks/use-auth.ts";

export default function Profile() {
  const { user, signoutRedirect } = useAuth();

  const stats = [
    { label: "Posts", value: "42" },
    { label: "Followers", value: "1.2K" },
    { label: "Following", value: "384" },
  ];

  const posts = [
    { id: 1, content: "My latest project is live!", likes: 45 },
    { id: 2, content: "Beautiful day for a walk", likes: 32 },
    { id: 3, content: "New blog post coming soon", likes: 28 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Unauthenticated>
        <div className="flex items-center justify-center min-h-screen px-4">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold">Welcome to Muyan</h1>
            <p className="text-muted-foreground">Sign in to view your profile</p>
            <SignInButton />
          </div>
        </div>
      </Unauthenticated>

      <Authenticated>
        <div className="max-w-2xl mx-auto pb-20">
          {/* Header */}
          <div className="sticky top-0 z-10 bg-card border-b px-4 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">Profile</h1>
              <Button variant="ghost" size="icon">
                <Settings className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Profile Info */}
          <div className="p-4 space-y-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <Avatar className="h-24 w-24">
                <AvatarFallback className="text-3xl">
                  {user?.profile?.name?.[0] || "U"}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold">{user?.profile?.name || "User"}</h2>
                <p className="text-muted-foreground">{user?.profile?.email || ""}</p>
              </div>

              {/* Stats */}
              <div className="flex gap-8 py-4">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>

              <Button onClick={() => signoutRedirect()} variant="outline" className="w-full max-w-xs">
                <LogOut className="h-4 w-4 mr-2" />
                Sign Out
              </Button>
            </div>

            {/* Posts */}
            <div className="space-y-3 mt-8">
              <h3 className="font-semibold text-lg">Your Posts</h3>
              {posts.map((post) => (
                <Card key={post.id}>
                  <CardContent className="p-4">
                    <p className="text-sm">{post.content}</p>
                    <p className="text-xs text-muted-foreground mt-2">{post.likes} likes</p>
                  </CardContent>
                </Card>
              ))}
            </div>
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
                <Button variant="ghost" size="icon">
                  <Compass className="h-6 w-6" />
                </Button>
              </Link>
              <Link to="/profile">
                <Button variant="ghost" size="icon" className="text-primary">
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
