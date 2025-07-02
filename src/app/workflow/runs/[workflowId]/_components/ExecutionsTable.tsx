"use client";
import { GetWorkflowExecutions } from "@/actions/workflows/getWorkflowExecutions";
import { useQuery } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DatesToDurationString } from "@/lib/helper";
import { cn } from "@/lib/utils";
import { CoinsIcon } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { useRouter } from "next/navigation";

type InitialDataType = Awaited<ReturnType<typeof GetWorkflowExecutions>>;

const ExecutionsTable = ({
  workflowId,
  initialData,
}: {
  workflowId: string;
  initialData: InitialDataType;
}) => {
  const query = useQuery({
    queryKey: ["executions", workflowId],
    initialData,
    queryFn: () => GetWorkflowExecutions(workflowId),
    refetchInterval: 30_000, //30 seconds
  });

  const router = useRouter();

  return (
    <div className="border-rounded-lg shadow-md lg:px-10 flex flex-col items-center justify-center  overflow-auto">
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Consumed</TableHead>
            <TableHead>Started at (desc)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {query.data &&
            query.data.map((execution) => (
              <TableRow
                key={execution.id}
                className="cursor-pointer"
                onClick={() => {
                  router.push(`/workflow/runs/${workflowId}/${execution.id}`)
                }}
              >
                <TableCell className="flex flex-col ">
                  {execution.id}
                  <span>
                    Triggered via{" "}
                    <span className="font-bold">{execution.trigger}</span>
                  </span>
                </TableCell>
                <TableCell
                  className={cn(
                    execution.status === "COMPLETED" && "text-green-600",
                    execution.status === "PENDING" && "text-yellow-600",
                    execution.status === "FAILED" && "text-destructive",
                    execution.status === "RUNNING" && "text-blue-600"
                  )}
                >
                  <div className="flex flex-col">
                    {execution.status}
                    <span>
                      {DatesToDurationString(
                        execution.completedAt,
                        execution.startedAt
                      )}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="flex gap-0.5 items-center ">
                  <CoinsIcon className="text-yellow-600" size={15} />{" "}
                  {execution.creditsConsumed} credits
                </TableCell>
                <TableCell className="text-muted-foreground">
                  {execution.startedAt &&
                    formatDistanceToNow(execution.startedAt, {
                      addSuffix: true,
                    })}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ExecutionsTable;
