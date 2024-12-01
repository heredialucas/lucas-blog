import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { sendEmail } from "@/app/api/util/actions";
import { useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useStore } from "@/zustand/config";

export default function ContactsClient({ client }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
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
      <div className="w-full md:w-[600px] p-4 md:p-12 rounded-xl border-2 border-primary">
        <h3 className="text-lg md:text-xl font-semibold  mb-4">Contact Me</h3>
        <form ref={ref} action={handleSubmit} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              placeholder="Your Name"
              name="name"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              placeholder="Your Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, email: e.target.value }))
              }
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              placeholder="Your Message"
              name="message"
              value={formData.message}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, message: e.target.value }))
              }
            />
          </div>
          <Button
            type="submit"
            className="w-full btn btn-primary hover:bg-secondary text-[#0D0D0D]"
            disabled={
              !formData.name.length ||
              !formData.email.length ||
              !formData.message.length
            }
          >
            Send Message
          </Button>
        </form>
      </div>
    </>
  );
}
