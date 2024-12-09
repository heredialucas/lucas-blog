import PricingCard from "./pricingCard";
import { getClientInfoByDomain } from "@/app/server/actions/actions";

const freePlan = [
  {
    title: "Free",
    price: 0,
    priceId: process.env.NODE_ENV === "development" ? "" : "",
    currency: "USD",
    period: "lifetime",
    features: [
      "Online presence",
      "Job timeline",
      "Contact form",
      "Basic profile",
    ],
    buttonText: "Get Started",
    link: "/blogui.me",
  },
];
const subscribedPlan = [
  {
    title: "Annual",
    price: 24.99,
    priceId:
      process.env.NODE_ENV === "development"
        ? "prod_R7WyUvLmG3yohD"
        : "prod_R8DHoZYl9fw7ww",
    currency: "USD",
    period: "year",
    features: [
      "All Free features",
      "Create unlimited posts",
      "Advanced profile customization",
      "Priority support",
    ],
    buttonText: "Get Started",
    link:
      process.env.NODE_ENV === "development"
        ? "https://buy.stripe.com/test_14k7wxfpL2C30EM5kl"
        : "https://buy.stripe.com/5kA5o3aVGc8n42QfYY",
  },
  {
    title: "Lifetime",
    price: 49.99,
    priceId:
      process.env.NODE_ENV === "development"
        ? "prod_R7WzoiGS6eZCTS"
        : "prod_R8DI84sV1o6Orw",
    currency: "USD",
    period: "lifetime",
    features: [
      "All Free features",
      "Create unlimited posts",
      "Advanced profile customization",
      "Priority support",
    ],
    buttonText: "Get Started",
    link:
      process.env.NODE_ENV === "development"
        ? "https://buy.stripe.com/test_4gw6st5PbgsTdry6oq"
        : "https://buy.stripe.com/7sI7wbfbW4FVeHu145",
  },
];
export default async function PricingPlans({ params }) {
  const { domain } = params;
  const { client } = await getClientInfoByDomain(domain);

  return (
    <div className="container mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-12">Choose Your Plan</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {freePlan.map((plan, idx) => (
          <PricingCard key={idx} {...plan} disabled={true} client={client} />
        ))}
        {subscribedPlan.map((plan, idx) => (
          <PricingCard
            key={idx}
            {...plan}
            disabled={client.isSubscribed}
            client={client}
          />
        ))}
      </div>
    </div>
  );
}
