import { Home as HomeIcon, Map, Briefcase, User, Search, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";
import { Card, CardContent } from "@/components/ui/card.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Authenticated, Unauthenticated } from "convex/react";
import { SignInButton } from "@/components/ui/signin.tsx";
import { useAuth } from "@/hooks/use-auth.ts";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api.js";
import { toast } from "sonner";

export default function Home() {
  const { user } = useAuth();
  const seedData = useMutation(api.seed.seedData);

  const handleSeedData = async () => {
    try {
      await seedData({});
      toast.success("Sample data added successfully!");
    } catch (error) {
      toast.error("Data already exists or error occurred");
    }
  };

  const quickAccess = [
    { icon: Briefcase, title: "Jobs", description: "Find inclusive opportunities", link: "/jobs", color: "bg-blue-500" },
    { icon: Map, title: "Places", description: "Discover accessible locations", link: "/map", color: "bg-green-500" },
    { icon: HomeIcon, title: "Events", description: "Join workshops & meetups", link: "/events", color: "bg-purple-500" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Unauthenticated>
        <div className="flex items-center justify-center min-h-screen px-4">
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold">Welcome to Muyen</h1>
            <p className="text-muted-foreground">Sign in to get started</p>
            <SignInButton />
          </div>
        </div>
      </Unauthenticated>

      <Authenticated>
        <div className="max-w-2xl mx-auto pb-20">
          {/* Header */}
          <div className="bg-primary text-primary-foreground px-6 py-8 rounded-b-3xl">
            <h1 className="text-2xl font-bold mb-2">
              Hello, {user?.profile?.name || "User"} 👋
            </h1>
            <p className="opacity-90">What would you like to explore today?</p>
            
            <div className="mt-6 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 opacity-70" />
              <Input 
                placeholder="Search jobs, places, or events..." 
                className="pl-10 bg-white text-foreground"
              />
            </div>
          </div>

          {/* Quick Access */}
          <div className="px-4 py-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Quick Access</h2>
              <Button size="sm" variant="outline" onClick={handleSeedData}>
                <Plus className="h-4 w-4 mr-1" />
                Add Sample Data
              </Button>
            </div>
            <div className="grid gap-4">
              {quickAccess.map((item) => (
                <Link key={item.title} to={item.link}>
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-4 flex items-center gap-4">
                      <div className={`${item.color} p-3 rounded-xl`}>
                        <item.icon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Bottom Navigation */}
          <div className="fixed bottom-0 left-0 right-0 bg-card border-t shadow-lg">
            <div className="max-w-2xl mx-auto flex items-center justify-around px-4 py-3">
              <Link to="/home">
                <Button variant="ghost" size="icon" className="text-primary">
                  <HomeIcon className="h-6 w-6" />
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
