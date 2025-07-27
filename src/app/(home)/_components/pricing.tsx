"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Check, ArrowRight, Zap, Crown, Building2 } from "lucide-react";
import Link from "next/link";

// Type definitions
interface PricingFeature {
  text: string;
  included: boolean;
}

interface PricingPlan {
  id: string;
  name: string;
  description: string;
  price: {
    monthly: number;
    yearly: number;
  };
  icon: React.ComponentType<{ className?: string }>;
  features: PricingFeature[];
  popular?: boolean;
  cta: {
    text: string;
    href: string;
  };
  badge?: string;
}

// Pricing data
const pricingPlans: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    description: "Perfect for individuals and small projects getting started with automation.",
    price: {
      monthly: 0,
      yearly: 0,
    },
    icon: Zap,
    features: [
      { text: "Up to 100 workflow runs per month", included: true },
      { text: "5 active automations", included: true },
      { text: "Basic data extraction", included: true },
      { text: "Email support", included: true },
      { text: "Community access", included: true },
      { text: "Advanced AI extraction", included: false },
      { text: "Priority support", included: false },
      { text: "Custom integrations", included: false },
    ],
    cta: {
      text: "Get Started Free",
      href: "/sign-up?plan=starter",
    },
  },
  {
    id: "professional",
    name: "Professional",
    description: "Ideal for growing teams and businesses that need more power and flexibility.",
    price: {
      monthly: 29,
      yearly: 290, // 2 months free
    },
    icon: Crown,
    popular: true,
    badge: "Most Popular",
    features: [
      { text: "Up to 10,000 workflow runs per month", included: true },
      { text: "Unlimited active automations", included: true },
      { text: "Advanced data extraction with AI", included: true },
      { text: "Priority email & chat support", included: true },
      { text: "Advanced analytics & reporting", included: true },
      { text: "Custom webhooks & API access", included: true },
      { text: "Team collaboration (up to 5 members)", included: true },
      { text: "Custom integrations", included: false },
    ],
    cta: {
      text: "Start Professional Trial",
      href: "/sign-up?plan=professional",
    },
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "For large organizations requiring advanced features, security, and dedicated support.",
    price: {
      monthly: 199,
      yearly: 1990, // 2 months free
    },
    icon: Building2,
    badge: "Best Value",
    features: [
      { text: "Unlimited workflow runs", included: true },
      { text: "Unlimited automations & team members", included: true },
      { text: "Enterprise-grade AI extraction", included: true },
      { text: "24/7 dedicated support", included: true },
      { text: "Advanced security & compliance", included: true },
      { text: "Custom integrations & workflows", included: true },
      { text: "On-premise deployment options", included: true },
      { text: "SLA guarantee & training", included: true },
    ],
    cta: {
      text: "Contact Sales",
      href: "/contact-sales",
    },
  },
];

// Individual pricing card component
const PricingCard: React.FC<{ plan: PricingPlan; isYearly: boolean }> = ({ plan, isYearly }) => {
  const price = isYearly ? plan.price.yearly : plan.price.monthly;
  const monthlyPrice = isYearly ? plan.price.yearly / 12 : plan.price.monthly;
  
  return (
    <div
      className={`relative rounded-2xl p-8 ${
        plan.popular
          ? "bg-neutral-900 text-white ring-2 ring-neutral-900 shadow-xl"
          : "bg-white border border-neutral-200 hover:shadow-lg transition-shadow duration-300"
      }`}
    >
      {/* Badge */}
      {plan.badge && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span
            className={`px-4 py-2 rounded-full text-sm font-medium ${
              plan.popular
                ? "bg-white text-neutral-900"
                : "bg-neutral-900 text-white"
            }`}
          >
            {plan.badge}
          </span>
        </div>
      )}

      {/* Header */}
      <div className="text-center mb-8">
        <div className="mb-4">
          <div
            className={`w-12 h-12 rounded-xl mx-auto flex items-center justify-center ${
              plan.popular
                ? "bg-white/10"
                : "bg-neutral-50"
            }`}
          >
            <plan.icon
              className={`w-6 h-6 ${
                plan.popular ? "text-white" : "text-neutral-700"
              }`}
            />
          </div>
        </div>
        
        <h3
          className={`text-2xl font-bold mb-2 ${
            plan.popular ? "text-white" : "text-neutral-900"
          }`}
        >
          {plan.name}
        </h3>
        
        <p
          className={`text-sm leading-relaxed ${
            plan.popular ? "text-neutral-300" : "text-neutral-600"
          }`}
        >
          {plan.description}
        </p>
      </div>

      {/* Pricing */}
      <div className="text-center mb-8">
        <div className="flex items-baseline justify-center mb-2">
          <span
            className={`text-4xl font-bold ${
              plan.popular ? "text-white" : "text-neutral-900"
            }`}
          >
            ${price === 0 ? "0" : Math.round(monthlyPrice)}
          </span>
          {price > 0 && (
            <span
              className={`ml-2 text-lg ${
                plan.popular ? "text-neutral-300" : "text-neutral-600"
              }`}
            >
              /month
            </span>
          )}
        </div>
        
        {isYearly && price > 0 && (
          <p
            className={`text-sm ${
              plan.popular ? "text-neutral-300" : "text-neutral-600"
            }`}
          >
            Billed annually (${price}/year)
          </p>
        )}
      </div>

      {/* CTA Button */}
      <div className="mb-8">
        <Link href={plan.cta.href} className="block">
          <Button
            className={`w-full py-3 font-medium ${
              plan.popular
                ? "bg-white text-neutral-900 hover:bg-neutral-100"
                : "bg-neutral-900 text-white hover:bg-neutral-800"
            }`}
          >
            {plan.cta.text}
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </Link>
      </div>

      {/* Features */}
      <div className="space-y-4">
        {plan.features.map((feature, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className="flex-shrink-0 mt-0.5">
              {feature.included ? (
                <Check
                  className={`w-5 h-5 ${
                    plan.popular ? "text-white" : "text-green-600"
                  }`}
                />
              ) : (
                <div
                  className={`w-5 h-5 rounded-full border-2 ${
                    plan.popular ? "border-neutral-600" : "border-neutral-300"
                  }`}
                />
              )}
            </div>
            <span
              className={`text-sm ${
                feature.included
                  ? plan.popular
                    ? "text-white"
                    : "text-neutral-900"
                  : plan.popular
                  ? "text-neutral-500"
                  : "text-neutral-400"
              }`}
            >
              {feature.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main pricing section component
const PricingSection: React.FC = () => {
  const [isYearly, setIsYearly] = React.useState<boolean>(true);

  const toggleBilling = (): void => {
    setIsYearly(!isYearly);
  };

  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
            Simple, transparent pricing
          </h2>
          <p className="text-xl text-neutral-600 max-w-3xl mx-auto mb-10 leading-relaxed">
            Choose the perfect plan for your automation needs. Start free and scale as you grow.
            All plans include our core features with no hidden fees.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center p-1 bg-neutral-100 rounded-full">
            <button
              onClick={toggleBilling}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-200 ${
                !isYearly
                  ? "bg-white text-neutral-900 shadow-sm"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={toggleBilling}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-200 relative ${
                isYearly
                  ? "bg-white text-neutral-900 shadow-sm"
                  : "text-neutral-600 hover:text-neutral-900"
              }`}
            >
              Yearly
              <span className="absolute -top-2 -right-1 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">
                Save 17%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {pricingPlans.map((plan) => (
            <PricingCard key={plan.id} plan={plan} isYearly={isYearly} />
          ))}
        </div>

        {/* FAQ Section */}
        <div className="text-center">
          <h3 className="text-2xl font-semibold text-neutral-900 mb-4">
            Questions about pricing?
          </h3>
          <p className="text-neutral-600 mb-8 max-w-2xl mx-auto">
            Our team is here to help you find the right plan for your needs. 
            Get in touch and we'll provide personalized recommendations.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button variant="ghost" className="text-neutral-600 hover:text-neutral-900">
                Contact Sales
              </Button>
            </Link>
            <Link href="/faq">
              <Button variant="ghost" className="text-neutral-600 hover:text-neutral-900">
                View FAQ
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;