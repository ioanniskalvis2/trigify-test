import { type RouterOutputs } from "~/utils/api";

type CardProps = RouterOutputs["job"]["getJobByTitle"];

const Card = (job: CardProps) => {
  return (
    <div className="card w-96 bg-base-100 shadow-xl ">
      <div className="card-body">
        <h2 className="card-title">
          {job?.title}
          <div className="badge badge-neutral">{job?.pdl_count}</div>
        </h2>
      </div>
      <div className="card-actions justify-end p-3">
        {job?.top_related_titles.map((title) => {
          return (
            <button key={`${title}-${job.id}`} className="btn btn-sm">
              {title}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Card;
