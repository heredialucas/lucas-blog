import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { sendEmail } from "@/app/api/util/actions";
import { redirect } from "next/navigation";
import { getClientInfoByDomain } from "@/app/api/util/actions";
import { headers } from "next/headers";

export async function ContactForm({ domain }) {
  const { client } = await getClientInfoByDomain(domain);
  const { email } = client;

  const pathname = headers().get("referer")?.split("/")[3];
  const handleSubmit = async (formData) => {
    "use server";

    const { data, message } = await sendEmail(formData, email);

    redirect(`/${pathname}`);
  };
  return (
    <form action={handleSubmit} className="space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="name">Name</Label>
        <Input placeholder="Your Name" name="name" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input placeholder="Your Email" type="email" name="email" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="message">Message</Label>
        <Textarea placeholder="Your Message" name="message" />
      </div>
      <Button
        type="submit"
        className="w-full btn btn-primary hover:bg-secondary text-[#0D0D0D]"
      >
        Send Message
      </Button>
    </form>
  );
}
