import { useState } from "react";
import Card from "~/components/common/Card";
import SearchBar from "~/components/common/Searchbar";
import Toast from "~/components/common/Toast";
import { api, type RouterInputs } from "~/utils/api";

type JobInputs = RouterInputs["job"]["getJobs"];

export default function Home() {
  const [jobInputs, setJobInputs] = useState<JobInputs>({
    searchQuery: "",
    take: 10,
    skip: 0,
  });

  const { searchQuery, skip, take } = jobInputs;

  const {
    data: jobs,
    isLoading,
    isError,
  } = api.job.getJobs.useQuery({
    searchQuery,
    take,
    skip,
  });

  return (
    <>
      <main className="flex flex-col items-center">
        <div className="flex w-full flex-col items-center p-20">
          <SearchBar
            onChange={(e) =>
              setJobInputs({
                ...jobInputs,
                searchQuery: e.target.value,
                skip: 0,
              })
            }
            placeholder="Search jobs"
          ></SearchBar>
        </div>
        {isLoading ? (
          <>
            <span className="loading loading-spinner text-neutral"></span>
          </>
        ) : isError ? (
          <Toast message="There are no results based on this query" />
        ) : (
          <div className="flex w-full flex-col items-center p-10">
            {jobs?.slice(0, jobInputs.take).map((job) => {
              return (
                <Card
                  key={job.id}
                  id={job.id}
                  top_related_titles={job.top_related_titles.slice(0, 3)}
                  title={job.title}
                  pdl_count={job.pdl_count}
                ></Card>
              );
            })}
          </div>
        )}
        <div className="join m-5 grid grid-cols-2">
          <button
            className="btn btn-outline join-item"
            disabled={jobInputs.skip === 0}
            onClick={() =>
              setJobInputs({
                ...jobInputs,
                skip: jobInputs.skip - jobInputs.take,
              })
            }
          >
            Previous page
          </button>
          <button
            className="btn btn-outline join-item"
            disabled={(jobs && jobs.length <= jobInputs.take) ?? !jobs}
            onClick={() =>
              setJobInputs({
                ...jobInputs,
                skip: jobInputs.skip + jobInputs.take,
              })
            }
          >
            Next page
          </button>
        </div>
      </main>
    </>
  );
}
