import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-6 md:gap-8">
          <Link href="/" className="font-bold text-xl md:text-2xl">
            ITSM Dashboard
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link
              href="/tickets"
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              Tickets
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}
