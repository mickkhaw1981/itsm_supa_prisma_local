import { PrismaClient, TicketStatus, TicketPriority } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.ticket.deleteMany({});

  const tickets = [
    {
      title: "Network connectivity issue",
      description: "Unable to connect to the company VPN from remote location",
      status: "open" as TicketStatus,
      priority: "high" as TicketPriority,
      category: "Network",
      submittedBy: "john.doe@company.com",
    },
    {
      title: "Software installation request",
      description: "Need Adobe Creative Cloud installed on my workstation",
      status: "in_progress" as TicketStatus,
      priority: "medium" as TicketPriority,
      assignedTo: "it.support@company.com",
      category: "Software",
      submittedBy: "jane.smith@company.com",
    },
    {
      title: "Password reset",
      description: "Locked out of my account after three failed attempts",
      status: "resolved" as TicketStatus,
      priority: "urgent" as TicketPriority,
      assignedTo: "helpdesk@company.com",
      category: "Account Access",
      submittedBy: "robert.johnson@company.com",
    },
    {
      title: "Printer not working",
      description: "Office printer on 3rd floor keeps jamming",
      status: "open" as TicketStatus,
      priority: "low" as TicketPriority,
      category: "Hardware",
      submittedBy: "susan.miller@company.com",
    },
    {
      title: "Email delivery delay",
      description:
        "Emails are taking over 2 hours to be delivered to external addresses",
      status: "in_progress" as TicketStatus,
      priority: "high" as TicketPriority,
      assignedTo: "network.admin@company.com",
      category: "Email",
      submittedBy: "david.wilson@company.com",
    },
    {
      title: "New equipment request",
      description: "Requesting a second monitor for productivity improvement",
      status: "open" as TicketStatus,
      priority: "medium" as TicketPriority,
      category: "Hardware",
      submittedBy: "michael.brown@company.com",
    },
    {
      title: "Website error on checkout page",
      description:
        "Customers reporting 404 error when attempting to complete purchase",
      status: "in_progress" as TicketStatus,
      priority: "urgent" as TicketPriority,
      assignedTo: "webdev@company.com",
      category: "Website",
      submittedBy: "emma.davis@company.com",
    },
    {
      title: "CRM data synchronization issue",
      description:
        "New contacts not syncing between mobile app and web dashboard",
      status: "open" as TicketStatus,
      priority: "high" as TicketPriority,
      category: "Application",
      submittedBy: "sales.manager@company.com",
    },
    {
      title: "Meeting room projector flickering",
      description:
        "The projector in Conference Room A has intermittent display issues",
      status: "closed" as TicketStatus,
      priority: "low" as TicketPriority,
      assignedTo: "facilities@company.com",
      category: "Facilities",
      submittedBy: "lisa.taylor@company.com",
    },
    {
      title: "VPN access for new employee",
      description:
        "Need to set up VPN access for Mark Johnson starting next Monday",
      status: "resolved" as TicketStatus,
      priority: "medium" as TicketPriority,
      assignedTo: "it.admin@company.com",
      category: "Account Access",
      submittedBy: "hr.department@company.com",
    },
  ];

  for (const ticket of tickets) {
    await prisma.ticket.create({
      data: ticket,
    });
  }

  console.log("Database seeded successfully");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
