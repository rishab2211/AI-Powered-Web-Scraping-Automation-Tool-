import {  WorkflowExecutionStatus } from "@/app/types/Workflows"
import { CircleCheckIcon, CircleDashedIcon, CircleXIcon, Loader2Icon } from "lucide-react";

const ExecutionBadgeIndicator = ({status} : {status : WorkflowExecutionStatus}) => {
  switch (status) {
    case WorkflowExecutionStatus.PENDING:
        return (<div className="h-2 w-2 bg-yellow-500 rounded-full" ></div>)
        break;
    case WorkflowExecutionStatus.RUNNING:
        return (<div className="h-2 w-2 bg-blue-500 rounded-full" ></div>)
        break;
    case WorkflowExecutionStatus.COMPLETED:
        return (<div className="h-2 w-2 bg-green-500 rounded-full" ></div>)
        break;
    case WorkflowExecutionStatus.FAILED:
        return (<div className="h-2 w-2 bg-red-500 rounded-full" ></div>)
        break;
    default:
        return <p>{status}</p>
        break;
  }
}

export default ExecutionBadgeIndicator