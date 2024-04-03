import { type NextPage } from "next";
import { useRouter } from "next/router";
import Card from "~/components/common/Card";
import Toast from "~/components/common/Toast";
import { api } from "~/utils/api";

const JobPage: NextPage = () => {
  const router = useRouter();
  const { title } = router.query;
  const {
    data: job,
    isLoading,
    isError,
  } = api.job.getJobByTitle.useQuery({
    jobTitle: typeof title === "string" ? title : "",
  });

  return (
    <main className="flex flex-col items-center">
      <div className="flex w-full flex-col items-center p-20">
        {isLoading ? (
          <span className="loading loading-spinner loading-lg"></span>
        ) : isError || !job ? (
          <Toast message="There are no results based on this job title" />
        ) : (
          <Card
            title={job?.title}
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
