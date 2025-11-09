import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";
import { Authenticated, Unauthenticated } from "convex/react";
import { useEffect } from "react";

export default function Index() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/onboarding");
    }, 2000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
      <Unauthenticated>
        <div className="text-center space-y-6 px-4 animate-fade-in">
          <img 
            src="https://cdn.hercules.app/file_7x6wZvUoLwqePUuQLOyseF6Q" 
            alt="Muyen Logo" 
            className="h-32 mx-auto"
          />
          <h1 className="text-4xl font-bold text-foreground">Muyen</h1>
          <p className="text-lg text-muted-foreground max-w-md">
            Empowering Ability through Accessibility
          </p>
        </div>
      </Unauthenticated>

      <Authenticated>
        <div className="text-center space-y-6 px-4">
          <img 
            src="https://cdn.hercules.app/file_7x6wZvUoLwqePUuQLOyseF6Q" 
            alt="Muyen Logo" 
            className="h-32 mx-auto"
          />
          <h1 className="text-2xl font-bold">Welcome back!</h1>
          <Button size="lg" onClick={() => navigate("/home")}>
            Go to Home
          </Button>
        </div>
      </Authenticated>
    </div>
  );
}
