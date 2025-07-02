import { TaskType } from "@/app/types/tasks";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TaskRegistry } from "@/lib/workflow/task/Registry";
import { CoinsIcon } from "lucide-react";


export function TaskmenuBtn({taskType} : {taskType : TaskType}){    
    const task = TaskRegistry[taskType];
   
    const onDragStartEvent = (event : React.DragEvent, type : TaskType)=>{
        event.dataTransfer.setData("application/reactflow",type);
        event.dataTransfer.effectAllowed = "move";
    }

    return  (<Button variant={"outline"} draggable onDragStart={(event)=> onDragStartEvent(event, taskType)} className="flex justify-between" >
        <div className="flex gap-2 items-center">
        <task.icon size={20}/>
        {task.label}
        </div>
        <Badge variant={"outline"} className="flex gap-1">  
            <CoinsIcon className="text-yellow-500"/>
            {task.credits}
        </Badge>
    </Button>)
}