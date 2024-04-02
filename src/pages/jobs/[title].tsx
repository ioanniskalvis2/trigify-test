import { type NextPage } from "next";
import { useRouter } from "next/router";
import Card from "~/components/common/Card";
import { api } from "~/utils/api";

const JobPage: NextPage = () => {
  const router = useRouter();
  const { title } = router.query;
  const { data: job, isLoading } = api.job.getJobByTitle.useQuery({
    jobTitle: typeof title === "string" ? title : "",
  });

  if (!job)
    return (
      <div role="alert" className="alert alert-error">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>There are no results based on this job title</span>
      </div>
    );

  return (
    <main className="flex flex-col items-center">
      <div className="flex w-full flex-col items-center p-20">
        {isLoading ? (
          <span className="loading loading-spinner loading-lg"></span>
        ) : (
          <Card
            title={job.title}
            id={job.id}
            pdl_count={job.pdl_count}
            top_related_titles={job.top_related_titles}
          ></Card>
        )}
      </div>
    </main>
  );
};

export default JobPage;
