"use client"
import { TaskType } from '@/app/types/tasks'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {TaskRegistry} from '@/lib/workflow/task/Registry'
import { CoinsIcon, GripVertical } from 'lucide-react'
import React from 'react'
import DeleteWorkflowCardBtn from './DeleteWorkflowCardBtn'
import CopyWorkflowCardBtn from './CopyWorkflowCard'

const NodeHeader = ({taskType, nodeId}:{taskType : TaskType,nodeId : string}) => {

    const task = TaskRegistry[taskType];



  return (
    <div className=' flex items-center gap-2 p-2 '>
        <task.icon size={16} />
        <div className=' flex gap-4 justify-between items-center w-full '>
            <p className=' text-xs font-bold uppercase text-muted-foreground ' >
                {task.label}
            </p>
            <div className='flex items-center gap-2'>
                {task.isEntryPoint && <Badge>Entry point</Badge>}
                <Badge className='w-fit flex gap-1 justify-center items-center text-xs ' >
                    <CoinsIcon size={16} />
                    {task.credits}
                </Badge>
                {!task.isEntryPoint && (
                    <DeleteWorkflowCardBtn nodeId={nodeId}/>
                    
                )}
                {!task.isEntryPoint && (
                    <CopyWorkflowCardBtn nodeId={nodeId}/>
                )}
                <Button className='drag-handle cursor-grab' size={"icon"} variant={"ghost"}>
                     <GripVertical size={16} />
                </Button>
            </div>

        </div>
    </div>
  )
}

export default NodeHeader