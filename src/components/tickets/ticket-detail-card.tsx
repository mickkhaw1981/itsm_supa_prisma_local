"use client";

import { Ticket } from "@/types/ticket";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface TicketDetailCardProps {
  ticket: Ticket;
}

export function TicketDetailCard({ ticket }: TicketDetailCardProps) {
  // Format date for display
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

  return (
    <div className="space-y-6">
      {/* Description Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Description</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="whitespace-pre-wrap">{ticket.description}</div>
        </CardContent>
      </Card>

      {/* Details Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <div className="text-sm font-medium text-muted-foreground">
                Category
              </div>
              <div className="mt-1">{ticket.category}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground">
                Assigned To
              </div>
              <div className="mt-1">{ticket.assignedTo || "Unassigned"}</div>
            </div>
          </div>
          <Separator />
          <div>
            <div className="text-sm font-medium text-muted-foreground">
              Submitted By
            </div>
            <div className="mt-1">{ticket.submittedBy}</div>
          </div>
        </CardContent>
      </Card>

      {/* Metadata Section */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Metadata</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <div className="text-sm font-medium text-muted-foreground">
                Ticket ID
              </div>
              <div className="mt-1 font-mono">{ticket.id}</div>
            </div>
            <div>
              <div className="text-sm font-medium text-muted-foreground">
                Created At
              </div>
              <div className="mt-1">{formatDate(ticket.createdAt)}</div>
            </div>
          </div>
          <Separator />
          <div>
            <div className="text-sm font-medium text-muted-foreground">
              Last Updated
            </div>
            <div className="mt-1">{formatDate(ticket.updatedAt)}</div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
