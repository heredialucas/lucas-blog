"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { sendEmail } from "@/app/api/util/actions";
import { useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useStore } from "@/zustand/config";

export default function ContactsClient({ client }) {
  const { email } = client;
  const ref = useRef();
  const router = useRouter();
  const pathname = usePathname().split("/")[1];
  const { setIsLoading } = useStore((state) => state);

  const handleSubmit = async (formData) => {
    ref.current.reset();
    setIsLoading(true);

    const { data, message } = await sendEmail(formData, email);

    if (!data) {
      toast.error(`${message}`);
      return;
    }

    setIsLoading(false);
    toast.success(`${message}`);
    router.push(`/${pathname}`);
  };

  return (
    <>
      <div className="w-fit md:w-[600px] p-12 rounded-xl border-2 border-primary">
        <h3 className="text-xl font-semibold  mb-4">Contact Me</h3>
        <form ref={ref} action={handleSubmit} className="space-y-4">
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
      </div>
    </>
  );
}
