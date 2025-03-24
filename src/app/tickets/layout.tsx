import Header from "@/components/layout/header";

export default function TicketsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-6 md:px-6 md:py-8">
        {children}
      </main>
    </div>
  );
}
