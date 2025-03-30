import { ExecutionPhaseStatus } from "@/app/types/Workflows";
import {
  CircleCheckIcon,
  CircleDashedIcon,
  CircleXIcon,
  Loader2Icon,
} from "lucide-react";

const PhaseExecutionStatusBadge = ({
  status,
}: {
  status: ExecutionPhaseStatus;
}) => {
  switch (status) {
    case ExecutionPhaseStatus.PENDING:
      return <CircleDashedIcon />;
    case ExecutionPhaseStatus.RUNNING:
      return <Loader2Icon className="animate-spin text-yellow-500" />;
    case ExecutionPhaseStatus.COMPLETED:
      return <CircleCheckIcon className="text-green-600" />;

    case ExecutionPhaseStatus.FAILED:
      return <CircleXIcon className="text-destructive" />;
    default:
      return <p>{status}</p>;
  }
};

export default PhaseExecutionStatusBadge;
