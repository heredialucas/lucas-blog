"use client";

import Image from "next/image";
import ProfileDefault from "@/public/profile.jpg";
import Link from "next/link";
import LinkCustom from "@/components/custom/inputCustom";
import PaymentComponent from "@/components/stripe/payment";
import { Instagram, Linkedin } from "lucide-react";

export function HomeClientBlogui() {
  return (
    <div className="flex flex-col-reverse md:flex-row justify-between items-center">
      <div className="flex flex-col justify-between md:w-2/3 mb-8 md:mb-0">
        <h1 className="text-primary hover:text-secondary text-2xl md:text-4xl font-bold mb-2">
          {`Hi! I'm Blogui 👋🏼`}
        </h1>
        <div className="flex flex-col text-base justify-start h-full m-4">
          <div className="hero-text max-w-xl">
            <p className=" mb-6">
              {`Ready to take your professional presence online? Welcome to `}

              <strong>{`Blogui`}</strong>
              {`, your space to shine and share your
              journey.`}
            </p>

            <p className=" mb-6">
              {`We've made it simple to showcase your professional story:`}
            </p>

            <p className=" mb-6">
              📝{" "}
              {`Craft a clean, modern CV that captures attention instantly. No
              clutter, just your best professional self.`}
            </p>

            <p className=" mb-6">
              {` ⭐ Tell your career story through an interactive timeline -
              highlighting your growth, achievements, and key moments.`}
            </p>

            <p className=" mb-6">
              {` ✍️ Express your insights through a personal blog, building your
              authority and connecting with your audience.`}
            </p>

            <p className=" mb-6">
              {`Freelancer, job seeker, or established professional - we've
              designed `}
              <strong>{`Blogui`}</strong>{" "}
              {`to help you stand out in the
              digital world.`}
            </p>

            <p className=" mb-6">
              {`Your professional story deserves to be told. Let's make it happen!
              ✨`}
            </p>

            <p className=" mb-6">{`Ready to get started?`} </p>
          </div>
        </div>
        <div className="flex flex-col w-full md:flex-row gap-4">
          <LinkCustom />
        </div>
        <div className="flex items-center gap-4">
          <Link
            className="btn btn-primary w-fit my-4 px-4 py-2 hover:cursor-pointer"
            href="/hlucas"
            target="_blank"
          >
            See Demo
          </Link>
          <PaymentComponent domain="blogui" />
        </div>
      </div>
      <div className="flex flex-col h-full md:w-1/3 justify-center  items-center">
        <Image
          src={ProfileDefault}
          alt={`Profile of Blogui`}
          width={300}
          height={300}
          className="self-center h-fit rounded-full object-cover"
        />
        <div className="flex h-fit w-fit justify-center gap-10 p-8 md:p-12">
          <a
            href={`https://www.instagram.com/hlucasook/`}
            target="_blank"
            className=" hover:text-primary"
          >
            <Instagram size={24} />
          </a>
          <a
            href={`https://www.linkedin.com/in/heredialucasfran/`}
            target="_blank"
            className=" hover:text-primary"
          >
            <Linkedin size={24} />
          </a>
        </div>
      </div>
    </div>
  );
}
