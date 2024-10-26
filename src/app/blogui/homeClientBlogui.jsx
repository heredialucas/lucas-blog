"use client";

import Image from "next/image";
import ProfileDefault from "@/public/profile.jpg";
import Link from "next/link";

export function HomeClientBlogui() {
  return (
    <div className="flex flex-col-reverse h-[600px] md:flex-row items-center md:items-start justify-between">
      <div className="flex flex-col justify-between h-full md:w-2/3 mb-8 md:mb-0">
        <h1 className="text-primary hover:text-secondary text-4xl font-bold mb-2">
          {`Hi! I'm Blogui 👋🏼`}
        </h1>
        <div className="flex flex-col justify-start h-full m-4">
          <div className="hero-text max-w-xl">
            <p className="text-neutral mb-6">
              Ready to take your professional presence online? Welcome to{" "}
              <strong>Blogui</strong>, your space to shine and share your
              journey.
            </p>

            <p className="text-neutral mb-6">
              We've made it simple to showcase your professional story:
            </p>

            <p className="text-neutral mb-6">
              📝 Craft a clean, modern CV that captures attention instantly. No
              clutter, just your best professional self.
            </p>

            <p className="text-neutral mb-6">
              ⭐ Tell your career story through an interactive timeline -
              highlighting your growth, achievements, and key moments.
            </p>

            <p className="text-neutral mb-6">
              ✍️ Express your insights through a personal blog, building your
              authority and connecting with your audience.
            </p>

            <p className="text-neutral mb-6">
              Freelancer, job seeker, or established professional - we've
              designed <strong>Blogui</strong> to help you stand out in the
              digital world.
            </p>

            <p className="text-neutral mb-6">
              Your professional story deserves to be told. Let's make it happen!
              ✨
            </p>

            <p className="text-neutral mb-6">Ready to get started? </p>
          </div>
        </div>
        <div className="flex gap-4">
          <Link
            className="btn btn-primary text-primary-content w-fit hover:bg-secondary hover:cursor-pointer"
            href="/auth/register"
          >
            Blogui me
          </Link>
          <Link
            className="btn btn-primary text-primary-content py-2 px-4 hover:bg-secondary hover:cursor-pointer"
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
  );
}
