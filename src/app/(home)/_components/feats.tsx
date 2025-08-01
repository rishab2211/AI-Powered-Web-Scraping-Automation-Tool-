import React from "react";
import { Button } from "@/components/ui/button";
import { BarChart3, Bot, Search, Shield, TrendingUp, Zap } from "lucide-react";
import Link from "next/link";


type props = {
  Icon: React.ElementType;
  title: string;
  desc: string;
};


const FeatCard = ({ Icon, title, desc }:props) => {
  return (
    <div className="group relative p-8 rounded-2xl border border-neutral-200 bg-white hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="mb-6">
        <div className="w-12 h-12 rounded-xl bg-neutral-50 flex items-center justify-center group-hover:bg-neutral-100 transition-colors duration-300">
          <Icon className="w-6 h-6 text-neutral-700" />
        </div>
      </div>
      
      <h3 className="text-xl font-semibold text-neutral-900 mb-3">
        {title}
      </h3>
      
      <p className="text-neutral-600 leading-relaxed">
        {desc}
      </p>
    </div>
  );
};

// Minimalist Feats component
export const Feats = () => {
  return (
    <section id="features" className="py-24 bg-neutral-50">
      <div className="max-w-7xl mx-auto px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-neutral-100 text-neutral-600 text-sm font-medium mb-8">
            Features
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6 max-w-3xl mx-auto leading-tight">
            Everything you need to automate your workflow
          </h2>
          
          <p className="text-xl text-neutral-600 max-w-2xl mx-auto leading-relaxed">
            Powerful tools designed to streamline your processes and unlock insights from your data.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          <FeatCard
            Icon={TrendingUp}
            title="Automated Monitoring"
            desc="Stay informed with intelligent alerts and real-time tracking of your key metrics."
          />

          <FeatCard
            Icon={Search}
            title="Real-Time Insights"
            desc="Access live data and analytics to make informed decisions quickly and confidently."
          />

          <FeatCard
            Icon={BarChart3}
            title="Market Intelligence"
            desc="Understand trends and patterns with comprehensive market analysis and reporting."
          />

          <FeatCard
            Icon={Zap}
            title="No-Code Builder"
            desc="Create powerful automations with our intuitive drag-and-drop workflow builder."
          />
          
          <FeatCard
            Icon={Bot}
            title="AI Extraction"
            desc="Leverage advanced AI to extract and process data from any source automatically."
          />
          
          <FeatCard
            Icon={Shield}
            title="Enterprise Security"
            desc="Bank-level security with end-to-end encryption and compliance certifications."
          />
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h3 className="text-2xl font-semibold text-neutral-900 mb-4">
            Ready to transform your workflow?
          </h3>
          <p className="text-neutral-600 mb-8 max-w-lg mx-auto">
            Join thousands of teams already using our platform to automate their processes.
          </p>
          <Link href="/sign-up">
            <Button className="bg-neutral-900 hover:bg-neutral-800 text-white px-8 py-3 rounded-full font-medium">
              Get Started Free
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
