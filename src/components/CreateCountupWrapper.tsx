"use client"

import { useEffect, useState } from "react"
import CountUp from "react-countup"
const CreateCountupWrapper = ({value} : {value : number}) => {

    const [mounted, setMounted] = useState(false);
    useEffect(()=>{
        setMounted(true);
    },[]);

    if(!mounted){
        return "---";
    }
  return (
    <CountUp end={value} duration={2} preserveValue decimals={0} />
  )
}

export default CreateCountupWrapper