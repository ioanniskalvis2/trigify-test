import { type NextPage } from "next";
import { useRouter } from "next/router";
import Card from "~/components/common/Card";
import { api } from "~/utils/api";

const JobPage: NextPage = () => {
  const router = useRouter();
  const { title } = router.query;
  const job = api.job.getJobByTitle.useQuery({
    jobTitle: typeof title === "string" ? title : "",
  }).data;

  if (!job) return <div>Error</div>;

  return (
    <main className="flex flex-col items-center">
      <div className="flex w-full flex-col items-center p-20">
        <Card
          title={job.title}
          id={job.id}
          pdl_count={job.pdl_count}
          top_related_titles={job.top_related_titles}
        ></Card>
      </div>
    </main>
  );
};

export default JobPage;
