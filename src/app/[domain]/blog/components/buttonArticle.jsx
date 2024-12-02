"use client";

import { Button } from "@/components/ui/button";
import { deleteDataById } from "@/app/api/util/actions";
import { Trash2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "react-toastify";

export function ButtonDeleteArticle({ id }) {
  const route = useRouter();
  const pathname = usePathname()?.split("/")[1];

  const handleDelete = async () => {
    const { post, message } = await deleteDataById("post", id, pathname);

    if (!post) {
      toast.error(message);
      return;
    }

    toast.success(message);
    route.push(`/${pathname}/blog`);
  };

  return (
    <Button
      size="sm"
      className="btn btn-warning bg-error rounded border-2"
      onClick={() => handleDelete()}
    >
      <Trash2 className="h-4 w-4" />
    </Button>
  );
}
