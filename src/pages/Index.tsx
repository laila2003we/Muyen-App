import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";
import { Authenticated, Unauthenticated } from "convex/react";
import { SignInButton } from "@/components/ui/signin.tsx";
import { useEffect } from "react";

export default function Index() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10">
      <Unauthenticated>
        <div className="text-center space-y-8 px-4 max-w-md mx-auto">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Muyan
            </h1>
            <p className="text-xl text-muted-foreground">
              Connect, share, and explore with the world
            </p>
          </div>
          <div className="space-y-4">
            <SignInButton />
            <p className="text-sm text-muted-foreground">
              Join thousands of users sharing their stories
            </p>
          </div>
        </div>
      </Unauthenticated>

      <Authenticated>
        <div className="text-center space-y-6 px-4">
          <h1 className="text-4xl font-bold">Welcome back!</h1>
          <Button size="lg" onClick={() => navigate("/home")}>
            Go to Home
          </Button>
        </div>
      </Authenticated>
    </div>
  );
}
