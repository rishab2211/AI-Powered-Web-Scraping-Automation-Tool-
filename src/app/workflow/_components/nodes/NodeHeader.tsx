"use client"
import { TaskType } from '@/app/types/tasks'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {TaskRegistry} from '@/lib/workflow/task/Registry'
import { CoinsIcon, GripVertical } from 'lucide-react'
import React from 'react'

const NodeHeader = ({taskType}:{taskType : TaskType}) => {

    const task = TaskRegistry[taskType];



  return (
    <div className=' flex items-center gap-2 p-2 '>
        <task.icon size={16} />
        <div className=' flex justify-between items-center w-full '>
            <p className=' text-xs font-bold uppercase text-muted-foreground ' >
                {task.label}
            </p>
            <div className='flex items-center gap-2'>
                {task.isEntryPoint && <Badge>Entry point</Badge>}
                <Badge className='w-fit flex justify-center items-center text-xs ' >
                    <CoinsIcon size={16} />
                    TODO
                </Badge>
                <Button className='drag-handle cursor-grab' size={"icon"} variant={"ghost"}>
                     <GripVertical size={16} />
                </Button>
            </div>

        </div>
    </div>
  )
}

export default NodeHeader