import { Badge } from "@/components/ui/badge";
import { Ticket } from "@/types/ticket";

interface PriorityBadgeProps {
  priority: Ticket["priority"];
}

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  const getPriorityColor = (priority: Ticket["priority"]) => {
    switch (priority) {
      case "low":
        return "bg-gray-100 text-gray-800 hover:bg-gray-100 hover:text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
      case "medium":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100 hover:text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "high":
        return "bg-orange-100 text-orange-800 hover:bg-orange-100 hover:text-orange-800 dark:bg-orange-900/30 dark:text-orange-400";
      case "urgent":
        return "bg-red-100 text-red-800 hover:bg-red-100 hover:text-red-800 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "";
    }
  };

  return (
    <Badge className={getPriorityColor(priority)} variant="secondary">
      {priority.charAt(0).toUpperCase() + priority.slice(1)}
    </Badge>
  );
}
