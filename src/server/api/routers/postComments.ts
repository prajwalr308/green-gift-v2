import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const postComments = createTRPCRouter({
  commentedOnPost: protectedProcedure
    .input(
      z.object({
        postId: z.string(),
        content: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const author = ctx.session.user;
      try {
        const post = await ctx.prisma.postComments.create({
          data: {
            postId: input.postId,
            userId: author.id,
            content: input.content,
          },
        });
        return post;
      } catch (error) {
        console.log(error);
        return null;
      }
    }),
});
