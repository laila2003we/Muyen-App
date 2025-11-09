import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    tokenIdentifier: v.string(),
    name: v.optional(v.string()),
    email: v.optional(v.string()),
    disabilityType: v.optional(v.string()),
    userType: v.optional(v.string()),
    skills: v.optional(v.array(v.string())),
    location: v.optional(v.string()),
  }).index("by_token", ["tokenIdentifier"]),
  
  places: defineTable({
    name: v.string(),
    description: v.string(),
    location: v.string(),
    category: v.string(),
    features: v.array(v.string()),
    rating: v.number(),
    imageUrl: v.optional(v.string()),
  }),
  
  jobs: defineTable({
    title: v.string(),
    company: v.string(),
    description: v.string(),
    category: v.string(),
    location: v.string(),
    salary: v.optional(v.string()),
    accessibilityFeatures: v.array(v.string()),
    requirements: v.array(v.string()),
  }),
  
  events: defineTable({
    title: v.string(),
    description: v.string(),
    date: v.string(),
    location: v.string(),
    eventType: v.string(),
    accessibilityFeatures: v.array(v.string()),
    imageUrl: v.optional(v.string()),
    isFree: v.boolean(),
  }),
  
  applications: defineTable({
    userId: v.id("users"),
    jobId: v.id("jobs"),
    status: v.string(),
    resume: v.optional(v.string()),
  }).index("by_user", ["userId"]).index("by_job", ["jobId"]),
});
