import { CustomNode } from "@/app/types/appNode";
import { FlowToExecutionPlan, FlowToExecutionPlanValidationError } from "@/lib/workflow/FlowToExecutionPlan";
import { useReactFlow } from "@xyflow/react";
import { useCallback } from "react";
import useFlowValidation from "./useFlowValidation";
import { toast } from "sonner";




const useExecutionPlan = () => {
  const { toObject } = useReactFlow();
  const {setInvalidInputs, clearErrors} = useFlowValidation();

  const handleError = useCallback((error : any)=>{
    switch(error.type){
      case FlowToExecutionPlanValidationError.NO_ENTRY_POINT:
        toast.error("No entry point found");
        break;
      case FlowToExecutionPlanValidationError.INVALID_INPUTS:
        setInvalidInputs(error.invalidElements)
        toast.error("Not all input values are set, Please set inputs to proceed");
        break;
      default : 
        toast.error("something went wrong.")
        break;
    }
  },[setInvalidInputs]);

  const generateExecutionPlan = useCallback(() => {
    const {nodes, edges} = toObject();
    const {executionPlan, error} = FlowToExecutionPlan(nodes as CustomNode[] , edges);

    if(error){
      handleError(error);
      return null;
    }

    clearErrors();
    return executionPlan;
  }, [toObject, handleError, clearErrors]);
  return generateExecutionPlan;
};

export default useExecutionPlan;