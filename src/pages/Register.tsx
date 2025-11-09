import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SignInButton } from "@/components/ui/signin.tsx";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Input } from "@/components/ui/input.tsx";
import { Label } from "@/components/ui/label.tsx";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select.tsx";
import { Authenticated, Unauthenticated } from "convex/react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api.js";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export default function Register() {
  const navigate = useNavigate();
  const updateUser = useMutation(api.users.updateCurrentUser);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    disabilityType: "",
    userType: "jobseeker",
    skills: "",
    location: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateUser({
        name: formData.name,
        disabilityType: formData.disabilityType,
        userType: formData.userType,
        skills: formData.skills ? formData.skills.split(",").map(s => s.trim()) : [],
        location: formData.location,
      });
      toast.success("Profile completed successfully!");
      navigate("/home");
    } catch (error) {
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-8">
      <Unauthenticated>
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
            <CardDescription>
              Empowering Ability through Accessibility
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <SignInButton className="w-full" />
            <p className="text-sm text-center text-muted-foreground">
              By signing in, you agree to our Terms of Service and Privacy Policy
            </p>
          </CardContent>
        </Card>
      </Unauthenticated>

      <Authenticated>
        <Card className="max-w-md w-full">
          <CardHeader className="space-y-2">
            <CardTitle className="text-2xl">Complete Your Profile</CardTitle>
            <CardDescription>
              Tell us a bit about yourself to get started
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  placeholder="John Smith"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="disabilityType">Disability Type</Label>
                <Select
                  value={formData.disabilityType}
                  onValueChange={(value) => setFormData({ ...formData, disabilityType: value })}
                >
                  <SelectTrigger id="disabilityType">
                    <SelectValue placeholder="Select type (optional)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="physical">Physical</SelectItem>
                    <SelectItem value="hearing">Hearing</SelectItem>
                    <SelectItem value="vision">Vision</SelectItem>
                    <SelectItem value="cognitive">Cognitive</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                    <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>I am a</Label>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant={formData.userType === "jobseeker" ? "default" : "outline"}
                    className="flex-1"
                    onClick={() => setFormData({ ...formData, userType: "jobseeker" })}
                  >
                    Job Seeker
                  </Button>
                  <Button
                    type="button"
                    variant={formData.userType === "employer" ? "default" : "outline"}
                    className="flex-1"
                    onClick={() => setFormData({ ...formData, userType: "employer" })}
                  >
                    Employer
                  </Button>
                </div>
              </div>

              {formData.userType === "jobseeker" && (
                <div className="space-y-2">
                  <Label htmlFor="skills">Skills / Interests</Label>
                  <Input
                    id="skills"
                    placeholder="Web Design, Marketing, Photography"
                    value={formData.skills}
                    onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                  />
                  <p className="text-xs text-muted-foreground">Separate with commas</p>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="Muscat, Oman"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => navigate("/home")}
                >
                  Skip for Now
                </Button>
                <Button type="submit" className="flex-1" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Continue"
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </Authenticated>
    </div>
  );
}
