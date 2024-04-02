import Link from "next/link";
import { useRouter } from "next/navigation";
import { type RouterOutputs } from "~/utils/api";

type CardProps = RouterOutputs["job"]["getJobByTitle"];

const Card = (job: CardProps) => {
  const router = useRouter();

  if (!job) return <div>Error</div>;

  return (
    <div className="card m-5 w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">
          <Link href={`/jobs/${job.title}`}>{job.title}</Link>
          <div className="badge badge-neutral">{job.pdl_count}</div>
        </h2>
      </div>
      <div className="card-actions justify-end p-3">
        {job?.top_related_titles.map((title) => {
          return (
            <button
              key={`${title}-${job.id}`}
              className="btn btn-sm"
              onClick={() => router.push(`jobs/${title.trim()}`)}
            >
              {title}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Card;
