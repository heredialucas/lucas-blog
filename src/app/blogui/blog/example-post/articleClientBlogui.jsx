"use client";

import Image from "next/image";
import ProfilePicture from "@/public/profile.jpg";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Edit2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function ArticleClientBlogui({ isAdmin }) {
  const route = useRouter();
  const handleDelete = async () => {
    toast.success("Post deleted successfully");
    toast.info("Redirecting to blogs...");
    route.push(`/blogui/blog`);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          <div className="space-y-4">
            <span className="text-orange-500 font-medium break-words">
              {`Category`}
            </span>
            <h1 className="text-4xl font-bold text-gray-900 mb-4 break-words">
              {`Example of Article`}
            </h1>
            <div className="flex items-center gap-4">
              <Image
                src={ProfilePicture}
                alt={"Author: Firstname Lastname"}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-medium text-gray-900 break-all">
                  {`Author: Blogui`}
                </p>
                <p className="text-sm text-gray-500">{`12-12-2022`}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <Image
              src={ProfilePicture}
              alt={"Author: Firstname Lastname"}
              priority={true}
              width={1200}
              height={600}
              className="w-full h-[500px] object-cover rounded-lg"
            />
          </div>

          <article className="prose max-w-none pb-20">
            <div className="text-gray-800 text-lg leading-relaxed break-words">
              <div className="content">
                <br />
                <h2>{`Create Your Story on Blogui`}</h2>
                <br />

                <p>
                  {`Ready to make your next post amazing? With Blogui, sharing
                  your journey is as easy as it gets! Our editor lets you
                  express yourself in multiple ways:`}
                </p>
                <br />

                <div className="features">
                  <br />
                  <div className="feature">
                    <h3>{`📸 Show Your World`}</h3>
                    <p>
                      {`Upload beautiful images to make your posts pop and grab
                      attention. Your achievements deserve to be seen!`}
                    </p>
                  </div>
                  <br />

                  <div className="feature">
                    <h3>{`🎥 Share More`}</h3>
                    <p>
                      {` Embed YouTube videos to bring your stories to life.
                      Whether it's your latest project demo or an inspiring talk
                      - make it part of your narrative.`}
                    </p>
                  </div>

                  <br />
                  <div className="feature">
                    <h3>{`💻 Tech-Friendly`}</h3>
                    <p>
                      {`Are you a developer? Share your code snippets with syntax
                      highlighting. Show off your technical expertise in style!`}
                    </p>
                  </div>

                  <br />
                  <div className="feature">
                    <h3>{`✨ Keep it Professional`}</h3>
                    <p>
                      {`Clean, minimalist design ensures your content always looks
                      polished and professional - perfect for building your
                      personal brand.`}
                    </p>
                  </div>
                </div>
                <br />

                <p>
                  {` Whether you're showcasing your portfolio, sharing professional
                  updates, or documenting your journey, Blogui makes it super
                  easy to create posts that reflect your style.`}
                </p>

                <br />
                <p>
                  {`Your story matters, and we're here to help you tell it
                  beautifully!`}
                </p>

                <br />
                <div className="cta">
                  <p>{`Ready to create your next awesome post?`}</p>
                  <br />
                  <Link className="btn btn-primary" href="/auth/register">
                    Blogui me
                  </Link>
                  <br />
                </div>
              </div>
            </div>
          </article>
        </div>

        <footer className="border-t py-8 mt-12">
          <div className="flex justify-between items-center">
            <Link
              href="/blogui/blog"
              variant="ghost"
              className="text-gray-600 hover:text-gray-900"
            >
              ← Back to Blog
            </Link>
            {isAdmin && (
              <div className="flex gap-2">
                <Button
                  size="sm"
                  className="btn btn-warning bg-error rounded border-2 border-gray-500 hover:bg-red-600 hover:text-white "
                  onClick={() => handleDelete()}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                <Link
                  variant="info"
                  size="sm"
                  className="btn rounded border-2 border-gray-500 hover:bg-blue-400 hover:text-white "
                  href={`/blogui/create`}
                >
                  <Edit2 className="h-4 w-4" />
                </Link>
              </div>
            )}
          </div>
        </footer>
      </div>
    </div>
  );
}
