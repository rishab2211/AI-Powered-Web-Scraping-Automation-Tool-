import { ParamProps } from "@/app/types/appNode";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import React, { useEffect, useId, useState } from "react";

const StringParam = ({
  param,
  value,
  updateNodeParamValue,
  disabled,
}: ParamProps) => {
  const [internalValue, setInternalValue] = useState(value);
  const id = useId();
  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  let Component: any = Input;
  if (param.variant === "textarea") {
    Component = Textarea;
  }
  return (
    <div className="space-y-1 flex flex-col p-1 w-full">
      <Label htmlFor={id} className="text-sm flex ">
        {param.name}
        {param.required && <p className="text-destructive ">*</p>}
      </Label>
      <Component
        id={id}
        value={value}
        disabled={disabled}
        placeholder="Enter value here..."
        onChange={(e: any) => updateNodeParamValue(e.target.value)}
      />
      {param.helperText && (
        <p className="text-muted-foreground ">{param.helperText}</p>
      )}
    </div>
  );
};

export default StringParam;
