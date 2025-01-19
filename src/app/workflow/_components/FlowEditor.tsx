"use client";
import { Workflow } from "@prisma/client";
import {
  Background,
  BackgroundVariant,
  Controls,
  ReactFlow,
  useEdgesState,
  useNodesState,
} from "@xyflow/react";
import React from "react";
import "@xyflow/react/dist/style.css";
import { CreateFlowNode } from "@/lib/workflow/createFlowNode";
import { TaskType } from "@/app/types/tasks";
import NodeComponent from "./nodes/NodeComponent";


const nodeTypes = {
    Node : NodeComponent
}

const snapGrid: [number, number] = [1,1]


const FlowEditor = ({ workflow }: { workflow: Workflow }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([
    CreateFlowNode(TaskType.LAUNCH_BROWSER)
  ]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  return (
    <div className="h-screen w-screen ">
      <main className=" h-full w-full ">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          snapToGrid={true}
          snapGrid={snapGrid}
        
        >
          <Controls position="top-left" className="bg-pink" />
          <Background variant={BackgroundVariant.Dots} />
        </ReactFlow>
      </main>
    </div>
  );
};

export default FlowEditor;