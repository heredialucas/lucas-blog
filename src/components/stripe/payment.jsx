"use client";
import Link from "next/link";

const product = {
  link: "https://buy.stripe.com/test_28o8AB7Xj5OfgDKbII",
  priceId: "prod_R74XAwo5qfoo4B",
};

const PaymentComponent = () => {
  return (
    <Link
      href={`${product.link}?prefilled_email=heredialucasfac22@gmail.com`}
      target="_blank"
      className="btn btn-primary"
    >
      Get premium
    </Link>
  );
};
export default PaymentComponent;
