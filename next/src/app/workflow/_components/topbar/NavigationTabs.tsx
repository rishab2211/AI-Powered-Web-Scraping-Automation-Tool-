"use client"

import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NavigationTabs = ({ workflowId }: { workflowId: string }) => {
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState(() => {
    // Determine initial tab based on current pathname
    if (pathname.includes("/editor/")) {
      return "editor";
    } else if (pathname.includes("/runs/")) {
      return "runs";
    }
    return "editor"; // default tab
  });
  useEffect(() => {
    // Update active tab when pathname changes
    if (pathname.includes("/editor/")) {
      setActiveTab("editor");
    } else if (pathname.includes("/runs/")) {
      setActiveTab("runs");
    }
  }, [pathname]);

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="md:w-full">
      <TabsList>
        <Link href={`/workflow/editor/${workflowId}`}>
          <TabsTrigger value="editor">Editor</TabsTrigger>
        </Link>
        <Link href={`/workflow/runs/${workflowId}`}>
          <TabsTrigger value="runs">Runs</TabsTrigger>
        </Link>
      </TabsList>
    </Tabs>
  );
};

export default NavigationTabs;
