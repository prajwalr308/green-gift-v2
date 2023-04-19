import { TRPCError } from "@trpc/server";
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const profile = createTRPCRouter({
    getUserByUserId: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ ctx,input }) => {
      const  user = await ctx.prisma.user.findUnique({
        where: {
          id: input.userId,
        },});

      if (!user) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "User not found",
        });
      }
  
      return user;
    }),
});