import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="border-b bg-background">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-xl font-bold tracking-tight">
            ITSM Dashboard
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link
              href="/tickets"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Tickets
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm">
            <Link href="/tickets/create">Create Ticket</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
