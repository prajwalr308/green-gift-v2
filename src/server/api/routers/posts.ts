import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const postRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.posts.findMany();
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),

  create: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        content: z.string(),
        image: z.string(),
        location: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const author = ctx.session.user;
      try {
        const post = await ctx.prisma.posts.create({
          data: {
            title: input.title,
            content: input.content,
            image: input.image,
            location: input.location,
            authorId: author.id,
          },
        });
        return post;
      } catch (error) {
        console.log(error);
        return null;
      }
    }),
});
