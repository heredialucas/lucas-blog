import { Suspense } from "react";
import { ContactTitle } from "./contactTitle";
import { ContactForm } from "./contactForm";
import { Loading } from "@/components/custom/loading";

export default async function ContactServer({ params }) {
  const { domain } = params;

  return (
    <div className="w-full md:w-[600px] p-4 md:p-12 rounded-xl border-2 border-primary">
      <ContactTitle domain={domain} />
      <Suspense fallback={<Loading />}>
        <ContactForm domain={domain} />
      </Suspense>
    </div>
  );
}
