
import { ParamProps } from '@/app/types/appNode';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label'
import React, { useId, useState } from 'react'





const BrowserInstanceParam = ({param, value, updateNodeParamValue}: ParamProps) => {
    
    const id = useId();
  return (
    <p className='text-xs'>{param.name}</p>
  )
}

export default BrowserInstanceParam