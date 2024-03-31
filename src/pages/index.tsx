import Head from "next/head";
import Link from "next/link";
import Navbar from "~/components/common/Navbar";

import { api } from "~/utils/api";

export default function Home() {
  return (
    <>
      <Head>
        <title>Trigify.io Test</title>
        <meta name="description" content="Trigify test by Ioannis Kalvis" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center  bg-gradient-to-b from-[#2e026d] to-[#15162c]">
        <Navbar />
      </main>
    </>
  );
}
