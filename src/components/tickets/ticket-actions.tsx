import { Button } from "@/components/ui/button";
import { DeleteDialog } from "./delete-dialog";
import { Ticket } from "@/types/ticket";
import Link from "next/link";
import { Eye, Edit } from "lucide-react";

interface TicketActionsProps {
  ticket: Ticket;
  onDelete: (id: string) => void;
}

export function TicketActions({ ticket, onDelete }: TicketActionsProps) {
  return (
    <div className="flex gap-2 justify-end">
      <Button variant="outline" size="icon" asChild>
        <Link href={`/tickets/${ticket.id}`}>
          <Eye className="h-4 w-4" />
        </Link>
      </Button>
      <Button variant="outline" size="icon" asChild>
        <Link href={`/tickets/${ticket.id}/edit`}>
          <Edit className="h-4 w-4" />
        </Link>
      </Button>
      <DeleteDialog ticket={ticket} onDelete={onDelete} />
    </div>
  );
}
