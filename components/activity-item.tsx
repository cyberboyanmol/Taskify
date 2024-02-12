import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  GenerateLogMessage,
  GenerateLogMessageForCard,
} from "@/components/generate-log-message";
import { AuditLog } from "@prisma/client";
import { format } from "date-fns";
interface ActivityItemProps {
  data: AuditLog;
  page?: boolean;
}
export const ActivityItem = ({ data, page }: ActivityItemProps) => {
  return (
    <li className="flex items-center  gap-x-2">
      <Avatar className="h-10 w-10">
        <AvatarImage
          className="w-full h-full object-cover"
          src={data.userImage}
        />
        <AvatarFallback>{data.userName.replaceAll("null", "")}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col space-y-1">
        {/* logs */}
        <p className="text-sm text-muted-foreground">
          <span className="font-bold  text-md capitalize text-[#0B1D51]">
            {data.userName.replaceAll("null", "")}
          </span>
          {page ? (
            <GenerateLogMessage log={data} />
          ) : (
            <GenerateLogMessageForCard log={data} />
          )}
        </p>
        {/* logs time */}
        <p className="text-xs text-muted-foreground">
          {format(new Date(data.createdAt), "MMM d, yyyy 'at' h:mm a")}
        </p>
      </div>
    </li>
  );
};
