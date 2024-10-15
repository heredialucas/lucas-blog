"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { sendEmail } from "@/app/api/util/actions";
import { useRef } from "react";

export default function Contacts() {
  const ref = useRef();

  const handleSubmit = (formData) => {
    ref.current.reset();
    sendEmail(formData);
  };

  return (
    <>
      <div className="w-fit md:w-[600px] bg-[#F2F2F2] p-12 rounded-xl border-2 border-primary">
        <h3 className="text-xl font-semibold text-neutral mb-4">Contact Me</h3>
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
