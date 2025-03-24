import { ColumnDef, Row } from "@tanstack/react-table";
import { Ticket } from "@/types/ticket";
import { StatusBadge } from "./status-badge";
import { PriorityBadge } from "./priority-badge";
import { TicketActions } from "./ticket-actions";
import Link from "next/link";

export const getTicketColumns = (
  onDelete: (id: string) => void
): ColumnDef<Ticket>[] => [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }: { row: Row<Ticket> }) => {
      const id: string = row.getValue("id");
      return (
        <Link href={`/tickets/${id}`} className="text-blue-600 hover:underline">
          {id.substring(0, 8)}...
        </Link>
      );
    },
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }: { row: Row<Ticket> }) => {
      const id: string = row.original.id;
      return (
        <Link href={`/tickets/${id}`} className="font-medium hover:underline">
          {row.getValue("title")}
        </Link>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }: { row: Row<Ticket> }) => {
      const status: Ticket["status"] = row.getValue("status");
      return <StatusBadge status={status} />;
    },
  },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: ({ row }: { row: Row<Ticket> }) => {
      const priority: Ticket["priority"] = row.getValue("priority");
      return <PriorityBadge priority={priority} />;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }: { row: Row<Ticket> }) => {
      const date: Date = row.getValue("createdAt");
      return <div>{date.toLocaleDateString()}</div>;
    },
  },
  {
    accessorKey: "assignedTo",
    header: "Assigned To",
    cell: ({ row }: { row: Row<Ticket> }) => {
      const assignedTo: string | undefined = row.getValue("assignedTo");
      return <div>{assignedTo || "Unassigned"}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }: { row: Row<Ticket> }) => {
      return <TicketActions ticket={row.original} onDelete={onDelete} />;
    },
  },
];
