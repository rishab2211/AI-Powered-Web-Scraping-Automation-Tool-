"use client";
import { Workflow } from "@prisma/client";
import {
  addEdge,
  Background,
  BackgroundVariant,
  Connection,
  Controls,
  Edge,
  ReactFlow,
  useEdgesState,
  useNodesState,
  useReactFlow,
} from "@xyflow/react";
import React, { useCallback, useEffect } from "react";
import "@xyflow/react/dist/style.css";
import { CreateFlowNode } from "@/lib/workflow/createFlowNode";
import { TaskType } from "@/app/types/tasks";
import NodeComponent from "./nodes/NodeComponent";
import { CustomNode } from "@/app/types/appNode";
import DeletableEdge from "./edges/DeletableEdge";

const nodeTypes = {
  Node: NodeComponent,
};

const edgeTypes = {
  default : DeletableEdge
}

const snapGrid: [number, number] = [1, 1];

const FlowEditor = ({ workflow }: { workflow: Workflow }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState<CustomNode>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState <Edge>([]);
  const { setViewport, screenToFlowPosition } = useReactFlow();

  useEffect(() => {
    try {
      const flow = JSON.parse(workflow.definition);
      if (!flow) {
        return;
      }

      setNodes(flow.nodes || []);
      setEdges(flow.edges || []);

      if (!flow.viewport) return;
      const { x = 0, y = 0, zoom = 1 } = flow.viewport;
      setViewport({ x, y, zoom });
    } catch (err) {
      console.log(err);
      
    }
  }, [workflow.definition,setEdges,setNodes,setViewport]);


  const onDragOver = useCallback((event : React.DragEvent)=>{
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  },[])

  const onDrop = useCallback((event : React.DragEvent)=>{
    event.preventDefault();
    const taskType = event.dataTransfer.getData("application/reactflow");
    
    if(typeof taskType === undefined || !taskType) return;

    const position = screenToFlowPosition({
      x : event.clientX,
      y : event.clientY
    })

    const newNode = CreateFlowNode(taskType as TaskType, position);
    setNodes(nds=>nds.concat(newNode))
  },[])

  const onConnect = useCallback((connection : Connection)=>{
    console.dir(connection,{depth : null});
    setEdges(eds=> addEdge({...connection, animated: true},eds))
    
  },[])

  return (
    <div className="h-screen w-screen ">
      <main className=" h-full w-full ">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          snapToGrid={true}
          snapGrid={snapGrid}
          onDragOver={onDragOver}
          onDrop={onDrop}
          onConnect={onConnect}
        >
          <Controls position="top-left" className="" />
          <Background variant={BackgroundVariant.Dots} />
        </ReactFlow>
      </main>
    </div>
  );
};

export default FlowEditor;
