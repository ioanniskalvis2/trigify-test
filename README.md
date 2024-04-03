# Trigify test

A simple search engine for job titles using the t3 stack.

## Technologies

### Frontend
- Next.js / Typescript
- Tailwind CSS
- Daisy UI

### Backend
- Next.js / Typescript
- Prisma ORM
- TRPC
- PostgreSQL 

### Deployment
- Vercel (the database is also hosted here) [live-site](https://trigify-test-kappa.vercel.app/)

### Authentication
- Clerk

## Design

### Database structure

#### Job table

| |id  | title | pdl_count| top_related_titles|
|:---: |:---:   |:-------------:|:-------------:| :---: |
| data type|int| string | int |string[]|
| constraints|PK| -    |  - |-|

#### Search table

| |id  | job_id   | created_at | user_id|
|:---: |:---:   |:-------------:|:-------------:| :---: |
| data type|int| int | DateTime |string|
| constraints|PK| FK (Job.id)   | default(now()) |unique |

### API structure

#### Jobs

| Procedure name  | Public   | Input | Output|
|:---: |:---:   |:-------------:|:-------------:|
| getJobs| Yes | searchQuery (string/nullish), take (number), skip (number) |Job[]|
| getJobByTitle|Yes| jobTitle (string)   | Job |

## Design Insights
- I researched the documentation of the website that provided the sample data, so it was easy to know how this data was supposed to be structured, so I just reproduced it within the Job table.
- The issue is though that the top_related_tiles array is basically an array of other jobs, but we don't have access to all that data, so it isn't really possible to denormalise it, that's why I went with this design.
- Another decision which I wouldn't usually make, but I did this time, was to make the getJobyByTitle procedure be based on the job title instead of the id of the job. The reason for this was, so we were able to access individual pages for the top_related_titles, since some of them do exist in the db.
- I added a search model/table, which would be what I would do next to be able to save recent searches, based on the user's id and link that to the job title, so we could then show users their recent searches if they were authenticated.
- TPRC includes error handling and type safety which is great.

### Issues 
- The CSV file with the job data was not a in proper format, so I had to import it into a local database and then transform it to the same format of the Job table using the postgres array method.
- I then had to export that data into a sql dump file and import it to the remote database which is hosted on vercel. I faced a few challenges with this, since it was difficult to synchronise the prisma table structure and all the sql instructions from the dump file. To resolve this I created the empty tables using npx prisma migrate and ended up making the dump file include only the insertions of the data, since both the local table and the table on the remote database, had the same structure.
- Another issue I faced was when I tried to setup vitest to be able to create unit tests for the procedures. I kept running into issues with trying to mock the TRPC context and unfortunately I wasn't able to get it to work within the time limit.

## Task management
- Github issues (https://github.com/users/ioanniskalvis2/projects/2/views/1)


