import CreateCountupWrapper from "@/components/CreateCountupWrapper";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import React from "react";
import CountUp from "react-countup";

type Props = {
  title: string;
  value: number;
  icon: LucideIcon;
};

const StatCard = ({ title, value, icon }: Props) => {
    const Icon = icon;
  return (
    <Card className="relative overflow-hidden">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <Icon size={120} className="text-muted-foreground absolute -bottom-6 -right-7 stroke-primary opacity-15" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-primary">
        <CreateCountupWrapper value={value} />
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;


