import { Activity } from "@/types";
import { useActivities } from "@/hooks/stores/useActivities";

import ActivityPanelItem from "@/components/ui/activity-panel-item";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
export default function Component({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const { activities } = useActivities();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Most recent activity</CardTitle>
        <CardDescription>Most recent activity</CardDescription>
      </CardHeader>
      <CardContent className="flex-1">
        <div className="flex flex-col divide-y">
          {activities.slice(0, 7).map((activity: Activity) => (
            <ActivityPanelItem key={activity.id} activity={activity} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
