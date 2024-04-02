/*
  Warnings:

  - You are about to drop the `Jobs` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Jobs";

-- CreateTable
CREATE TABLE "Job" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "pdl_count" INTEGER NOT NULL,
    "top_related_titles" TEXT[],

    CONSTRAINT "Job_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Search" (
    "id" SERIAL NOT NULL,
    "job_id" INTEGER NOT NULL,
    "created_at" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Search_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Search_job_id_key" ON "Search"("job_id");

-- CreateIndex
CREATE UNIQUE INDEX "Search_user_id_key" ON "Search"("user_id");

-- AddForeignKey
ALTER TABLE "Search" ADD CONSTRAINT "Search_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "Job"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
