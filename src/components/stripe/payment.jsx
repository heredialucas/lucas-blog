"use client";
import Link from "next/link";

const product = {
  link: "https://buy.stripe.com/test_28o8AB7Xj5OfgDKbII",
  priceId: "prod_R74XAwo5qfoo4B",
};

const PaymentComponent = ({ domain }) => {
  return (
    <Link href={`/${domain}/pricing`} className="btn btn-primary">
      Get premium
    </Link>
  );
};
export default PaymentComponent;
