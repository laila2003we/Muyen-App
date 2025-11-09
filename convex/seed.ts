import { mutation } from "./_generated/server";

export const seedData = mutation({
  args: {},
  handler: async (ctx) => {
    // Check if data already exists
    const existingPlaces = await ctx.db.query("places").first();
    if (existingPlaces) {
      return { message: "Data already seeded" };
    }

    // Seed Places
    await ctx.db.insert("places", {
      name: "City Mall",
      description: "Modern shopping center with full accessibility",
      location: "Muscat, Oman",
      category: "Shopping",
      features: ["Wheelchair Access", "Accessible Toilets", "Elevator", "Parking"],
      rating: 4.5,
    });

    await ctx.db.insert("places", {
      name: "Green Café",
      description: "Cozy café with ramp access and wide doorways",
      location: "Salalah, Oman",
      category: "Restaurant",
      features: ["Wheelchair Access", "Accessible Entrance"],
      rating: 4.8,
    });

    await ctx.db.insert("places", {
      name: "Public Library",
      description: "Community library with accessible facilities",
      location: "Sohar, Oman",
      category: "Education",
      features: ["Wheelchair Access", "Elevator", "Accessible Toilets", "Audio Books"],
      rating: 4.7,
    });

    // Seed Jobs
    await ctx.db.insert("jobs", {
      title: "Web Developer",
      company: "Tech Solutions Oman",
      description: "Join our inclusive team building innovative web applications",
      category: "IT",
      location: "Muscat, Oman",
      salary: "OMR 800-1200",
      accessibilityFeatures: ["Remote Work", "Flexible Hours", "Accessible Office"],
      requirements: ["React", "TypeScript", "3+ years experience"],
    });

    await ctx.db.insert("jobs", {
      title: "Graphic Designer",
      company: "Creative Hub",
      description: "Design beautiful graphics in an accessible workspace",
      category: "Design",
      location: "Muscat, Oman",
      salary: "OMR 600-900",
      accessibilityFeatures: ["Wheelchair Access", "Screen Readers", "Flexible Hours"],
      requirements: ["Adobe Suite", "Portfolio", "2+ years experience"],
    });

    await ctx.db.insert("jobs", {
      title: "Customer Service Representative",
      company: "Oman Telecom",
      description: "Help customers while working in a supportive environment",
      category: "Customer Service",
      location: "Salalah, Oman",
      salary: "OMR 500-700",
      accessibilityFeatures: ["Accessible Office", "Sign Language Support", "Training Provided"],
      requirements: ["Good communication", "Customer service experience"],
    });

    // Seed Events
    await ctx.db.insert("events", {
      title: "Accessibility Workshop",
      description: "Learn about digital accessibility and inclusive design",
      date: "December 15, 2024",
      location: "Muscat Convention Center",
      eventType: "Workshop",
      accessibilityFeatures: ["Wheelchair Access", "Sign Language Interpreter", "Audio Assistance"],
      isFree: true,
    });

    await ctx.db.insert("events", {
      title: "Job Fair for Inclusive Employers",
      description: "Meet employers committed to diversity and inclusion",
      date: "January 20, 2025",
      location: "Salalah Conference Hall",
      eventType: "Career",
      accessibilityFeatures: ["Wheelchair Access", "Accessible Parking", "Rest Areas"],
      isFree: true,
    });

    await ctx.db.insert("events", {
      title: "Tech Skills Training",
      description: "Free online training in web development and design",
      date: "December 10, 2024",
      location: "Online via Zoom",
      eventType: "Online",
      accessibilityFeatures: ["Closed Captions", "Screen Reader Compatible"],
      isFree: true,
    });

    return { message: "Sample data seeded successfully!" };
  },
});
