import { notFound } from "next/navigation";
import { getTicketByIdFromDb } from "@/lib/db/tickets";
import { Breadcrumb } from "@/components/tickets/breadcrumb";
import { TicketDetailHeader } from "@/components/tickets/ticket-detail-header";
import { TicketDetailCard } from "@/components/tickets/ticket-detail-card";
import { TicketActionButtons } from "@/components/tickets/ticket-action-buttons";
import { Separator } from "@/components/ui/separator";
import { TicketTabs } from "@/components/tickets-wrapper";

export default async function Page({ params }: { params: any }) {
  // Get the ID safely
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  const ticket = await getTicketByIdFromDb(id);

  // Use Next.js notFound() for missing tickets
  if (!ticket) {
    notFound();
  }

  // Prepare activity content
  const activityContent = (
    <div className="rounded-lg border p-8 text-center">
      <h3 className="text-lg font-medium">Activity Log</h3>
      <p className="text-muted-foreground mt-2">
        Activity tracking will be implemented in a future update.
      </p>
    </div>
  );

  return (
    <div className="space-y-8">
      <Breadcrumb ticketId={ticket.id} ticketTitle={ticket.title} />

      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <TicketDetailHeader ticket={ticket} />
        <TicketActionButtons ticket={ticket} />
      </div>

      <Separator className="my-6" />

      <TicketTabs
        detailsContent={<TicketDetailCard ticket={ticket} />}
        activityContent={activityContent}
      />
    </div>
  );
}
