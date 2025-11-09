import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { ConvexError } from "convex/values";

export const updateCurrentUser = mutation({
  args: {
    name: v.optional(v.string()),
    email: v.optional(v.string()),
    disabilityType: v.optional(v.string()),
    userType: v.optional(v.string()),
    skills: v.optional(v.array(v.string())),
    location: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new ConvexError({
        message: "User not logged in",
        code: "UNAUTHENTICATED",
      });
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier),
      )
      .unique();

    if (user) {
      await ctx.db.patch(user._id, args);
    } else {
      await ctx.db.insert("users", {
        tokenIdentifier: identity.tokenIdentifier,
        name: args.name,
        email: args.email,
        disabilityType: args.disabilityType,
        userType: args.userType,
        skills: args.skills,
        location: args.location,
      });
    }
  },
});

export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return null;
    }

    return await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier),
      )
      .unique();
  },
});
