import { Badge } from "@/components/ui/badge";
import { Ticket } from "@/types/ticket";

interface PriorityBadgeProps {
  priority: Ticket["priority"];
}

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  const getColor = () => {
    switch (priority) {
      case "low":
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
      case "medium":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100";
      case "high":
        return "bg-orange-100 text-orange-800 hover:bg-orange-100";
      case "urgent":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      default:
        return "";
    }
  };

  return (
    <Badge variant="outline" className={getColor()}>
      {priority.charAt(0).toUpperCase() + priority.slice(1)}
    </Badge>
  );
}
