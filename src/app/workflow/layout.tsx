import { Separator } from "@/components/ui/separator";
import { WorkflowIcon } from "lucide-react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      {children}
      <Separator />
      <footer className=" flex items-center justify-center p-2 ">
        <WorkflowIcon />
      </footer>
     
    </div>
  );
};

export default layout;
