"use client";

import { WorkflowIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

type Props = {};

const Navbar = (props: Props) => {
  const router = useRouter();

  return (
    <div className="flex justify-between items-center p-4">
      <div className="flex gap-6">
        <Link href={"/"}>
          <WorkflowIcon size={25} />
        </Link>
        <div className="sm:flex gap-2 hidden  ">
          <NavButton link="/" text="Home" />
          <NavButton link="#features" text="Features" />
          <NavButton link="#pricing" text="Pricing" />
          <NavButton link="#" text="Support" />
        </div>
      </div>

      <div className="flex gap-2">
        <Link href="/sign-in">
          <button className="relative inline-flex h-10 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
            <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
              Signin
            </span>
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;

type LinkBtnProp = {
  link: string;
  text: string;
};
const NavButton = ({ link, text }: LinkBtnProp) => {
  return (
    <Link
      href={link}
      className="text-neutral-300 hover:-translate-y-1 transition-all duration-300 hover:text-lg hover:underline mx-2"
    >
      {text}
    </Link>
  );
};
