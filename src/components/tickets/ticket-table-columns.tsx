"use client";

import { Ticket } from "@/types/ticket";
import { StatusBadge } from "@/components/tickets/status-badge";
import { PriorityBadge } from "@/components/tickets/priority-badge";
import { TicketActions } from "@/components/tickets/ticket-actions";
import Link from "next/link";

// Define function types for the cell renderers
type RegularCellRenderer = (ticket: Ticket) => React.ReactNode;
type ActionsCellRenderer = (
  ticket: Ticket,
  onDelete: (id: string) => void
) => React.ReactNode;

// Define a union type that can be either a regular cell or an actions cell
type CellRenderer = RegularCellRenderer | ActionsCellRenderer;

// Define a type for columns that includes the id, header, and cell render function
type Column = {
  id: string;
  header: string;
  cell: CellRenderer;
};

// Column definitions for the ShadCN UI table
export const columns: Column[] = [
  {
    id: "id",
    header: "ID",
    cell: (ticket: Ticket) => (
      <Link
        href={`/tickets/${ticket.id}`}
        className="underline-offset-4 hover:underline text-primary"
      >
        {ticket.id}
      </Link>
    ),
  },
  {
    id: "title",
    header: "Title",
    cell: (ticket: Ticket) => (
      <Link
        href={`/tickets/${ticket.id}`}
        className="underline-offset-4 hover:underline text-primary font-medium"
      >
        {ticket.title}
      </Link>
    ),
  },
  {
    id: "status",
    header: "Status",
    cell: (ticket: Ticket) => <StatusBadge status={ticket.status} />,
  },
  {
    id: "priority",
    header: "Priority",
    cell: (ticket: Ticket) => <PriorityBadge priority={ticket.priority} />,
  },
  {
    id: "createdAt",
    header: "Created At",
    cell: (ticket: Ticket) =>
      new Date(ticket.createdAt).toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }),
  },
  {
    id: "assignedTo",
    header: "Assigned To",
    cell: (ticket: Ticket) => ticket.assignedTo || "Unassigned",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ((ticket: Ticket, onDelete: (id: string) => void) => (
      <TicketActions ticket={ticket} onDelete={onDelete} />
    )) as ActionsCellRenderer,
  },
];
