import { Badge } from "@/components/ui/badge";
import { Ticket } from "@/types/ticket";

interface StatusBadgeProps {
  status: Ticket["status"];
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const getVariant = () => {
    switch (status) {
      case "open":
        return "blue";
      case "in-progress":
        return "yellow";
      case "resolved":
        return "green";
      case "closed":
        return "gray";
      default:
        return "default";
    }
  };

  const getColor = () => {
    switch (status) {
      case "open":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100";
      case "in-progress":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-100";
      case "resolved":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      case "closed":
        return "bg-gray-100 text-gray-800 hover:bg-gray-100";
      default:
        return "";
    }
  };

  const getLabel = () => {
    switch (status) {
      case "in-progress":
        return "In Progress";
      default:
        return status.charAt(0).toUpperCase() + status.slice(1);
    }
  };

  return (
    <Badge variant="outline" className={getColor()}>
      {getLabel()}
    </Badge>
  );
}
