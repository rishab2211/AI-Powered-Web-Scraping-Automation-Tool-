import TooltipWrapper from "@/components/TooltipWrapper";
import { Button } from "@/components/ui/button";
import {
  ArrowLeftSquare,
  CheckIcon,
  ChevronLeft,
  WorkflowIcon,
} from "lucide-react";
import Link from "next/link";
import SaveBtn from "./SaveBtn";
import ExecuteBtn from "./ExecuteBtn";
import { cn } from "@/lib/utils";
import NavigationTabs from "./NavigationTabs";
import PublishBtn from "./PublishBtn";
import UnPublishBtn from "./UnPublishBtn";

interface Props {
  title: string;
  subtitle?: string;
  workflowId: string;
  hideButtons?: boolean;
  className?: string;
  isPublished: boolean;
}

const Topbar = ({
  title,
  subtitle,
  workflowId,
  hideButtons = false,
  className,
  isPublished = false,
}: Props) => {
  return (
    <header className=" flex  p-2 border-b-2 border-separate z-50 justify-between w-full  h-[60px] sticky top-0 bg-background ">
      <div className={cn("flex fixed gap-5 items-center flex-1 ", className)}>
        <TooltipWrapper side="right" content="go to workflows">
          <Link
            href={"/workflows"}
            className="flex ml-1 gap-1 border p-1 rounded-md"
          >
            <ChevronLeft />
          </Link>
        </TooltipWrapper>
        <div>
          <p className=" font-bold text-ellipsis text-xl truncate ">{title}</p>
          {subtitle && (
            <p className=" text-xs text-ellipsis ml-0.5 truncate">{subtitle}</p>
          )}
        </div>

        <div className="md:ml-10">
          <NavigationTabs workflowId={workflowId} />
        </div>
      </div>

      <div className="flex gap-3">
        {!hideButtons && (
          <>
            <ExecuteBtn workflowId={workflowId} />
            {isPublished && <UnPublishBtn workflowId={workflowId} />}
            {!isPublished && (
              <>
                <SaveBtn workflowId={workflowId} />
                <PublishBtn workflowId={workflowId} />
              </>
            )}
          </>
        )}
      </div>
    </header>
  );
};

export default Topbar;
