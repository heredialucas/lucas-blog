import Image from "next/image";
import { Button } from "@/components/ui/button";
import ProfilePicture from "@/public/lucas.jpeg";
import { Instagram, Linkedin } from "lucide-react";

export default function Home() {
  return (
    <>
      <div className="flex flex-col-reverse md:flex-row items-center md:items-start justify-between mb-12">
        <div className="md:w-2/3 mb-8 md:mb-0">
          <h1 className="text-4xl font-bold mb-2">{"Hi! I'm Lucas 🙋🏻‍♂️"}</h1>

          <p className="text-gray-600 mb-6 max-w-xl">
            I’m a web and mobile developer. My journey has included freelance
            projects as well as roles in both nationally and internationally
            companies, providing me with a versatile perspective on software
            development.
          </p>
          <p className="text-gray-600 mb-6 max-w-xl">
            I’ve collaborated with clients across various industries, honing my
            ability to adapt to diverse needs while working independently. My
            experience in complex teams has allowed me to tackle technical
            challenges and contribute to impactful projects.
          </p>
          <p className="text-gray-600 mb-6 max-w-xl">
            I’m eager to continue growing professionally and apply my expertise
            to exciting projects. I welcome new connections and collaborations,
            so feel free to reach out to discuss ideas and opportunities in the
            dynamic world of web and mobile development.
          </p>
          <p className="text-gray-600 mb-6 max-w-xl">
            Thank you for visiting my profile! I look forward to connecting with
            you soon!
          </p>
          <Button className="bg-[#9BCAF2] hover:bg-[#94BDF2] text-black rounded-xl hover:cursor-pointer">
            <a
              href="https://drive.google.com/file/d/1HZbcY0AVaq6cNOz6lIion3jTH7TYg9hL/view?usp=drive_link"
              target="_blank"
            >
              See Resume
            </a>
          </Button>
        </div>
        <div className="mb-6 md:w-1/3 flex justify-center">
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
          href="https://www.instagram.com/hlucasook/"
          target="_blank"
          className="text-gray-600 hover:text-[#8B7D6B]"
        >
          <Instagram size={24} />
        </a>
        <a
          href="https://www.linkedin.com/in/heredialucasfran/"
          target="_blank"
          className="text-gray-600 hover:text-[#8B7D6B]"
        >
          <Linkedin size={24} />
        </a>
      </div>
    </>
  );
}
