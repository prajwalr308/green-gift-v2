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
    return ctx.prisma.posts.findMany({
      include: {
        PostLikes: true,
        PostComments: true,
      },
    });
  }),
  getPostById: publicProcedure
    .input(z.object({ postId: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.posts.findUnique({
        where: { id: input.postId },
      });
    }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),

  create: protectedProcedure
    .input(
      z.object({
        title: z.string().min(4),
        content: z.string().min(4),
        image: z.string().url(),
        location: z.string().min(4),
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
