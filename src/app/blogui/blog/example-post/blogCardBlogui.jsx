"use client";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Edit2 } from "lucide-react";
import ProfilePicture from "@/public/profile.jpg";
import Link from "next/link";
import { formatText, extractDate } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function BlogCard({
  id,
  image,
  title,
  date,
  author,
  category,
  isAdmin,
}) {
  const router = useRouter();
  const handleDelete = async () => {
    toast.success("Post deleted successfully");
    toast.info("Revalidating blogs...");
  };
  const handleEdit = () => {
    toast.info("Redirecting to edit view...");
    router.push(`/blogui/create`);
  };

  return (
    <>
      <Card
        key={id}
        className="flex flex-col w-[300px] overflow-hidden rounded-xl"
      >
        <div className="relative h-[160px] overflow-hidden">
          <Image
            src={ProfilePicture}
            alt={title || ""}
            width={300}
            height={300}
            className="object-cover transition-transform duration-300 hover:scale-105 "
          />
        </div>
        <CardContent className="flex-1 pt-4">
          <div className="space-y-3">
            <span
              className={`inline-block px-1 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700`}
            >
              {formatText(category)}
            </span>
            <h2 className="font-bold leading-tight">{formatText(title)}</h2>
            {isAdmin && (
              <p className="text-xs font-sm break-all pr-6">
                Author: {formatText(author)}
                <br />
                Date: {extractDate(date)}
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter className="border-t pt-3">
          <div className="flex items-center  w-full">
            <div className="flex flex-1 items-center space-x-2">
              <Image
                src={ProfilePicture}
                alt={author}
                width={48}
                height={48}
                className="w-12 h-12 rounded-full object-cover"
              />
            </div>
            <div className="flex gap-2">
              <Link
                href={`/blogui/blog/example-post`}
                disabled={true}
                className={`flex flex-2 text-xs border-2  p-2 rounded font-medium hover:bg-blue-200 `}
              >
                Read More
              </Link>
              {isAdmin && (
                <>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="rounded border-2 border-gray-500 hover:bg-red-500 hover:text-white "
                    onClick={() => handleDelete()}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="info"
                    size="sm"
                    className="rounded border-2 border-gray-500 hover:bg-blue-400 hover:text-white "
                    onClick={() => handleEdit()}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                </>
              )}
            </div>
          </div>
        </CardFooter>
      </Card>
    </>
  );
}
