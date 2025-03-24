"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Ticket } from "@/types/ticket";

interface TicketFiltersProps {
  onFilterChange: (filters: {
    status?: Ticket["status"];
    priority?: Ticket["priority"];
    search?: string;
  }) => void;
}

export function TicketFilters({ onFilterChange }: TicketFiltersProps) {
  const [status, setStatus] = useState<Ticket["status"] | "all">("all");
  const [priority, setPriority] = useState<Ticket["priority"] | "all">("all");
  const [search, setSearch] = useState("");

  const handleStatusChange = (value: string) => {
    const newStatus = value as Ticket["status"] | "all";
    setStatus(newStatus);
    onFilterChange({
      status: newStatus === "all" ? undefined : newStatus,
      priority: priority === "all" ? undefined : priority,
      search: search || undefined,
    });
  };

  const handlePriorityChange = (value: string) => {
    const newPriority = value as Ticket["priority"] | "all";
    setPriority(newPriority);
    onFilterChange({
      status: status === "all" ? undefined : status,
      priority: newPriority === "all" ? undefined : newPriority,
      search: search || undefined,
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearch = e.target.value;
    setSearch(newSearch);
    onFilterChange({
      status: status === "all" ? undefined : status,
      priority: priority === "all" ? undefined : priority,
      search: newSearch || undefined,
    });
  };

  const handleReset = () => {
    setStatus("all");
    setPriority("all");
    setSearch("");
    onFilterChange({});
  };

  return (
    <div className="flex flex-col space-y-4 md:flex-row md:items-end md:space-x-4 md:space-y-0">
      <div className="flex flex-col space-y-2">
        <label htmlFor="status" className="text-sm font-medium">
          Status
        </label>
        <Select value={status} onValueChange={handleStatusChange}>
          <SelectTrigger id="status" className="w-full md:w-[180px]">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col space-y-2">
        <label htmlFor="priority" className="text-sm font-medium">
          Priority
        </label>
        <Select value={priority} onValueChange={handlePriorityChange}>
          <SelectTrigger id="priority" className="w-full md:w-[180px]">
            <SelectValue placeholder="All Priorities" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priorities</SelectItem>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="urgent">Urgent</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col space-y-2 flex-1">
        <label htmlFor="search" className="text-sm font-medium">
          Search
        </label>
        <input
          id="search"
          type="text"
          value={search}
          onChange={handleSearchChange}
          placeholder="Search tickets..."
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
      </div>
      <Button variant="outline" onClick={handleReset} className="mt-4 md:mt-0">
        Reset Filters
      </Button>
    </div>
  );
}
