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
}

export function TicketActionButtons({ ticket }: TicketActionButtonsProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  // Handle delete internally instead of accepting a function prop
  const handleDelete = (id: string) => {
    setIsDeleting(true);
    try {
      // Mock delete - in a real app, this would call an API
      console.log(`Deleting ticket with ID: ${id}`);

      // Refresh and redirect
      router.refresh();
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
