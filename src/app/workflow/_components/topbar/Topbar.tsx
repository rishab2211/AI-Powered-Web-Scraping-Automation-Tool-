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

interface Props {
  title: string;
  subtitle?: string;
  workflowId : string
}

const Topbar = ({ title, subtitle,workflowId }: Props) => {
  return (
    <header className=" flex p-2 border-b-2 border-separate justify-between w-full  h-[60px] sticky top-0 bg-background ">
      <div className="flex gap-5 items-center flex-1 ">
        <TooltipWrapper content="go to workflows">
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
      </div>
      <SaveBtn workflowId={workflowId} />
    </header>
  );
};

export default Topbar;
