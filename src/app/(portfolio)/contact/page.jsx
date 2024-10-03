import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function Contacts() {
  return (
    <>
      <div className="w-fit md:w-[600px] bg-[#F2F2F2] p-12 rounded-xl border-2 border-[#0D0D0D]">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Contact Me</h3>
        <form className="space-y-4">
          <Input placeholder="Your Name" />
          <Input placeholder="Your Email" type="email" />
          <Textarea placeholder="Your Message" />
          <Button className="w-full bg-[#9BCAF2] hover:bg-[#94BDF2] text-[#0D0D0D]">
            Send Message
          </Button>
        </form>
      </div>
    </>
  );
}
