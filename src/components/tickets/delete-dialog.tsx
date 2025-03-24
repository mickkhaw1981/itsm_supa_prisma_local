import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface DeleteDialogProps {
  ticketId: string;
  ticketTitle: string;
  onDelete: (id: string) => void;
  trigger: React.ReactNode;
}

export function DeleteDialog({
  ticketId,
  ticketTitle,
  onDelete,
  trigger,
}: DeleteDialogProps) {
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    onDelete(ticketId);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Delete Ticket</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete ticket{" "}
            <span className="font-medium">{ticketId}</span>? This action cannot
            be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="py-2">
          <p className="text-sm text-muted-foreground">
            Ticket: <span className="font-medium">{ticketTitle}</span>
          </p>
        </div>
        <DialogFooter className="sm:justify-end">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
