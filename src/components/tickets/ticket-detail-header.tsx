"use client";

import { Ticket } from "@/types/ticket";
import { StatusBadge } from "@/components/tickets/status-badge";
import { PriorityBadge } from "@/components/tickets/priority-badge";
import { formatDistanceToNow } from "date-fns";

interface TicketDetailHeaderProps {
  ticket: Ticket;
}

export function TicketDetailHeader({ ticket }: TicketDetailHeaderProps) {
  // Format dates for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Calculate relative time
  const getRelativeTime = (dateString: string) => {
    const date = new Date(dateString);
    return formatDistanceToNow(date, { addSuffix: true });
  };

  return (
    <div className="space-y-3">
      <h1 className="text-2xl font-bold md:text-3xl">{ticket.title}</h1>
      <div className="flex flex-wrap gap-2 items-center text-sm">
        <StatusBadge status={ticket.status} />
        <PriorityBadge priority={ticket.priority} />
        <span className="text-muted-foreground ml-1">#{ticket.id}</span>
      </div>
      <div className="flex flex-col space-y-1 text-sm text-muted-foreground">
        <div className="flex items-center">
          <span>Created {getRelativeTime(ticket.createdAt)}</span>
          <span className="mx-2">•</span>
          <span>Updated {getRelativeTime(ticket.updatedAt)}</span>
        </div>
        <div>
          <span className="inline-block" title={formatDate(ticket.createdAt)}>
            {formatDate(ticket.createdAt)}
          </span>
        </div>
      </div>
    </div>
  );
}
