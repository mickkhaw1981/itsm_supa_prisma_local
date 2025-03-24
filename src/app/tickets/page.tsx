import Link from "next/link";
import { getTicketsFromDb } from "@/lib/db/tickets";
import { TicketFilters } from "@/components/tickets/ticket-filters";
import { TicketTable } from "@/components/tickets/ticket-table";
import { Button } from "@/components/ui/button";

export default async function TicketsPage({
  searchParams,
}: {
  searchParams: any;
}) {
  // Await searchParams in Next.js 15
  const params = await searchParams;

  // Fetch tickets from database
  const allTickets = await getTicketsFromDb();

  // Apply server-side filtering based on searchParams
  const filteredTickets = allTickets.filter((ticket) => {
    // Filter by status if specified
    if (params.status && ticket.status !== params.status) return false;

    // Filter by priority if specified
    if (params.priority && ticket.priority !== params.priority) return false;

    // Filter by search term if specified
    if (params.search) {
      const searchLower = params.search.toLowerCase();
      return (
        ticket.title.toLowerCase().includes(searchLower) ||
        ticket.description.toLowerCase().includes(searchLower) ||
        ticket.id.toLowerCase().includes(searchLower) ||
        (ticket.assignedTo &&
          ticket.assignedTo.toLowerCase().includes(searchLower)) ||
        ticket.submittedBy.toLowerCase().includes(searchLower)
      );
    }

    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Tickets</h1>
        <Link href="/tickets/create" passHref>
          <Button>Create Ticket</Button>
        </Link>
      </div>

      <div className="space-y-4">
        <TicketFilters />
        <TicketTable tickets={filteredTickets} />
      </div>
    </div>
  );
}
