import { authMiddleware } from "@clerk/nextjs/server";

export default authMiddleware({
  publicRoutes: ["/"],
  ignoredRoutes: ["/((?!api|trpc))(_next.*|.+.[w]+$)", "/api/trpc/job.getJobs"],
});

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
