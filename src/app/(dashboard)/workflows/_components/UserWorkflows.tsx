import { GetWorkflowsOfUser } from "@/actions/getWorkflowsOfUser";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, WorkflowIcon } from "lucide-react";
import CreateWorkflowDialog from "./CreateWorkflowDialog";
import WorkflowCard from "./WorkflowCard";

export async function UserWorkflows() {
  const workflows = await GetWorkflowsOfUser();

  if (!workflows) {
    return (
      <Alert variant={"destructive"}>
        <AlertCircle className="w-4 h-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          Something went wrong. Please try again later
        </AlertDescription>
      </Alert>
    );
  }

  if (workflows.length === 0) {
    return (
      <div className="flex flex-col gap-4 h-full items-center justify-center">
        <div className="rounded-2xl bg-accent w-20 h-20 flex items-center justify-center">
          <WorkflowIcon size={40} className="stroke-primary" />
        </div>
        <div className="flex flex-col gap-1 text-center">
          <p className="font-bold">No workflow found</p>
          <p className="text-sm text-muted-foreground">
            Click the button below to create your first workflow
          </p>
        </div>
        <CreateWorkflowDialog />
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {workflows.map((workflow) => (
        <WorkflowCard workflow={workflow} key={workflow.id}></WorkflowCard>
      ))}
    </div>
  );
}