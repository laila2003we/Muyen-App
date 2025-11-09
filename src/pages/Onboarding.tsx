import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";
import { MapPin, Briefcase, Calendar, ChevronRight } from "lucide-react";

export default function Onboarding() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      icon: MapPin,
      title: "Find Accessible Places Easily",
      description: "Discover restaurants, cafes, and venues with wheelchair access, accessible toilets, and more",
    },
    {
      icon: Briefcase,
      title: "Discover Inclusive Jobs",
      description: "Connect with employers who value diversity and provide accessible work environments",
    },
    {
      icon: Calendar,
      title: "Join Local Workshops & Events",
      description: "Participate in inclusive events, training sessions, and community gatherings",
    },
  ];

  const handleNext = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      navigate("/register");
    }
  };

  const handleSkip = () => {
    navigate("/register");
  };

  const Icon = slides[currentSlide].icon;

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background flex flex-col">
      <div className="flex-1 flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center space-y-8">
          <div className="flex justify-center">
            <div className="h-48 w-48 rounded-full bg-primary/10 flex items-center justify-center">
              <Icon className="h-24 w-24 text-primary" />
            </div>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-3xl font-bold">{slides[currentSlide].title}</h2>
            <p className="text-muted-foreground text-lg">
              {slides[currentSlide].description}
            </p>
          </div>

          <div className="flex justify-center gap-2">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`h-2 rounded-full transition-all ${
                  index === currentSlide ? "w-8 bg-primary" : "w-2 bg-primary/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="p-6 space-y-3">
        <Button onClick={handleNext} size="lg" className="w-full">
          {currentSlide < slides.length - 1 ? "Next" : "Get Started"}
          <ChevronRight className="ml-2 h-5 w-5" />
        </Button>
        <Button onClick={handleSkip} variant="ghost" size="lg" className="w-full">
          Skip
        </Button>
      </div>
    </div>
  );
}
