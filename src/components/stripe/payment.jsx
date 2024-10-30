"use client";
import Link from "next/link";

const product = [
  {
    link: "",
    priceId: "prod_R7WyUvLmG3yohD",
    name: "Annual",
    description: "Get access to all features",
    price: 24.99,
    currency: "USD",
    period: "year",
    features: [
      "All Free features",
      "Create unlimited posts",
      "Advanced profile customization",
      "Priority support",
    ],
    buttonText: "Get Started",
  },
];
const PaymentComponent = ({ domain }) => {
  return (
    <Link href={`/${domain}/pricing`} className="btn btn-primary">
      Get premium
    </Link>
  );
};
export default PaymentComponent;
