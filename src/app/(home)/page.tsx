// "use client";
import { ArrowRight } from "lucide-react";
import { Feats } from "./_components/feats";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import PricingSection from "./_components/pricing";


const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-8 pt-20 pb-24">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-neutral-100 text-neutral-600 text-sm font-medium mb-8">
              ✨ Now available - No-code automation
            </div>
            
            {/* Main headline */}
            <h1 className="text-5xl md:text-7xl font-bold text-neutral-900 mb-8 leading-tight tracking-tight">
              Automate workflows
              <br />
              <span className="text-neutral-500">without code</span>
            </h1>
            
            {/* Subheading */}
            <p className="text-xl md:text-2xl text-neutral-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Transform your business processes with intelligent automation. 
              Extract data, monitor changes, and gain insights—all without writing a single line of code.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/sign-up">
                <Button className="bg-neutral-900 hover:bg-neutral-800 text-white px-8 py-4 rounded-full font-medium text-lg">
                  Start Free Trial
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              
              <Link href="#features">
                <Button variant="ghost" className="text-neutral-600 px-8 py-4 rounded-full font-medium text-lg">
                  Learn More
                </Button>
              </Link>
            </div>
            
            {/* Social proof */}
            <div className="mt-16 pt-8 border-t border-neutral-200">
              <p className="text-sm text-neutral-500 mb-6">Trusted by teams at</p>
              <div className="flex justify-center items-center space-x-12 opacity-60">
                <div className="text-2xl font-bold text-neutral-400">Company</div>
                <div className="text-2xl font-bold text-neutral-400">Startup</div>
                <div className="text-2xl font-bold text-neutral-400">Enterprise</div>
                <div className="text-2xl font-bold text-neutral-400">Agency</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Subtle background decoration */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-neutral-100 rounded-full blur-3xl opacity-50" />
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-neutral-100 rounded-full blur-3xl opacity-50" />
        </div>
      </section>

      {/* Features Section */}
      <Feats />
      
      {/* Final CTA Section */}
      <section className="py-24 bg-neutral-900">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to get started?
          </h2>
          <p className="text-xl text-neutral-300 mb-10 max-w-2xl mx-auto">
            Join thousands of teams who have already transformed their workflows with our platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/sign-up">
              <Button className="bg-white hover:bg-neutral-100 text-neutral-900 px-8 py-4 rounded-full font-medium text-lg">
                Start Your Free Trial
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="ghost" className="text-white hover:text-neutral-200 border-white hover:border-neutral-200 px-8 py-4 rounded-full font-medium text-lg">
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>


      <section>
        <PricingSection/>
      </section>
    </div>
  );
};

export default Home;