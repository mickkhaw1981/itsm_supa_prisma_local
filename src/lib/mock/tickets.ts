import { Ticket } from "@/types/ticket";

// Mock data for tickets
export const tickets: Ticket[] = [
  {
    id: "TKT-001",
    title: "Cannot access email account",
    description:
      "I am unable to log into my email account after the recent password reset.",
    status: "open",
    priority: "high",
    createdAt: new Date("2023-10-15T09:30:00").toISOString(),
    updatedAt: new Date("2023-10-15T09:30:00").toISOString(),
    assignedTo: "John Smith",
    category: "Email",
    submittedBy: "Alex Johnson",
  },
  {
    id: "TKT-002",
    title: "Monitor displays blue screen",
    description:
      "My monitor suddenly started showing a blue screen and won't display anything else.",
    status: "in-progress",
    priority: "urgent",
    createdAt: new Date("2023-10-14T11:45:00").toISOString(),
    updatedAt: new Date("2023-10-15T08:15:00").toISOString(),
    assignedTo: "Sarah Williams",
    category: "Hardware",
    submittedBy: "Chris Davis",
  },
  {
    id: "TKT-003",
    title: "Request for new software installation",
    description:
      "I need Adobe Photoshop installed on my workstation for the marketing project.",
    status: "open",
    priority: "medium",
    createdAt: new Date("2023-10-13T15:20:00").toISOString(),
    updatedAt: new Date("2023-10-13T15:20:00").toISOString(),
    assignedTo: undefined,
    category: "Software",
    submittedBy: "Jamie Richardson",
  },
  {
    id: "TKT-004",
    title: "Printer not connecting to network",
    description:
      "The office printer on the 3rd floor isn't connecting to the network and shows offline status.",
    status: "in-progress",
    priority: "medium",
    createdAt: new Date("2023-10-12T10:10:00").toISOString(),
    updatedAt: new Date("2023-10-14T13:45:00").toISOString(),
    assignedTo: "Mike Peterson",
    category: "Network",
    submittedBy: "Dana Morgan",
  },
  {
    id: "TKT-005",
    title: "VPN connection issues",
    description:
      "Cannot establish VPN connection when working remotely, getting timeout errors.",
    status: "resolved",
    priority: "high",
    createdAt: new Date("2023-10-11T09:00:00").toISOString(),
    updatedAt: new Date("2023-10-14T16:30:00").toISOString(),
    assignedTo: "Lisa Cooper",
    category: "Network",
    submittedBy: "Sam Wilson",
  },
  {
    id: "TKT-006",
    title: "Password reset request",
    description:
      "I need to reset my password for the accounting system as I've been locked out.",
    status: "closed",
    priority: "low",
    createdAt: new Date("2023-10-10T14:25:00").toISOString(),
    updatedAt: new Date("2023-10-10T16:05:00").toISOString(),
    assignedTo: "John Smith",
    category: "Access",
    submittedBy: "Taylor Green",
  },
  {
    id: "TKT-007",
    title: "Request for additional monitor",
    description:
      "Requesting an additional monitor for my workstation to improve productivity.",
    status: "resolved",
    priority: "low",
    createdAt: new Date("2023-10-09T11:30:00").toISOString(),
    updatedAt: new Date("2023-10-12T09:45:00").toISOString(),
    assignedTo: "Admin Team",
    category: "Hardware",
    submittedBy: "Jordan Lee",
  },
  {
    id: "TKT-008",
    title: "Email not sending attachments",
    description:
      "When I try to send emails with attachments, they arrive without the attachment.",
    status: "open",
    priority: "medium",
    createdAt: new Date("2023-10-13T13:15:00").toISOString(),
    updatedAt: new Date("2023-10-13T13:15:00").toISOString(),
    assignedTo: undefined,
    category: "Email",
    submittedBy: "Casey Brown",
  },
  {
    id: "TKT-009",
    title: "Laptop battery draining quickly",
    description:
      "My laptop battery is draining within 1 hour of being fully charged.",
    status: "in-progress",
    priority: "medium",
    createdAt: new Date("2023-10-12T15:40:00").toISOString(),
    updatedAt: new Date("2023-10-13T10:20:00").toISOString(),
    assignedTo: "Tech Support",
    category: "Hardware",
    submittedBy: "Riley Martin",
  },
  {
    id: "TKT-010",
    title: "Cannot access shared drive",
    description:
      "I'm unable to access the marketing department's shared drive since yesterday.",
    status: "closed",
    priority: "high",
    createdAt: new Date("2023-10-11T08:50:00").toISOString(),
    updatedAt: new Date("2023-10-12T11:10:00").toISOString(),
    assignedTo: "Network Team",
    category: "Access",
    submittedBy: "Morgan Fisher",
  },
];

// Function to get all tickets
export const getTickets = (): Ticket[] => {
  return tickets;
};

// Function to get ticket by ID
export const getTicketById = (id: string): Ticket | undefined => {
  return tickets.find((ticket) => ticket.id === id);
};
