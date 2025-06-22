import React from "react";
import Navbar from "./_components/navbar";
import { ContainerScroll } from "./_components/scroll-animation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Feats from "./_components/feats";
import Link from "next/link";
// import { GridBackground } from "./_components/grid-background";

type Props = {};

const Home = (props: Props) => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <div className="h-[100vh] flex flex-col items-center justify-center">
        <div className="relative flex h-[50rem] w-full items-center justify-center bg-white dark:bg-black">
          <div
            className={cn(
              "absolute inset-0",
              "[background-size:40px_40px]",
              "[background-image:linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)]",
              "dark:[background-image:linear-gradient(to_right,#262626_1px,transparent_1px),linear-gradient(to_bottom,#262626_1px,transparent_1px)]"
            )}
          />
          {/* Radial gradient for the container to give a faded look */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] dark:bg-black"></div>
          <div className="relative z-20 bg-gradient-to-b from-neutral-200 to-neutral-500 bg-clip-text py-8 text-4xl font-bold text-transparent sm:text-7xl">
            <div className="p-4">
              <h1 className="text-5xl">
                Unlock Powerful Insights
                <br /> with Ease
              </h1>
              <h2 className="text-2xl text-neutral-200">
                <i className="text-3xl">Automate</i> your workflows with our{" "}
                <i className="text-3xl">no-code</i> automation tool
              </h2>
            </div>
            <div className="flex justify-center gap-2">
              <Link href={"#features"}>
                <Button variant={"destructive"}>Learn more</Button>
              </Link>
              <Link href={"/sign-up"}>
                <Button>Signup</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}

      <Feats />
    </div>
  );
};

export default Home;
