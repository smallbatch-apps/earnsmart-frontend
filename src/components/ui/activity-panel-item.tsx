import { cn, formatDateTime } from "@/lib/utils";
import { Activity } from "@/types";
export default function Component({
  className,
  activity,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { activity: Activity }) {
  return (
    <div className={cn("flex flex-col w-full p-1", className)} {...props}>
      <div className="flex gap-2">
        <div className="flex-shrink w-14">
          {activity.type === "admin" ? "Admin" : "User"}
        </div>
        <div className="flex-grow">{activity.message}</div>
        <div className="flex-shrink text-right">
          {formatDateTime(activity.createdAt)}
        </div>
      </div>
    </div>
  );
}
