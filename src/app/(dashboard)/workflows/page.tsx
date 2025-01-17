
import { Suspense } from "react";
import CreateWorkflowDialog from "./_components/CreateWorkflowDialog";
import { UserWorkflows } from "./_components/UserWorkflows";
import { UserWorkflowSkeleton } from "./_components/UserWorkflowSkeleton";

export default function Page() {
  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Header Section */}
      <div className="flex justify-between">
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold">Workflows</h1>
          <p className="text-muted-foreground">Manage your workflows</p>
        </div>
        <CreateWorkflowDialog />
      </div>

      {/* Content Section */}
      <div className="h-full py-6">
        <Suspense fallback={<UserWorkflowSkeleton />}>
          <UserWorkflows />
        </Suspense>
      </div>
    </div>
  );
}