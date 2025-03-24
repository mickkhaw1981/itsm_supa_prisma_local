"use client";

import { useState } from "react";
import Link from "next/link";
import { getTickets } from "@/lib/mock/tickets";
import { TicketFilters } from "@/components/tickets/ticket-filters";
import { TicketTable } from "@/components/tickets/ticket-table";
import { Button } from "@/components/ui/button";
import { Ticket } from "@/types/ticket";

export default function TicketsPage() {
  const allTickets = getTickets();
  const [filteredTickets, setFilteredTickets] = useState<Ticket[]>(allTickets);

  const handleFilterChange = ({
    status,
    priority,
    search,
  }: {
    status?: Ticket["status"];
    priority?: Ticket["priority"];
    search?: string;
  }) => {
    const filtered = allTickets.filter((ticket) => {
      // Filter by status if specified
      if (status && ticket.status !== status) return false;

      // Filter by priority if specified
      if (priority && ticket.priority !== priority) return false;

      // Filter by search term if specified
      if (search) {
        const searchLower = search.toLowerCase();
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

    setFilteredTickets(filtered);
  };

  const handleDelete = (id: string) => {
    // In a real app, this would make an API call
    // For now we'll just filter the tickets client-side
    setFilteredTickets((prev) => prev.filter((ticket) => ticket.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Tickets</h1>
        <Link href="/tickets/create" passHref>
          <Button>Create Ticket</Button>
        </Link>
      </div>

      <div className="space-y-4">
        <TicketFilters onFilterChange={handleFilterChange} />
        <TicketTable tickets={filteredTickets} onDelete={handleDelete} />
      </div>
    </div>
  );
}
