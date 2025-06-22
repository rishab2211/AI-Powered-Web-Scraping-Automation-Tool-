import { LucideIcon } from "lucide-react";
import React from "react";

type Props = {
  Icon: LucideIcon;
  title: string;
  desc: string;
};

const FeatCard = ({ Icon, title, desc }: Props) => {
  return (
    <div className="flex flex-col justify-center items-center w-[350px] md:w-[450px] lg:[600px] py-4 px-6 bg-neutral-900 rounded-lg hover:-translate-x-1 hover:-translate-y-1 transition-all">
      <Icon size={35} />
      <div className="text-2xl mt-2 font-semibold">{title}</div>
      <p className="mt-4">{desc}</p>
    </div>
  );
};

export default FeatCard;
