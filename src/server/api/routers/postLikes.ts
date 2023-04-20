import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
} from "~/server/api/trpc";

export const postLikesRouter = createTRPCRouter({
  likedPost: protectedProcedure
    .input(
      z.object({
        postId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const author = ctx.session.user;
      try {
        const post = await ctx.prisma.postLikes.create({
          data: {
            postId: input.postId,
            userId: author.id,
          },
        });
        return post;
      } catch (error) {
        console.log(error);
        return null;
      }
    }),
  unlikedPost: protectedProcedure
    .input(
      z.object({
        postId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const author = ctx.session.user;
      try {
        const post = await ctx.prisma.postLikes.delete({
          where: {
            postId_userId: {
              postId: input.postId,
              userId: author.id,
            },
          },
        });
        return post;
      } catch (error) {
        console.log(error);
        return null;
      }
    }),
});
