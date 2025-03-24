"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

export function TicketFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [status, setStatus] = useState(searchParams.get("status") || "");
  const [priority, setPriority] = useState(searchParams.get("priority") || "");
  const [search, setSearch] = useState(searchParams.get("search") || "");

  // Update the URL when filters change
  useEffect(() => {
    const params = new URLSearchParams();
    if (status) params.set("status", status);
    if (priority) params.set("priority", priority);
    if (search) params.set("search", search);

    const url = params.toString() ? `?${params.toString()}` : "";
    router.push(`/tickets${url}`);
  }, [status, priority, search, router]);

  // Reset all filters
  const handleReset = () => {
    setStatus("");
    setPriority("");
    setSearch("");
  };

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
      <div className="grid gap-2">
        <label htmlFor="status" className="text-sm font-medium">
          Status
        </label>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-full lg:w-[180px]">
            <SelectValue placeholder="Any status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Any status</SelectItem>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
            <SelectItem value="closed">Closed</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-2">
        <label htmlFor="priority" className="text-sm font-medium">
          Priority
        </label>
        <Select value={priority} onValueChange={setPriority}>
          <SelectTrigger className="w-full lg:w-[180px]">
            <SelectValue placeholder="Any priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">Any priority</SelectItem>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="urgent">Urgent</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid gap-2 flex-1">
        <label htmlFor="search" className="text-sm font-medium">
          Search
        </label>
        <div className="relative">
          <Input
            id="search"
            placeholder="Search tickets..."
            className="w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          {search && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-0 top-0 h-full"
              onClick={() => setSearch("")}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Clear search</span>
            </Button>
          )}
        </div>
      </div>
      <Button variant="outline" className="shrink-0" onClick={handleReset}>
        Reset Filters
      </Button>
    </div>
  );
}
