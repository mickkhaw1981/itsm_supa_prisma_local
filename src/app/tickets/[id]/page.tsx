"use client";

import { getTicketById } from "@/lib/mock/tickets";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Breadcrumb } from "@/components/tickets/breadcrumb";
import { TicketDetailHeader } from "@/components/tickets/ticket-detail-header";
import { TicketDetailCard } from "@/components/tickets/ticket-detail-card";
import { TicketActionButtons } from "@/components/tickets/ticket-action-buttons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Ticket } from "@/types/ticket";

// Use a client component with useParams hook instead of direct params
export default function TicketDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!params?.id) {
      return;
    }

    // Get the ID safely
    const id = Array.isArray(params.id) ? params.id[0] : params.id;
    const foundTicket = getTicketById(id);

    if (foundTicket) {
      setTicket(foundTicket);
    }

    setLoading(false);
  }, [params]);

  if (loading) {
    return (
      <div className="container mx-auto py-6 space-y-8">
        <div className="h-5 w-60 bg-muted animate-pulse rounded"></div>
        <div className="space-y-4">
          <div className="h-8 w-80 bg-muted animate-pulse rounded"></div>
          <div className="flex space-x-2">
            <div className="h-6 w-16 bg-muted animate-pulse rounded"></div>
            <div className="h-6 w-16 bg-muted animate-pulse rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!ticket) {
    return (
      <div className="container mx-auto py-16 text-center">
        <h1 className="text-3xl font-bold">Ticket Not Found</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          The ticket you're looking for doesn't exist or may have been deleted.
        </p>
        <div className="mt-8">
          <button
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2 text-sm"
            onClick={() => router.push("/tickets")}
          >
            Return to Tickets
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 space-y-8">
      <Breadcrumb ticketId={ticket.id} ticketTitle={ticket.title} />

      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <TicketDetailHeader ticket={ticket} />
        <TicketActionButtons ticket={ticket} />
      </div>

      <Separator className="my-6" />

      <Tabs defaultValue="details">
        <TabsList>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>
        <TabsContent value="details" className="pt-6">
          <TicketDetailCard ticket={ticket} />
        </TabsContent>
        <TabsContent value="activity" className="pt-6">
          <div className="rounded-lg border p-8 text-center">
            <h3 className="text-lg font-medium">Activity Log</h3>
            <p className="text-muted-foreground mt-2">
              Activity tracking will be implemented in a future update.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
