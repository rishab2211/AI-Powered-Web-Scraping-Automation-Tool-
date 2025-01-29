"use server"

import { ExecutionPhaseStatus, WorkflowExecutionPlan, WorkflowExecutionStatus, WorkflowExecutionTrigger } from "@/app/types/Workflows";
import prisma from "@/lib/prisma";
import { ExecuteWorkflow } from "@/lib/workflow/executeWorkflow";
import { FlowToExecutionPlan } from "@/lib/workflow/FlowToExecutionPlan";
import { TaskRegistry } from "@/lib/workflow/task/Registry";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function RunWorkflow(form:{
    workflowId : string;
    flowDefinition : string;
}) {

    console.log("inside runWorkflow");
    
    
    const {userId} =  await auth();

    if(!userId){
        throw new Error("unauthenticated");
    }

    
    

    const {workflowId, flowDefinition} = form;

    
    
   

    if(!workflowId){
        throw new Error("Workflow ID is required");
    }

    const workflow  = await prisma.workflow.findUnique({
        where : {
            userId,
            id : workflowId
        }
    });

    if(!workflow){
        throw new Error("workflow not defined");
    }

    let executionPlan : WorkflowExecutionPlan;

    if(!flowDefinition){
        throw new Error("flow definition is not defined");
    }

    const flow = JSON.parse(flowDefinition);
    if (!flow || !Array.isArray(flow.nodes) || !Array.isArray(flow.edges)) {
        throw new Error("Invalid flow structure");
      }
    const result = FlowToExecutionPlan(flow.nodes, flow.edges);

    if(result.error){
        throw new Error("Flow definition not valid");
    }

    if(!result.executionPlan){
        throw new Error("No execution plan generated")
    }

    executionPlan = result.executionPlan;

    const execution = await prisma.workflowExecution.create({
        data : {
            workflowId,
            userId,
            status : WorkflowExecutionStatus.PENDING,
            startedAt : new Date(),
            trigger : WorkflowExecutionTrigger.MANUAL,
            phases :{
                create : executionPlan.flatMap(phase => {
                    return phase.nodes.flatMap((node)=>{
                        return {
                            userId,
                            status : ExecutionPhaseStatus.CREATED,
                            number : phase.phase,
                            node : JSON.stringify(node),
                            name : TaskRegistry[node.data.type].label
                        }
                    })
                })
            }
            
        },

        select:{
            id : true,
            phases : true,
        }
    })


    if(!execution){
        throw new Error("Workflow execution not created");
    }

    ExecuteWorkflow(execution.id); // run this on background
    
    redirect(`/workflow/runs/${workflowId}/${execution.id}`)

}   