import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const jobsRouter = createTRPCRouter({
  getJobs: publicProcedure
    .input(
      z.object({
        searchQuery: z.string().nullish(),
        take: z.number(),
        skip: z.number(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const { searchQuery, take, skip } = input;
      const jobs = await ctx.db.jobs.findMany({
        where: {
          title: { contains: searchQuery ?? "" },
        },
        take: take + 1,
        skip,
      });
      return jobs;
    }),
  getJobByTitle: publicProcedure
    .input(z.object({ jobTitle: z.string() }))
    .query(async ({ ctx, input }) => {
      const job = await ctx.db.jobs.findFirst({
        where: {
          title: input.jobTitle,
        },
      });
      return job;
    }),
});
