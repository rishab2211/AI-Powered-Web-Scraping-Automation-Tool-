import { TaskType } from "@/app/types/tasks";
import { Button } from "@/components/ui/button";
import { TaskRegistry } from "@/lib/workflow/task/Registry";

export function TaskmenuBtn({taskType} : {taskType : TaskType}){    
    const task = TaskRegistry[taskType];
   
    const onDragStartEvent = (event : React.DragEvent, type : TaskType)=>{
        event.dataTransfer.setData("application/reactflow",type);
        event.dataTransfer.effectAllowed = "move";
    }

    return  (<Button variant={"outline"} draggable onDragStart={(event)=> onDragStartEvent(event, taskType)} >
        <task.icon size={20}/>
        {task.label}
    </Button>)
}