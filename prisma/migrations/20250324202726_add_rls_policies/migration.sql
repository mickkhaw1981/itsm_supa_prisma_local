-- This is an empty migration.

-- Enable Row Level Security on the Ticket table
ALTER TABLE "Ticket" ENABLE ROW LEVEL SECURITY;

-- Create index on submittedBy field for better RLS performance
CREATE INDEX idx_ticket_submitted_by ON "Ticket" ("submittedBy");

-- Create policy for SELECT - Allow all users to read tickets
CREATE POLICY "Tickets are viewable by everyone" 
ON "Ticket"
FOR SELECT
TO authenticated, anon
USING (true);

-- Create policy for INSERT - Allow anyone to create tickets
CREATE POLICY "Anyone can insert tickets" 
ON "Ticket"
FOR INSERT
TO authenticated, anon
WITH CHECK (true);

-- Create policy for UPDATE - Allow anyone to update any ticket
CREATE POLICY "Anyone can update tickets" 
ON "Ticket"
FOR UPDATE
TO authenticated, anon
USING (true)
WITH CHECK (true);

-- Create policy for DELETE - Allow anyone to delete any ticket
CREATE POLICY "Anyone can delete tickets" 
ON "Ticket"
FOR DELETE
TO authenticated, anon
USING (true);