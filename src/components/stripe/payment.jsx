"use client";
import Link from "next/link";

const PaymentComponent = ({ domain }) => {
  return (
    <Link href={`/${domain}/pricing`} className="btn btn-primary">
      Get premium
    </Link>
  );
};
export default PaymentComponent;
