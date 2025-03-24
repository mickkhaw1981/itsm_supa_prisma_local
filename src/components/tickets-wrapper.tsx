"use client";

import { ReactNode } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface TicketTabsProps {
  defaultTab?: string;
  detailsContent: ReactNode;
  activityContent: ReactNode;
}

export function TicketTabs({
  defaultTab = "details",
  detailsContent,
  activityContent,
}: TicketTabsProps) {
  return (
    <Tabs defaultValue={defaultTab}>
      <TabsList>
        <TabsTrigger value="details">Details</TabsTrigger>
        <TabsTrigger value="activity">Activity</TabsTrigger>
      </TabsList>
      <TabsContent value="details" className="pt-6">
        {detailsContent}
      </TabsContent>
      <TabsContent value="activity" className="pt-6">
        {activityContent}
      </TabsContent>
    </Tabs>
  );
}
