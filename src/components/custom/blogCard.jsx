import Image from "next/image";
import { Card, CardContent, CardFooter } from "../ui/card";
import ProfilePicture from "@/public/lucas.jpeg";
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
              {category}
            </span>
            <h2 className="font-bold leading-tight">{title}</h2>
            <div className="text-gray-600 text-sm line-clamp-2">{summary}</div>
          </div>
        </CardContent>
        <CardFooter className="border-t pt-3">
          <div className="flex items-center  w-full">
            <div className="flex flex-1 items-center space-x-2">
              <Image
                src={ProfilePicture}
                alt={author}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="text-xs font-medium">{author}</p>
                <p className="text-xs text-gray-500">{author.timeAgo}</p>
              </div>
            </div>
            <Link
              href={`/blog/${id}`}
              className="flex flex-2 text-xs bg-[#9BCAF2] p-2 rounded-xl font-medium hover:bg-[#94BDF2]"
            >
              Read More
            </Link>
          </div>
        </CardFooter>
      </Card>
    </>
  );
}
