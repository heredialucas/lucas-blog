import React from "react";
import PricingCard from "./pricingCard";

export default function PricingPlans() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-12">Choose Your Plan</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <PricingCard
          title="Free"
          price={0}
          currency="USD"
          period="month"
          features={[
            "Online presence",
            "Job timeline",
            "Contact form",
            "Basic profile",
          ]}
          buttonText="Get Started"
          buttonLink="/signup"
        />
        <PricingCard
          title="Annual"
          price={99}
          currency="USD"
          period="year"
          features={[
            "All Free features",
            "Create unlimited posts",
            "Advanced profile customization",
            "Priority support",
          ]}
          buttonText="Go Annual"
          buttonLink="/signup-annual"
        />
        <PricingCard
          title="Lifetime"
          price={299}
          currency="USD"
          period={null}
          features={[
            "All Annual features",
            "AI-powered cover letter creation",
            "Job application tracking",
            "Personal career coach",
            "Lifetime updates",
          ]}
          buttonText="Get Lifetime Access"
          buttonLink="/signup-lifetime"
        />
      </div>
    </div>
  );
}
