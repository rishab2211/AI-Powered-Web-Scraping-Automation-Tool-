"use client";
import Link from "next/link";
import animationData from "../../public/not-found-lottie.json";

import dynamic from "next/dynamic";
import { ArrowLeft } from "lucide-react";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const NotFound = () => {
  return (
    <div className="flex flex-col  items-center justify-center min-h-screen">
      <Lottie
        animationData={animationData}
        loop={true}
        autoplay={true}
        style={{ height: 500, width: 500 }}
        onClick={() => {}} // This disables click to pause
      />

      <div className="bg-blue-500 hover:bg-blue-400 p-2 rounded text-white" >
        <Link href={"/"} className="flex items-center gap-1 transition-all duration-300">
          <ArrowLeft />
          back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
