import { ContactTitle } from "./contactTitle";
import { ContactForm } from "./contactForm";

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
