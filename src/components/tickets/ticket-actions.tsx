"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DeleteDialog } from "@/components/tickets/delete-dialog";
import { Ticket } from "@/types/ticket";

interface TicketActionsProps {
  ticket: Ticket;
  onDelete: (id: string) => void;
}

export function TicketActions({ ticket, onDelete }: TicketActionsProps) {
  return (
    <div className="flex items-center gap-2">
      <Link href={`/tickets/${ticket.id}`} passHref>
        <Button variant="outline" size="sm">
          View
        </Button>
      </Link>
      <Link href={`/tickets/${ticket.id}/edit`} passHref>
        <Button variant="outline" size="sm">
          Edit
        </Button>
      </Link>
      <DeleteDialog
        ticketId={ticket.id}
        ticketTitle={ticket.title}
        onDelete={onDelete}
        trigger={
          <Button variant="outline" size="sm" className="text-destructive">
            Delete
          </Button>
        }
      />
    </div>
  );
}
