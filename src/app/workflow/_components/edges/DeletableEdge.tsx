import { Button } from '@/components/ui/button';
import { BaseEdge, EdgeLabelRenderer, EdgeProps, getSmoothStepPath, useReactFlow } from '@xyflow/react'
import React from 'react'

const DeletableEdge = (props : EdgeProps) => {

    const [edgePath, labelX, labelY] =  getSmoothStepPath(props);
    const {setEdges} = useReactFlow();

  return (
    <>
    <BaseEdge path={edgePath} markerEnd={props.markerEnd} style={props.style} />
    <EdgeLabelRenderer>
        <div style={{
            position : "absolute",
            transform : `translate(-50%,-50%) translate(${labelX}px,${labelY}px)`,
            pointerEvents : "all"
        }}>
        <Button variant={'outline'} 
        size={"icon"}  
        className='rounded-full w-6 h-6 cursor-pointer leading-none hover:shadow-lg hover:bg-destructive hover:text-secondary'
        onClick={()=>{
            setEdges(edges=> edges.filter((edge)=> edge.id !== props.id));
        }}
        >
            x
        </Button>
        </div>
        </EdgeLabelRenderer></>
  )
}

export default DeletableEdge