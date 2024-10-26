"use client";

import Image from "next/image";
import { Instagram, Linkedin, Facebook } from "lucide-react";
import { formatHeroText } from "@/lib/utils";
import ProfileDefault from "@/public/profile.jpg";
import Link from "next/link";

export function HomeClientBlogui() {
  return (
    <>
      <div className="flex flex-col-reverse h-[600px] md:flex-row items-center md:items-start justify-between">
        <div className="flex flex-col justify-between h-full md:w-2/3 mb-8 md:mb-0">
          <h1 className="text-primary hover:text-secondary text-4xl font-bold mb-2">
            {`Hi! I'm Blogui 👋🏼`}
          </h1>
          <div className="flex flex-col justify-start h-full m-4">
            {formatHeroText(
              "Welcome to Blogui. Your personal space to shine online! Whether you're looking to create a minimalist CV or share your latest thoughts and achievements, Blogui. It makes it super easy. With just a few clicks, you can build a professional-looking profile to showcase your skills and experience. Plus, we offer flexible options – whether you prefer a simple one-time payment or a subscription plan – to unlock even more features, like creating your own posts. Share your projects, updates, and ideas with your audience anytime, anywhere!. Whether you're a freelancer, job seeker, or just someone who wants a cool place to show off your professional journey, Blogui is here to help you get noticed. Ready to make your mark? Join us at Blogui and start telling your story today!"
            ).map((sentence, index) => (
              <p key={index} className="text-neutral mb-3 max-w-xl">
                {sentence}
              </p>
            ))}
          </div>
          <div className="flex gap-4">
            <Link
              className="btn btn-primary text-primary-content w-fit hover:bg-secondary hover:cursor-pointer"
              href="/auth/register"
            >
              Blogui me
            </Link>
            <Link
              className="btn btn-primary text-primary-content w-fit hover:bg-secondary hover:cursor-pointer"
              href="/hlucas"
              target="_blank"
            >
              Demo
            </Link>
          </div>
        </div>
        <div className="flex mb-6 h-full md:w-1/3 justify-center">
          <Image
            src={ProfileDefault}
            alt={`Profile of Blogui`}
            width={300}
            height={300}
            className="self-center h-fit rounded-full object-cover"
          />
        </div>
      </div>

      <div className="flex justify-center gap-10 p-8 md:p-12 ">
        <Link
          href="/blogui"
          target="_blank"
          className="text-neutral hover:text-primary"
        >
          <Instagram size={24} />
        </Link>

        <Link
          href="/blogui"
          target="_blank"
          className="text-neutral hover:text-primary"
        >
          <Linkedin size={24} />
        </Link>

        <Link
          href="/blogui"
          target="_blank"
          className="text-neutral hover:text-primary"
        >
          <Facebook size={24} />
        </Link>
      </div>
    </>
  );
}
