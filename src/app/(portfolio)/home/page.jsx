import Image from "next/image";
import { Button } from "@/components/ui/button";
import ProfilePicture from "@/public/eve.jpeg";
import { Instagram, Linkedin } from "lucide-react";

export default function Home() {
  return (
    <>
      <div className="flex flex-col md:flex-row items-center md:items-start justify-between mb-12">
        <div className="md:w-2/3 mb-8 md:mb-0">
          <h1 className="text-4xl font-bold mb-2">{"Hi! I'm Eve 🙋🏼‍♀️"}</h1>

          <p className="text-gray-600 mb-6 max-w-xl">
            As an innovative pharmacist, I bring diverse experience across
            various pharmaceutical fields. My research background includes a
            Co-Authorship on a Master thesis exploring in silico methods. I am
            passionate about digital tools to advance computational
            pharmaceutical research and leveraging digital health solutions.
          </p>
          <p className="text-gray-600 mb-6 max-w-xl">
            My experience also extends to pharmaceutical innovation and AI
            applications, having participated in numerous congresses related to
            pharmacy education and research across Europe and Latin America.
          </p>
          <p className="text-gray-600 mb-6 max-w-xl">
            I’m committed to advancing pharmacy by embracing emerging trends and
            opportunities.
          </p>
          <Button className="bg-[#9BCAF2] hover:bg-[#94BDF2] text-black rounded-xl hover:cursor-pointer">
            <a
              href="https://drive.google.com/file/d/1CcQhcVXGTN0PCFmOTvJhFTBKTg0aanXm/view?usp=sharing"
              target="_blank"
            >
              See Resume
            </a>
          </Button>
        </div>
        <div className="md:w-1/3 flex justify-center">
          <Image
            src={ProfilePicture}
            alt="Ana's profile picture"
            width={300}
            height={300}
            className="rounded-full object-cover"
          />
        </div>
      </div>

      <div className="flex justify-center gap-10 p-8 md:p-12 ">
        <a
          href="https://www.instagram.com/eve_thechief/"
          target="_blank"
          className="text-gray-600 hover:text-[#8B7D6B]"
        >
          <Instagram size={24} className="hover:size-8   transition-all" />
        </a>
        <a
          href="https://www.linkedin.com/in/evelyn-hafele-446406261/"
          target="_blank"
          className="text-gray-600 hover:text-[#8B7D6B]"
        >
          <Linkedin size={24} className="hover:size-8  transition-all" />
        </a>
      </div>
    </>
  );
}
