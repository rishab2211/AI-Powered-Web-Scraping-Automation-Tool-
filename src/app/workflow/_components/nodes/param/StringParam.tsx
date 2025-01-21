
import { ParamProps } from '@/app/types/appNode';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label'
import React, { useId, useState } from 'react'





const StringParam = ({param, value, updateNodeParamValue}: ParamProps) => {
    
    const id = useId();
  return (
    <div className='space-y-1 flex flex-col p-1 w-full'>
        <Label htmlFor={id} className='text-sm flex '>
            {param.name}
            {param.required && <p className='text-destructive '>*</p>}
        </Label>
        <Input id={id} value={value}  placeholder='Enter value here...' onChange={(e)=>updateNodeParamValue(e.target.value)} />
        {param.helperText && (<p className='text-muted-foreground ' >{param.helperText}</p>)} 
    </div>
  )
}

export default StringParam