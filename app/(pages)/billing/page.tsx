"use client";
import React from "react";
import { Check } from "lucide-react";

const handlePurchase = (e: any) => {
  e.preventDefault();
};

const PricingCard = () => {
  const tiers = [
    {
      name: "Free",
      price: "$0",
      description: "Perfect for personal use",
      features: [
        "Up to 50 URLs per month",
        "Basic analytics",
        "Standard support",
        "24-hour link expiry",
      ],
    },
    {
      name: "Golden",
      price: "$9.99",
      description: "Ideal for professionals",
      features: [
        "Up to 1000 URLs per month",
        "Advanced analytics",
        "Priority support",
        "Custom link expiry",
        "Custom short URLs",
      ],
      popular: true,
    },
    {
      name: "Diamond",
      price: "$24.99",
      description: "Best for businesses",
      features: [
        "Unlimited URLs",
        "Enterprise analytics",
        "24/7 dedicated support",
        "API access",
        "Custom domains",
        "Team collaboration",
      ],
    },
  ];

  return (
    <div className="w-full max-w-6xl mx-auto px-4">
      {/* Heading Section */}
      <div className="text-center flex flex-col gap-4">
        <h2 className="text-sm font-bold text-white uppercase tracking-wide mt-6 ">
          Pricing Plans
        </h2>
        <h1 className="text-4xl md:text-5xl font-bold  mb-4">
          Choose Your Perfect Plan
        </h1>
        <p className="text-xl  max-w-2xl mx-auto">
          Get more features and flexibility with our premium plans. Start with
          our free tier and upgrade anytime.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-6 py-8">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={`relative rounded-lg shadow-xl bg-gradient-to-b from-blue-900 to-blue-950 
              p-6 flex flex-col transform transition-all duration-300 hover:scale-105 hover:shadow-2xl
              ${
                tier.popular
                  ? "border-2 border-blue-400"
                  : "border border-blue-800"
              }`}
          >
            {tier.popular && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-blue-400 text-blue-950 px-4 py-1 rounded-full text-sm font-bold">
                  Most Popular
                </span>
              </div>
            )}

            <div className="text-center mb-6">
              <h3 className="text-2xl font-bold mb-2 text-blue-100">
                {tier.name}
              </h3>
              <p className="text-blue-300 mb-4">{tier.description}</p>
              <div className="mt-4">
                <span className="text-4xl font-bold text-blue-100">
                  {tier.price}
                </span>
                <span className="text-blue-300">/month</span>
              </div>
            </div>

            <div className="flex-grow">
              <ul className="space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center group">
                    <Check className="h-5 w-5 text-blue-400 mr-2 flex-shrink-0 transition-transform duration-300 group-hover:scale-110" />
                    <span className="text-blue-200">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8">
              <button
                onClick={handlePurchase}
                className={`w-full py-3 px-4 rounded-lg  transition-all duration-300 font-semibold
                  ${
                    tier.popular
                      ? "bg-blue-400 text-blue-950 hover:bg-blue-300"
                      : "bg-blue-800 text-blue-100 hover:bg-blue-700"
                  }`}
              >
                Get Started
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingCard;
