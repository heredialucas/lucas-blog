"use client";

import Image from "next/image";
import ProfilePicture from "@/public/lucas.jpeg";
import { formatDate } from "@/app/[domain]/utils";
import { deleteDataById } from "@/app/api/util/actions";
import parse from "html-react-parser";
import Link from "next/link";
import { Button } from "../ui/button";
import { Trash2 } from "lucide-react";
import { useStore } from "@/zustand/config";
import { Edit2 } from "lucide-react";
import { usePathname } from "next/navigation";

export default function ArticleClient({ post, id, isAdmin }) {
  const { isLoading, setIsLoading } = useStore((state) => state);
  const pathname = usePathname().split("/")[1];
  const handleDelete = async () => {
    setIsLoading(true);
    await deleteDataById("post", id, pathname);
    setIsLoading(false);
  };

  if (!post) return "Post Not Found";

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          <div className="space-y-4">
            <span className="text-orange-500 font-medium break-words">
              {post.category}
            </span>
            <h1 className="text-4xl font-bold text-gray-900 mb-4 break-words">
              {post.title}
            </h1>
            <div className="flex items-center gap-4">
              <Image
                src={ProfilePicture}
                alt={post.authorName}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-medium text-gray-900 break-all">
                  {post.authorName}
                </p>
                <p className="text-sm text-gray-500">{formatDate(post.date)}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <Image
              src={post.imageUrl}
              alt={post.title}
              priority={true}
              width={1200}
              height={600}
              className="w-full h-[500px] object-cover rounded-lg"
            />
          </div>

          <article className="prose max-w-none pb-20">
            <div className="text-gray-800 text-lg leading-relaxed break-words">
              {parse(post.summary)}
            </div>
          </article>
        </div>

        <footer className="border-t py-8 mt-12">
          <div className="flex justify-between items-center">
            <Link
              href="/blog"
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
                  disabled={isLoading}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                <Link
                  variant="info"
                  size="sm"
                  className="btn rounded border-2 border-gray-500 hover:bg-blue-400 hover:text-white "
                  disabled={isLoading}
                  href={`/${pathname}/edit/${id}`}
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
