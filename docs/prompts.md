## Create the UI

We are working in design mode. I want you to only work on the front end UI. You won't be connecting to the database at this point or any functionality.

Our goal is to create the UI for the IT Helpdesk pages (/tickets, /tickets[id]). See @prd.md for context. Add essential ShadCN UI components using command `npx shadcn@latest add <component-name>`. Run command `tree -L 3 -I 'node_modules|.git' ` to get my existing project file tree. No need to worry about Storybook for now.

Can you come up with an implementation plan? No code for now, let's focus on producing a detailed, step-by-step implementation plan. Feel free to add your thoughts to make this better. And ask me clarifying questions if anything is unclear.

You are a senior software engineer whose role is to provide clear, actionable code changes. Based on the implementation plan above, create a very very very detailed markdown checklist of all of the stories for this plan, with one-story-point tasks (with unchecked checkboxes) that break down each story. Include important details and code from the plan, if available. Insert it in .cursor-tasks.md. It is critically important that all of the details to implement this are in this list. Note that a very competent AI Coding Agent will be using this list to autonomously create this application, so be sure not to miss any details whatsoever, no matter how much time and thinking you must do to complete this very challenging but critically important task.

Again, don’t implement anything. I just want a checklist of tasks.

## Turn dummy data in Prisma schema

Using Prisma, help me migrate the database table structure from #helpdesk.ts and #ticket.ts to Supabase. Set up the necessary schema in @schema.prisma . Also add seed data for it in /prisma/seed.ts

## Replace dummy data with

Now that we have connected to Prisma and Supabase, we want to replace the mock data we had used from helpdesks.ts and tickts.ts with actual Supabase queries using Prisma. Load the data from Supabase into all the appropriate components and pages in the app. View @migration.sql for the table structure. Leave helpdesks.ts and tickts.ts unchanged.
