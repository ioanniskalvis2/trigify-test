-- CreateTable
CREATE TABLE "Jobs" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "pdl_count" INTEGER,
    "top_related_titles" TEXT[],

    CONSTRAINT "Jobs_pkey" PRIMARY KEY ("id")
);
