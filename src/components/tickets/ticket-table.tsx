"use client";

import { useState } from "react";
import { Ticket } from "@/types/ticket";
import { columns } from "@/components/tickets/ticket-table-columns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";

interface TicketTableProps {
  tickets: Ticket[];
  onDelete: (id: string) => void;
}

export function TicketTable({ tickets, onDelete }: TicketTableProps) {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Ticket;
    direction: "ascending" | "descending";
  } | null>(null);

  const handleSort = (key: keyof Ticket) => {
    let direction: "ascending" | "descending" = "ascending";

    if (sortConfig && sortConfig.key === key) {
      direction =
        sortConfig.direction === "ascending" ? "descending" : "ascending";
    }

    setSortConfig({ key, direction });
  };

  // Sort tickets based on sortConfig
  const sortedTickets = [...tickets].sort((a, b) => {
    if (!sortConfig) return 0;

    const key = sortConfig.key;
    const valueA = a[key];
    const valueB = b[key];

    if (key === "createdAt" || key === "updatedAt") {
      const dateA = new Date(valueA as Date).getTime();
      const dateB = new Date(valueB as Date).getTime();
      return sortConfig.direction === "ascending"
        ? dateA - dateB
        : dateB - dateA;
    }

    if (typeof valueA === "string" && typeof valueB === "string") {
      return sortConfig.direction === "ascending"
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    }

    return 0;
  });

  if (tickets.length === 0) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center py-10">
            <h3 className="text-lg font-medium">No tickets found</h3>
            <p className="text-muted-foreground mt-2">
              Try adjusting your filters or create a new ticket.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent className="p-0">
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((column) => (
                  <TableHead
                    key={column.id}
                    className={
                      column.id !== "actions" && column.id in sortedTickets[0]
                        ? "cursor-pointer select-none"
                        : ""
                    }
                    onClick={() => {
                      if (
                        column.id !== "actions" &&
                        column.id in sortedTickets[0]
                      ) {
                        handleSort(column.id as keyof Ticket);
                      }
                    }}
                  >
                    <div className="flex items-center space-x-1">
                      <span>{column.header}</span>
                      {sortConfig && sortConfig.key === column.id && (
                        <span>
                          {sortConfig.direction === "ascending" ? "↑" : "↓"}
                        </span>
                      )}
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedTickets.map((ticket) => (
                <TableRow key={ticket.id}>
                  {columns.map((column) => (
                    <TableCell key={`${ticket.id}-${column.id}`}>
                      {column.id === "actions"
                        ? // @ts-ignore - We know this is safe because we're checking the id
                          column.cell(ticket, onDelete)
                        : // @ts-ignore - We know this is safe because these cells only need one argument
                          column.cell(ticket)}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
