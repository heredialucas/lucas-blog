"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function ContactsBlogui() {
  const router = useRouter();

  const handleSubmit = async () => {
    toast.success("Message sent successfully");
    router.push("/blogui");
  };

  return (
    <>
      <div className="w-fit md:w-[600px] bg-[#F2F2F2] p-12 rounded-xl border-2 border-primary">
        <h3 className="text-xl font-semibold text-neutral mb-4">Contact Me</h3>
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
      </div>
    </>
  );
}
