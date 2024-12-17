import { ContactTitle } from "./contactTitle";
import { ContactForm } from "./contactForm";
export const revalidate = 86400; // 1 day

export default async function ContactServer(props) {
  const params = await props.params;
  const { domain } = params;

  return (
    <>
      <ContactTitle domain={domain} />
      <ContactForm domain={domain} />
    </>
  );
}
