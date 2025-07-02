"use client"
import { CustomNodeMissingInputs } from "@/app/types/appNode";
import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from "react";

type FlowValidationContextType = {
  invalidInputs: CustomNodeMissingInputs[];
  setInvalidInputs: Dispatch<SetStateAction<CustomNodeMissingInputs[]>>;
  clearErrors: () => void;
};

export const FlowValidationContext =
  createContext<FlowValidationContextType | null>(null);

export function FlowValidationContextProvider({
  children,
}: {
  children: ReactNode;
}) {

  const [invalidInputs, setInvalidInputs] = useState<CustomNodeMissingInputs[]>([]);

  const clearErrors = ()=>{
    setInvalidInputs([]);
  }
  return (
    <FlowValidationContext.Provider value={{
      invalidInputs,
      setInvalidInputs,
      clearErrors
    }}>{children}</FlowValidationContext.Provider>
  );
}

export default FlowValidationContextType;
