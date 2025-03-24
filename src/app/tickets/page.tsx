"use client";

import { useState, useEffect } from "react";
import { tickets } from "@/lib/mock/tickets";
import { TicketTable } from "@/components/tickets/ticket-table";
import { getTicketColumns } from "@/components/tickets/ticket-table-columns";
import { TicketFilters } from "@/components/tickets/ticket-filters";
import { Ticket } from "@/types/ticket";

export default function TicketsPage() {
  const [filteredTickets, setFilteredTickets] = useState<Ticket[]>(tickets);
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    let filtered = [...tickets];

    // Apply status filter
    if (statusFilter) {
      filtered = filtered.filter((ticket) => ticket.status === statusFilter);
    }

    // Apply priority filter
    if (priorityFilter) {
      filtered = filtered.filter(
        (ticket) => ticket.priority === priorityFilter
      );
    }

    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (ticket) =>
          ticket.title.toLowerCase().includes(query) ||
          ticket.description.toLowerCase().includes(query) ||
          ticket.category.toLowerCase().includes(query) ||
          (ticket.assignedTo && ticket.assignedTo.toLowerCase().includes(query))
      );
    }

    setFilteredTickets(filtered);
  }, [statusFilter, priorityFilter, searchQuery]);

  const resetFilters = () => {
    setStatusFilter("");
    setPriorityFilter("");
    setSearchQuery("");
  };

  const handleDeleteTicket = (id: string) => {
    // In a real app, this would call an API
    setFilteredTickets((prevTickets) =>
      prevTickets.filter((ticket) => ticket.id !== id)
    );
  };

  const columns = getTicketColumns(handleDeleteTicket);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Tickets</h1>
      </div>

      <TicketFilters
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        priorityFilter={priorityFilter}
        setPriorityFilter={setPriorityFilter}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        resetFilters={resetFilters}
      />

      <TicketTable
        columns={columns}
        data={filteredTickets}
        onDelete={handleDeleteTicket}
      />
    </div>
  );
}
