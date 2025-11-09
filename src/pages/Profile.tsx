import { Home, Map, Briefcase, User, Settings, LogOut, FileText, Bookmark } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent } from "@/components/ui/card.tsx";
import { Avatar, AvatarFallback } from "@/components/ui/avatar.tsx";
import { Authenticated, Unauthenticated } from "convex/react";
import { SignInButton } from "@/components/ui/signin.tsx";
import { useAuth } from "@/hooks/use-auth.ts";

export default function Profile() {
  const { user, signoutRedirect } = useAuth();

  const menuItems = [
    { icon: FileText, label: "My Applications", count: "3" },
    { icon: Bookmark, label: "Saved Places", count: "12" },
    { icon: Settings, label: "Settings", count: null },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Unauthenticated>
        <div className="flex items-center justify-center min-h-screen px-4">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold">Welcome to Muyen</h1>
            <p className="text-muted-foreground">Sign in to view your profile</p>
            <SignInButton />
          </div>
        </div>
      </Unauthenticated>

      <Authenticated>
        <div className="max-w-2xl mx-auto pb-20">
          {/* Header */}
          <div className="bg-primary text-primary-foreground px-6 py-8 rounded-b-3xl">
            <div className="flex flex-col items-center text-center space-y-4">
              <Avatar className="h-24 w-24 border-4 border-white">
                <AvatarFallback className="text-3xl bg-white text-primary">
                  {user?.profile?.name?.[0] || "U"}
                </AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-2xl font-bold">{user?.profile?.name || "User"}</h2>
                <p className="opacity-90">{user?.profile?.email || ""}</p>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="p-4 space-y-3 mt-4">
            {menuItems.map((item) => (
              <Card key={item.label} className="cursor-pointer hover:shadow-lg transition-shadow">
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <span className="font-medium">{item.label}</span>
                  </div>
                  {item.count && (
                    <span className="text-sm text-muted-foreground">{item.count}</span>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Sign Out */}
          <div className="px-4 mt-6">
            <Button 
              onClick={() => signoutRedirect()} 
              variant="outline" 
              className="w-full"
              size="lg"
            >
              <LogOut className="h-5 w-5 mr-2" />
              Sign Out
            </Button>
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
