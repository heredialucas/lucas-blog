import Image from "next/image";
import { Card, CardContent, CardFooter } from "../ui/card";
import ProfilePicture from "@/public/eve.jpeg";
import Link from "next/link";

export default function BlogCard({
  id,
  image,
  title,
  summary,
  author,
  category,
}) {
  return (
    <>
      <Card
        key={id}
        className="flex flex-col w-[300px] overflow-hidden rounded-xl"
      >
        <div className="relative h-[160px] overflow-hidden">
          <Image
            src={image}
            alt={title}
            width={300}
            height={300}
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
        <CardContent className="flex-1 pt-4">
          <div className="space-y-3">
            <span
              className={`inline-block px-1 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-700`}
            >
              {category}
            </span>
            <h2 className="font-bold leading-tight">{title}</h2>
            <p className="text-gray-600 text-sm line-clamp-2">{summary}</p>
          </div>
        </CardContent>
        <CardFooter className="border-t pt-3">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center space-x-2">
              <Image
                src={ProfilePicture}
                alt={author.name}
                width={50}
                height={50}
                className="rounded-full"
              />
              <div>
                <p className="text-xs font-medium">{author.name}</p>
                <p className="text-xs text-gray-500">{author.timeAgo}</p>
              </div>
            </div>
            <Link href={`/blog/${id}`}>Read More</Link>
          </div>
        </CardFooter>
      </Card>
    </>
  );
}
