import { ReactNode } from "react";
import Header from "@/components/layout/header";

interface TicketsLayoutProps {
  children: ReactNode;
}

export default function TicketsLayout({ children }: TicketsLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 container mx-auto p-4 md:p-6">{children}</main>
    </div>
  );
}
