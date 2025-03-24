import Link from "next/link";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export default function TicketNotFound() {
  return (
    <div className="container mx-auto py-16 text-center">
      <div className="mb-6 flex justify-center">
        <AlertTriangle className="h-20 w-20 text-amber-500" />
      </div>
      <h1 className="text-3xl font-bold">Ticket Not Found</h1>
      <p className="mt-4 text-lg text-muted-foreground">
        The ticket you're looking for doesn't exist or may have been deleted.
      </p>
      <div className="mt-8">
        <Link href="/tickets" passHref>
          <Button>Return to Tickets</Button>
        </Link>
      </div>
    </div>
  );
}
