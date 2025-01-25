import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useReactFlow } from '@xyflow/react'
import { TrashIcon } from 'lucide-react'
import React from 'react'

const DeleteWorkflowCardBtn = ({nodeId} : {nodeId : string}) => {
  const {deleteElements} = useReactFlow();

  return (
    <div><TooltipProvider>
    <Tooltip>
    <TooltipTrigger asChild>
    <Button variant={"ghost"} size={"icon"} className=' hover:shadow-md' onClick={()=>{
      deleteElements({
        nodes :[{id : nodeId}]
      })
    }}  ><TrashIcon className='text-destructive'/></Button>
    </TooltipTrigger>
    <TooltipContent className='bg-primary text-secondary m-2 px-2 py-1 rounded'>
    delete 
    </TooltipContent>
    </Tooltip>
</TooltipProvider></div>
  )
}

export default DeleteWorkflowCardBtn