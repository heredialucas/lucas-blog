import { ButtonDeleteCard } from "../components/buttonCard";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Edit2 } from "lucide-react";
import { formatText, extractDate } from "@/lib/utils";
import { getClientInfoByDomain } from "@/app/server/actions/actions";
import { headers } from "next/headers";
import Image from "next/image";
import Link from "next/link";
import ProfilePicture from "@/public/profile.jpg";

export async function BlogCard({
  author,
  category,
  date,
  domain,
  id,
  image,
  isAdmin,
  title,
}) {
  const { client } = await getClientInfoByDomain(domain);
  const pathname = headers().get("referer")?.split("/")[3];

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
                className={`flex flex-2 justify-center items-center text-xs border-2  p-2 rounded font-medium`}
              >
                Read More
              </Link>
              {isAdmin && (
                <>
                  <ButtonDeleteCard id={id} />
                  <Link
                    className="flex justify-center items-center rounded border-2 p-2 "
                    href={`/${pathname}/edit/${id}`}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Link>
                </>
              )}
            </div>
          </div>
        </CardFooter>
      </Card>
    </>
  );
}
