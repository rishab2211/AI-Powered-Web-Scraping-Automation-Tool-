"use client"

import { DialogTitle } from "@radix-ui/react-dialog"
import { DialogHeader } from "./ui/dialog"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface Props{
    title?:string,
    subTitle?:string,
    icon?:LucideIcon,

    iconClassName?:string,
    titleClassName?:string,
    subTitleClassName?:string
}
const CustomDialogHeader = (props : Props) => {

    const Icon = props.icon;

  return (
    <DialogHeader>
        <DialogTitle asChild >
            <div className="flex flex-col justify-center items-center ">
                {Icon && <Icon size={20} />}
                {props.title && (<p className={cn("text-xl text-primary",props.titleClassName)} >{props.title}</p>)}
                {props.subTitle && (<p className={cn("text-sm text-muted-foreground ",props.subTitleClassName)} >{props.subTitle}</p>)}
                
            </div>
        </DialogTitle>
    </DialogHeader>
  )
}

export default CustomDialogHeader