import { createTRPCRouter } from "~/server/api/trpc";
import { postRouter } from "~/server/api/routers/posts";
import { postLikesRouter } from "./routers/postLikes";
import { profile } from "./routers/profile/profile";
import { postComments } from "./routers/postComments";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  posts: postRouter,
  postLikes: postLikesRouter,
  profile: profile,
  postComments: postComments,
});

// export type definition of API
export type AppRouter = typeof appRouter;
