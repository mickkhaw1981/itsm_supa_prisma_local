import { getTicketById } from "@/lib/mock/tickets";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/tickets/breadcrumb";
import { TicketDetailHeader } from "@/components/tickets/ticket-detail-header";
import { TicketDetailCard } from "@/components/tickets/ticket-detail-card";
import { TicketActionButtons } from "@/components/tickets/ticket-action-buttons";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

// @ts-ignore - Next.js has issues with the page props typing in this version
export default function TicketDetailPage({ params }: any) {
  const id = params?.id;
  const ticket = getTicketById(id);

  if (!ticket) {
    notFound();
  }

  return (
    <div className="container mx-auto py-6 space-y-8">
      <Breadcrumb ticketId={ticket.id} ticketTitle={ticket.title} />

      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
        <TicketDetailHeader ticket={ticket} />
        <TicketActionButtons ticket={ticket} onDelete={() => {}} />
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
