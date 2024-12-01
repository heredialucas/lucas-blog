import Image from "next/image";
import ProfilePicture from "@/public/lucas.jpeg";
import { formatDate } from "@/app/[domain]/utils";
import { deleteDataById } from "@/app/api/util/actions";
import parse from "html-react-parser";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Edit2 } from "lucide-react";
import { getDataById } from "@/app/api/util/actions";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function Article({ id, isAdmin }) {
  const pathname = headers().get("referer").split("/")[3];

  const { post } = await getDataById("post", id);

  const handleDelete = async () => {
    const { post, message } = await deleteDataById("post", id, pathname);

    if (!post) {
      toast.error(message);
      return;
    }

    toast.success(message);
    redirect(`/${pathname}/blog`);
  };

  if (!post) return "Post Not Found";

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          <div className="space-y-4">
            <span className="text-sm md:text-lg text-orange-500 font-medium break-words">
              {post.category}
            </span>
            <h1 className="text-xl md:text-4xl font-bold text-gray-900 mb-4 break-words">
              {post.title}
            </h1>
            <div className="flex items-center gap-4">
              <Image
                src={ProfilePicture}
                alt={post.authorName}
                className="w-6 h-6 md:w-12 md:h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-medium text-gray-900 break-all">
                  {post.authorName}
                </p>
                <p className="text-xs md:text-sm text-gray-500">
                  {formatDate(post.date)}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8 md:mb-12">
            <Image
              src={post.imageUrl}
              alt={post.title}
              priority={true}
              width={1200}
              height={600}
              className="w-full h-[300px] md:h-[500px] object-cover rounded-lg"
            />
          </div>

          <article className="prose max-w-none pb-20">
            <div className="text-sm md:text-lg leading-relaxed break-words">
              {parse(post.summary)}
            </div>
          </article>
        </div>

        <footer className="border-t py-8 mt-12">
          <div className="flex justify-between items-center">
            <Link
              href={`/${pathname}/blog`}
              variant="ghost"
              className="text-gray-600 "
            >
              ← Back to Blog
            </Link>
            {isAdmin && (
              <div className="flex gap-2">
                <Button
                  size="sm"
                  className="btn btn-warning bg-error rounded border-2    "
                  onClick={() => handleDelete()}
                  disabled={isLoading}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
                <Link
                  variant="info"
                  size="sm"
                  className="btn rounded border-2"
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
