"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronDown, ChevronUp, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ticket } from "@/types/ticket";
import { deleteTicket } from "@/lib/db/tickets";

interface TicketTableProps {
  tickets: Ticket[];
}

export function TicketTable({ tickets }: TicketTableProps) {
  const router = useRouter();
  const [sortField, setSortField] = useState<keyof Ticket>("createdAt");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  // Handle sort
  const handleSort = (field: keyof Ticket) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Sort tickets
  const sortedTickets = [...tickets].sort((a, b) => {
    const fieldA = a[sortField];
    const fieldB = b[sortField];

    if (fieldA === undefined) return sortDirection === "asc" ? -1 : 1;
    if (fieldB === undefined) return sortDirection === "asc" ? 1 : -1;

    if (typeof fieldA === "string" && typeof fieldB === "string") {
      return sortDirection === "asc"
        ? fieldA.localeCompare(fieldB)
        : fieldB.localeCompare(fieldA);
    }

    // For dates (comparing ISO strings works for chronological ordering)
    return sortDirection === "asc"
      ? fieldA > fieldB
        ? 1
        : -1
      : fieldA < fieldB
        ? 1
        : -1;
  });

  // Handle delete
  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this ticket?")) {
      setIsDeleting(id);
      const success = await deleteTicket(id);
      if (success) {
        router.refresh();
      } else {
        alert("Failed to delete ticket");
      }
      setIsDeleting(null);
    }
  };

  return (
    <div className="rounded-md border">
      <div className="overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="border-b bg-muted/50 text-xs">
              <th className="px-4 py-3 text-left font-medium">
                <button
                  onClick={() => handleSort("id")}
                  className="inline-flex items-center gap-1"
                >
                  ID
                  {sortField === "id" ? (
                    sortDirection === "asc" ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )
                  ) : null}
                </button>
              </th>
              <th className="px-4 py-3 text-left font-medium">
                <button
                  onClick={() => handleSort("title")}
                  className="inline-flex items-center gap-1"
                >
                  Title
                  {sortField === "title" ? (
                    sortDirection === "asc" ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )
                  ) : null}
                </button>
              </th>
              <th className="px-4 py-3 text-left font-medium">
                <button
                  onClick={() => handleSort("status")}
                  className="inline-flex items-center gap-1"
                >
                  Status
                  {sortField === "status" ? (
                    sortDirection === "asc" ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )
                  ) : null}
                </button>
              </th>
              <th className="px-4 py-3 text-left font-medium">
                <button
                  onClick={() => handleSort("priority")}
                  className="inline-flex items-center gap-1"
                >
                  Priority
                  {sortField === "priority" ? (
                    sortDirection === "asc" ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )
                  ) : null}
                </button>
              </th>
              <th className="px-4 py-3 text-left font-medium">
                <button
                  onClick={() => handleSort("createdAt")}
                  className="inline-flex items-center gap-1"
                >
                  Created
                  {sortField === "createdAt" ? (
                    sortDirection === "asc" ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )
                  ) : null}
                </button>
              </th>
              <th className="px-4 py-3 text-right font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedTickets.length > 0 ? (
              sortedTickets.map((ticket) => (
                <tr key={ticket.id} className="border-b hover:bg-muted/50">
                  <td className="px-4 py-3 text-xs">{ticket.id}</td>
                  <td className="max-w-[300px] truncate px-4 py-3 text-sm">
                    <Link
                      href={`/tickets/${ticket.id}`}
                      className="hover:underline"
                    >
                      {ticket.title}
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        ticket.status === "open"
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                          : ticket.status === "in-progress"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                            : ticket.status === "resolved"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                              : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {ticket.status.charAt(0).toUpperCase() +
                        ticket.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        ticket.priority === "low"
                          ? "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                          : ticket.priority === "medium"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                            : ticket.priority === "high"
                              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                      }`}
                    >
                      {ticket.priority.charAt(0).toUpperCase() +
                        ticket.priority.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {new Date(ticket.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/tickets/${ticket.id}`}>View</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/tickets/${ticket.id}/edit`}>Edit</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDelete(ticket.id)}
                          disabled={isDeleting === ticket.id}
                          className="text-red-600 dark:text-red-400"
                        >
                          {isDeleting === ticket.id ? "Deleting..." : "Delete"}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={6}
                  className="py-4 text-center text-muted-foreground"
                >
                  No tickets found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
