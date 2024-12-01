"use client";

import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Edit2 } from "lucide-react";
import ProfilePicture from "@/public/profile.jpg";
import Link from "next/link";
import { formatText, extractDate } from "@/lib/utils";
import { deleteDataById } from "@/app/api/util/actions";
import { useStore } from "@/zustand/config";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "react-toastify";

export function BlogCard({
  id,
  image,
  title,
  date,
  author,
  category,
  isAdmin,
}) {
  const route = useRouter();
  const pathname = usePathname().split("/")[1];
  const { client, isLoading, setIsLoading } = useStore((state) => state);
  const handleDelete = async () => {
    setIsLoading(true);
    const { post, message } = await deleteDataById("post", id, pathname);

    setIsLoading(false);
    if (!post) {
      toast.error(message);
      return;
    }

    toast.success(message);
    route.push(`/${pathname}/blog`);
  };
  const handleEdit = () => {
    route.push(`/${pathname}/edit/${id}`);
  };

  return (
    <>
      <Card
        key={id}
        className="flex flex-col w-[300px] overflow-hidden rounded-xl"
      >
        <div className="relative h-[160px] overflow-hidden">
          <Image
            src={image || ""}
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
                src={client?.imageUrl || ProfilePicture}
                alt={author}
                width={48}
                height={48}
                className="w-12 h-12 rounded-full object-cover"
              />
              {!isAdmin && (
                <p className="text-xs font-sm break-all pr-6">
                  {formatText(author)}
                  <br />
                  {extractDate(date)}
                </p>
              )}
            </div>
            <div className="flex gap-2">
              <Link
                href={`/${pathname}/blog/${id}`}
                disabled={true}
                className={`flex flex-2 text-xs border-2  p-2 rounded font-medium   ${
                  isLoading
                    ? "pointer-events-none border-gray-400 text-gray-400"
                    : ""
                }`}
                aria-disabled={isLoading}
                tabIndex={isLoading ? -1 : undefined}
              >
                Read More
              </Link>
              {isAdmin && (
                <>
                  <Button
                    variant="destructive"
                    size="sm"
                    className="rounded border-2  hover:bg-red-500  "
                    onClick={() => handleDelete()}
                    disabled={isLoading}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="info"
                    size="sm"
                    className="rounded border-2    "
                    onClick={() => handleEdit()}
                    disabled={isLoading}
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
