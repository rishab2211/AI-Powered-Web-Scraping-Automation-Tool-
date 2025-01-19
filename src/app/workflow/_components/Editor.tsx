import { Workflow } from '@prisma/client'
import React from 'react'
import {ReactFlowProvider} from "@xyflow/react"
import FlowEditor from './FlowEditor'

const Editor = ({workflow}:{workflow : Workflow}) => {
  return (<div className='h-[95vh]'> 
    <ReactFlowProvider>
        <div className=' flex flex-col h-full w-full overflow-hidden ' >
            <section >
            <FlowEditor workflow={workflow}/>
            </section>
        </div>
    </ReactFlowProvider>
    </div>
  )
}

export default Editor