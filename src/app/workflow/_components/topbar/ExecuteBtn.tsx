"use client"
import useExecutionPlan from '@/components/hooks/useExecutionPlan'
import { Button } from '@/components/ui/button'
import { PlayIcon } from 'lucide-react'
import React from 'react'

const ExecuteBtn = ({workflowId}:{workflowId: string}) => {

  const generate = useExecutionPlan();
  return (
    <Button variant={'outline'} className='flex items-center justify-center'
    onClick={()=>{
      const plan = generate();
      console.log("-- plan --");
      console.table(plan);
      
    }}
    >
        <PlayIcon/>
        Execute
    </Button>
  )
}

export default ExecuteBtn