"use client";

import { Button } from "@/components/ui/button";
import { DeleteDialog } from "@/components/tickets/delete-dialog";
import { Ticket } from "@/types/ticket";
import Link from "next/link";
import { ArrowLeft, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface TicketActionButtonsProps {
  ticket: Ticket;
  onDelete?: (id: string) => void;
}

export function TicketActionButtons({
  ticket,
  onDelete,
}: TicketActionButtonsProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = (id: string) => {
    setIsDeleting(true);
    try {
      // In a real app, this would be an API call
      console.log(`Deleting ticket with ID: ${id}`);
      if (onDelete) {
        onDelete(id);
      }
      router.push("/tickets");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <Button
        variant="outline"
        size="sm"
        onClick={() => router.push("/tickets")}
        className="flex items-center gap-1"
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Button>
      <Link href={`/tickets/${ticket.id}/edit`} passHref>
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <Pencil className="h-4 w-4" />
          Edit
        </Button>
      </Link>
      <DeleteDialog
        ticketId={ticket.id}
        ticketTitle={ticket.title}
        onDelete={handleDelete}
        trigger={
          <Button
            variant="outline"
            size="sm"
            className="text-destructive flex items-center gap-1"
            disabled={isDeleting}
          >
            <Trash2 className="h-4 w-4" />
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        }
      />
    </div>
  );
}
