import { Suspense } from "react";
import { ContactTitle } from "./contactTitle";
import { ContactForm } from "./contactForm";
import { Loading } from "@/components/custom/loading";

export default async function ContactServer({ params }) {
  const { domain } = params;

  return (
    <>
      <ContactTitle domain={domain} />
      <Suspense fallback={<Loading height="fit" />}>
        <ContactForm domain={domain} />
      </Suspense>
    </>
  );
}
