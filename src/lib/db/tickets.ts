import { PrismaClient } from "@prisma/client";
import { Ticket } from "@/types/ticket";

// Initialize Prisma client
const prisma = new PrismaClient();

// Function to get all tickets
export async function getTicketsFromDb(): Promise<Ticket[]> {
  try {
    const tickets = await prisma.ticket.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    // Convert the Prisma Ticket objects to our Ticket type
    return tickets.map((ticket) => ({
      id: ticket.id,
      title: ticket.title,
      description: ticket.description,
      status: ticket.status.replace("_", "-") as
        | "open"
        | "in-progress"
        | "resolved"
        | "closed",
      priority: ticket.priority as "low" | "medium" | "high" | "urgent",
      createdAt: ticket.createdAt.toISOString(),
      updatedAt: ticket.updatedAt.toISOString(),
      assignedTo: ticket.assignedTo || undefined,
      category: ticket.category,
      submittedBy: ticket.submittedBy,
    }));
  } catch (error) {
    console.error("Error fetching tickets:", error);
    return [];
  }
}

// Function to get ticket by ID
export async function getTicketByIdFromDb(id: string): Promise<Ticket | null> {
  try {
    const ticket = await prisma.ticket.findUnique({
      where: { id },
    });

    if (!ticket) return null;

    // Convert the Prisma Ticket object to our Ticket type
    return {
      id: ticket.id,
      title: ticket.title,
      description: ticket.description,
      status: ticket.status.replace("_", "-") as
        | "open"
        | "in-progress"
        | "resolved"
        | "closed",
      priority: ticket.priority as "low" | "medium" | "high" | "urgent",
      createdAt: ticket.createdAt.toISOString(),
      updatedAt: ticket.updatedAt.toISOString(),
      assignedTo: ticket.assignedTo || undefined,
      category: ticket.category,
      submittedBy: ticket.submittedBy,
    };
  } catch (error) {
    console.error("Error fetching ticket by ID:", error);
    return null;
  }
}

// Function to create a new ticket
export async function createTicket(
  ticketData: Omit<Ticket, "id" | "createdAt" | "updatedAt">
): Promise<Ticket | null> {
  try {
    const ticket = await prisma.ticket.create({
      data: {
        title: ticketData.title,
        description: ticketData.description,
        status: ticketData.status.replace("-", "_") as any,
        priority: ticketData.priority,
        assignedTo: ticketData.assignedTo,
        category: ticketData.category,
        submittedBy: ticketData.submittedBy,
      },
    });

    return {
      id: ticket.id,
      title: ticket.title,
      description: ticket.description,
      status: ticket.status.replace("_", "-") as
        | "open"
        | "in-progress"
        | "resolved"
        | "closed",
      priority: ticket.priority as "low" | "medium" | "high" | "urgent",
      createdAt: ticket.createdAt.toISOString(),
      updatedAt: ticket.updatedAt.toISOString(),
      assignedTo: ticket.assignedTo || undefined,
      category: ticket.category,
      submittedBy: ticket.submittedBy,
    };
  } catch (error) {
    console.error("Error creating ticket:", error);
    return null;
  }
}

// Function to update a ticket
export async function updateTicket(
  id: string,
  ticketData: Partial<Omit<Ticket, "id" | "createdAt" | "updatedAt">>
): Promise<Ticket | null> {
  try {
    const data: any = { ...ticketData };
    if (data.status) {
      data.status = data.status.replace("-", "_");
    }

    const ticket = await prisma.ticket.update({
      where: { id },
      data,
    });

    return {
      id: ticket.id,
      title: ticket.title,
      description: ticket.description,
      status: ticket.status.replace("_", "-") as
        | "open"
        | "in-progress"
        | "resolved"
        | "closed",
      priority: ticket.priority as "low" | "medium" | "high" | "urgent",
      createdAt: ticket.createdAt.toISOString(),
      updatedAt: ticket.updatedAt.toISOString(),
      assignedTo: ticket.assignedTo || undefined,
      category: ticket.category,
      submittedBy: ticket.submittedBy,
    };
  } catch (error) {
    console.error("Error updating ticket:", error);
    return null;
  }
}

// Function to delete a ticket
export async function deleteTicket(id: string): Promise<boolean> {
  try {
    await prisma.ticket.delete({
      where: { id },
    });
    return true;
  } catch (error) {
    console.error("Error deleting ticket:", error);
    return false;
  }
}
