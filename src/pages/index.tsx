import Head from "next/head";
import { useState } from "react";
import Card from "~/components/common/Card";
import SearchBar from "~/components/common/Searchbar";
import { api, type RouterInputs } from "~/utils/api";

type JobInputs = RouterInputs["job"]["getJobs"];

export default function Home() {
  const [jobInputs, setJobInputs] = useState<JobInputs>({
    searchQuery: "",
    take: 10,
    skip: 0,
  });

  const { searchQuery, skip, take } = jobInputs;

  const jobs = api.job.getJobs.useQuery({
    searchQuery,
    take,
    skip,
  }).data;

  return (
    <>
      <Head>
        <title>Trigify.io Test</title>
        <meta name="description" content="Trigify test by Ioannis Kalvis" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center  bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <div className="flex w-full flex-col items-center p-8 lg:flex-row">
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
        <div className="flex w-full flex-col items-center p-10 lg:flex-row">
          {jobs?.slice(0, jobInputs.take)?.map((job) => {
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
        <div className="join grid grid-cols-2">
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
            disabled={jobs && jobs.length <= jobInputs.take}
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
