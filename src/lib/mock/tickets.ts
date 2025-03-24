import { Ticket } from "@/types/ticket";
import { v4 as uuidv4 } from "uuid";

// Generate random dates within a range
function randomDate(start: Date, end: Date): Date {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

const now = new Date();
const oneMonthAgo = new Date(
  now.getFullYear(),
  now.getMonth() - 1,
  now.getDate()
);

// Mock ticket data
export const tickets: Ticket[] = [
  {
    id: uuidv4(),
    title: "Network connectivity issues in marketing department",
    description:
      "Multiple users in the marketing department are experiencing intermittent network connectivity issues. Unable to access shared drives and internet connection drops frequently.",
    status: "open",
    priority: "high",
    createdAt: randomDate(oneMonthAgo, now),
    updatedAt: randomDate(oneMonthAgo, now),
    assignedTo: "John Smith",
    category: "Network",
    submittedBy: "Emily Johnson",
  },
  {
    id: uuidv4(),
    title: "Email server not sending external emails",
    description:
      "Our email server is not sending emails to external domains. Internal emails work fine. This is affecting communication with clients and partners.",
    status: "in-progress",
    priority: "urgent",
    createdAt: randomDate(oneMonthAgo, now),
    updatedAt: randomDate(oneMonthAgo, now),
    assignedTo: "Alex Rivera",
    category: "Email",
    submittedBy: "Michael Wong",
  },
  {
    id: uuidv4(),
    title: "New software installation request",
    description:
      "Need Adobe Creative Suite installed on my workstation for the new marketing campaign project.",
    status: "open",
    priority: "medium",
    createdAt: randomDate(oneMonthAgo, now),
    updatedAt: randomDate(oneMonthAgo, now),
    assignedTo: undefined,
    category: "Software",
    submittedBy: "Sarah Davis",
  },
  {
    id: uuidv4(),
    title: "Printer offline in finance department",
    description:
      "The main printer in the finance department is showing offline status. We've tried restarting it but still not working.",
    status: "resolved",
    priority: "medium",
    createdAt: randomDate(oneMonthAgo, now),
    updatedAt: randomDate(oneMonthAgo, now),
    assignedTo: "David Chen",
    category: "Hardware",
    submittedBy: "Robert Wilson",
  },
  {
    id: uuidv4(),
    title: "VPN connection issues for remote workers",
    description:
      "Several remote workers reporting inability to connect to VPN. Error message says 'Connection timeout'.",
    status: "in-progress",
    priority: "high",
    createdAt: randomDate(oneMonthAgo, now),
    updatedAt: randomDate(oneMonthAgo, now),
    assignedTo: "Maria Garcia",
    category: "Network",
    submittedBy: "James Taylor",
  },
  {
    id: uuidv4(),
    title: "Password reset request",
    description:
      "Need password reset for my account. I've been locked out after multiple failed attempts.",
    status: "closed",
    priority: "low",
    createdAt: randomDate(oneMonthAgo, now),
    updatedAt: randomDate(oneMonthAgo, now),
    assignedTo: "Sophie Martin",
    category: "Security",
    submittedBy: "Thomas Brown",
  },
  {
    id: uuidv4(),
    title: "New employee setup",
    description:
      "Need complete workstation setup for new employee starting next Monday in the sales department.",
    status: "open",
    priority: "medium",
    createdAt: randomDate(oneMonthAgo, now),
    updatedAt: randomDate(oneMonthAgo, now),
    assignedTo: undefined,
    category: "Onboarding",
    submittedBy: "Jennifer Lee",
  },
  {
    id: uuidv4(),
    title: "CRM system error when creating new contacts",
    description:
      "Receiving error code E-4032 when trying to create new contacts in the CRM system. This is affecting the sales team's ability to log new leads.",
    status: "in-progress",
    priority: "high",
    createdAt: randomDate(oneMonthAgo, now),
    updatedAt: randomDate(oneMonthAgo, now),
    assignedTo: "Ryan Mitchell",
    category: "Software",
    submittedBy: "Patricia Lopez",
  },
  {
    id: uuidv4(),
    title: "Conference room projector not working",
    description:
      "The projector in the main conference room isn't connecting to laptops. We have an important client presentation tomorrow.",
    status: "resolved",
    priority: "urgent",
    createdAt: randomDate(oneMonthAgo, now),
    updatedAt: randomDate(oneMonthAgo, now),
    assignedTo: "Chris Anderson",
    category: "Hardware",
    submittedBy: "Lisa Thompson",
  },
  {
    id: uuidv4(),
    title: "Website showing 500 error intermittently",
    description:
      "Our company website is occasionally showing 500 internal server errors. This is happening randomly and affecting potential customers.",
    status: "open",
    priority: "high",
    createdAt: randomDate(oneMonthAgo, now),
    updatedAt: randomDate(oneMonthAgo, now),
    assignedTo: "Daniel Kim",
    category: "Web",
    submittedBy: "Amanda Carter",
  },
];

// Function to get a ticket by ID
export function getTicketById(id: string): Ticket | undefined {
  return tickets.find((ticket) => ticket.id === id);
}

// Function to update a ticket
export function updateTicket(
  id: string,
  data: Partial<Ticket>
): Ticket | undefined {
  const ticketIndex = tickets.findIndex((ticket) => ticket.id === id);

  if (ticketIndex === -1) {
    return undefined;
  }

  const updatedTicket = {
    ...tickets[ticketIndex],
    ...data,
    updatedAt: new Date(),
  };

  tickets[ticketIndex] = updatedTicket;
  return updatedTicket;
}

// Function to create a new ticket
export function createTicket(
  ticket: Omit<Ticket, "id" | "createdAt" | "updatedAt">
): Ticket {
  const now = new Date();
  const newTicket: Ticket = {
    ...ticket,
    id: uuidv4(),
    createdAt: now,
    updatedAt: now,
  };

  tickets.push(newTicket);
  return newTicket;
}
