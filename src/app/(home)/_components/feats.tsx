import {
  BotIcon,
  ChartLineIcon,
  HandshakeIcon,
  Search,
  ShieldCheck,
  WorkflowIcon,
} from "lucide-react";
import React from "react";
import FeatCard from "./feat-card";

type Props = {};

const Feats = (props: Props) => {
  return (
    <div className="min-h-screen p-4 flex flex-col justify-evenly items-center">
      <div className="flex flex-col justify-center gap-4 items-center p-2">
        <span className="border border-neutral-500 p-1 px-2 rounded-full">
          Features
        </span>
        <div className="flex flex-col justify-center text-5xl font-semibold">
          <span>Discover Our Powerful</span>
          <span>Application Features</span>
        </div>
        <p className="text-lg text-center text-neutral-300 mb-6">
          Unlock your potential of your data with our innovative features.
          <br />
          Experience seamless monitoring and insights that drive yout business
          forward
        </p>
      </div>

      <div className="flex flex-wrap gap-6 justify-center items-center">
        <FeatCard
          Icon={ChartLineIcon}
          title="Automate Monitoring for Effortless Oversight"
          desc="Stay ahead of the competition with automated tracking"
        />

        <FeatCard
          Icon={Search}
          title="Real-Time Data for Informed Decisions"
          desc="Access the latest information to make timely choices"
        />

        <FeatCard
          Icon={HandshakeIcon}
          title="Markt Insights to Understand Trends"
          desc="GAin crucial insights to navigate your market landscape."
        />

        <div className="w-full flex flex-col justify-center items-center gap-3 mb-6">
          <div className="text-4xl font-semibold">
            Our Advanced Data Solutions
          </div>
          <p className="text-lg text-neutral-400">
            Our platform empowers you with innovative tools to streamline data
            extraction.
            <br />
          </p>
        </div>

        <FeatCard
          Icon={WorkflowIcon}
          title="No-Code Workflow Builder"
          desc="Automate stuff by just drag and drop"
        />
        <FeatCard
          Icon={BotIcon}
          title="AI Enhanced Extraction"
          desc="Extract data from the website and json with ai"
        />
        <FeatCard
          Icon={ShieldCheck}
          title="Secure & Scalable"
          desc="Don't worry about the security it's on us"
        />
      </div>
    </div>
  );
};

export default Feats;
