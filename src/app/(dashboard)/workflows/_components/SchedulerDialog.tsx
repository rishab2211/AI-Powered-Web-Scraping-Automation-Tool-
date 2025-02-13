import React, { ReactNode, useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  CalendarCheckIcon,
  CalendarSync,
  Clock10Icon,
  CoinsIcon,
} from "lucide-react";
import CustomDialogHeader from "@/components/CustomDialogHeader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { UpdateCronWorkflow } from "@/actions/workflows/updateCronWorkflow";
import { toast } from "sonner";
import cronstrue from "cronstrue";
import { cn } from "@/lib/utils";
import { CancelCron } from "@/actions/workflows/CancelCron";

const SchedulerDialog = ({
  creditsRequired,
  workflowId,
  isCron,
}: {
  creditsRequired: number;
  workflowId: string;
  isCron: boolean;
}) => {
  const [cron, setCron] = useState("");
  const [validCron, setValidCron] = useState(false);
  const [readableCron, setReadableCron] = useState("");

  const saveMutation = useMutation({
    mutationFn: UpdateCronWorkflow,
    onSuccess: () => {
      toast.success("Scheduled successfully...", { id: "cron" });
    },
    onError: () => {
      toast.error("Some error may have occured...", { id: "cron" });
    },
  });

  const cancelMutation = useMutation({
    mutationFn: CancelCron,
    onSuccess: () => {
      toast.success("Canceled successfully...", { id: "cancel-cron" });
    },
    onError: () => {
      toast.error("Some error may have occured...", { id: "cancel-cron" });
    },
  });

  useEffect(() => {
    try {
      const humanReadableCron = cronstrue.toString(cron);
      setValidCron(true);
      setReadableCron(humanReadableCron);
    } catch (err) {
      setValidCron(false);
    }
  }, [cron, isCron]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="p-1 cursor-pointer hover:shadow-md rounded hover:border">
          <div>
            {isCron ? <Clock10Icon /> : <CalendarSync />}
            <div className="flex items-center gap-x-0.5 text-sm">
              <CoinsIcon className="text-yellow-600" size={14} />
              {creditsRequired}
            </div>
          </div>
        </div>
      </DialogTrigger>
      {isCron ? (
        <DialogContent>
          <CustomDialogHeader
            title="Want to cancel upcoming runs?"
            subTitle={`Press Yes to cancel upcoming executions & No to keep schedule as it is. `}
            icon={Clock10Icon}
          />

          <DialogFooter>
            <DialogClose asChild>
              <Button variant={"outline"} className="w-full">
                No
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                className="w-full"
                onClick={() => {
                  toast.info("Saving...", { id: cron });
                  cancelMutation.mutate({
                    id: workflowId,
                    
                  });
                }}
              >
                Yes
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      ) : (
        <DialogContent>
          <CustomDialogHeader
            title="Schedule workflow execution"
            subTitle={`schedule this workflow as cron job, for automatic execution in future as you want.`}
            icon={CalendarCheckIcon}
          />

          <div>
            <p>
              Specify a cron expression to schedule periodic execution.
              <br />
              All times are in UTC.
            </p>
            <Input
              className={cn("my-1 ",!validCron && "focus:border-destructive text-destructive")}
              value={cron}
              onChange={(e) => {
                setCron(e.target.value);
              }}
              placeholder="e.g., * * * * *"
              type="text"
              
            />
            <div className={cn("text-sm text-muted-foreground ",!validCron && "text-destructive")}>
              {validCron ? readableCron : "Not a valid cron expression"}
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant={"outline"} className="w-full">
                Cancel
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                className="w-full"
                onClick={() => {
                  toast.info("Saving...", { id: cron });
                  saveMutation.mutate({
                    id: workflowId,
                    cron,
                  });
                }}
              >
                Save
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      )}
    </Dialog>
  );
};

export default SchedulerDialog;
