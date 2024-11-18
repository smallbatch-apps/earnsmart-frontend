import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faEllipsisVertical,
  faClock,
  faFileContract,
  IconDefinition,
} from "@fortawesome/free-solid-svg-icons";

interface KycItemProps {
  icon: IconDefinition;
  status?: "done" | "in-progress" | "pending";
  text: string;
  isFinal?: boolean;
}

function KycItem({
  icon,
  text,
  status = "pending",
  isFinal = false,
}: KycItemProps) {
  const statusClass = cn(
    "border font-semibold border-2 rounded-full px-4 py-1",
    {
      "text-green-600 border-green-200 bg-green-50": status === "done",
      "text-orange-600 border-orange-200 bg-orange-50":
        status === "in-progress",
      "text-gray-500 border-gray-200 bg-gray-50": status === "pending",
    }
  );

  return (
    <>
      <div className="flex items-center justify-center">
        <FontAwesomeIcon icon={icon} />
      </div>
      <div className={statusClass}>{text}</div>
      {!isFinal && (
        <>
          <FontAwesomeIcon
            icon={faEllipsisVertical}
            className="text-gray-400 justify-self-center"
          />
          <div></div>
        </>
      )}
    </>
  );
}

export default function Kyc() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Kyc and Onboarding progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-[auto_1fr] items-center gap-x-6 text-lg">
          <KycItem icon={faCheckCircle} status="done" text="Submit photo ID" />
          <KycItem
            icon={faCheckCircle}
            status="done"
            text="Submit proof of address"
          />
          <KycItem
            icon={faClock}
            status="in-progress"
            text="Submit proof of funds"
          />
          <KycItem icon={faFileContract} text="Document verification" />
          <KycItem icon={faFileContract} text="Approved" isFinal />
        </div>
      </CardContent>
    </Card>
  );
}
