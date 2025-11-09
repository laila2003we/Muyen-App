import { SignInButton } from "@/components/ui/signin.tsx";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";

export default function Register() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <img 
              src="https://cdn.hercules.app/file_7x6wZvUoLwqePUuQLOyseF6Q" 
              alt="Muyen Logo" 
              className="h-24"
            />
          </div>
          <CardTitle className="text-2xl">Welcome to Muyen</CardTitle>
          <p className="text-muted-foreground">
            Empowering Ability through Accessibility
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <SignInButton className="w-full" />
          <p className="text-sm text-center text-muted-foreground">
            By signing in, you agree to our Terms of Service and Privacy Policy
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
