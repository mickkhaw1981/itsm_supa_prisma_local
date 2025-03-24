"use client";

import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbProps {
  ticketId: string;
  ticketTitle: string;
}

export function Breadcrumb({ ticketId, ticketTitle }: BreadcrumbProps) {
  const truncatedTitle =
    ticketTitle.length > 30
      ? ticketTitle.substring(0, 30) + "..."
      : ticketTitle;

  return (
    <nav className="flex items-center space-x-1 text-sm text-muted-foreground">
      <Link
        href="/"
        className="flex items-center gap-1 hover:text-foreground transition-colors"
      >
        <Home className="h-4 w-4" />
        <span className="hidden sm:inline">Home</span>
      </Link>
      <ChevronRight className="h-4 w-4" />
      <Link href="/tickets" className="hover:text-foreground transition-colors">
        Tickets
      </Link>
      <ChevronRight className="h-4 w-4" />
      <Link
        href={`/tickets/${ticketId}`}
        className="font-medium text-foreground"
        aria-current="page"
      >
        {truncatedTitle}
      </Link>
    </nav>
  );
}
