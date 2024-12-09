"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { updatePost } from "@/app/server/actions/updatePost";
import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { useStore } from "@/zustand/config";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "react-toastify";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

export default function EditClient({ id, post, isAdmin }) {
  const ref = useRef();
  const route = useRouter();
  const pathname = usePathname().split("/")[1];
  const { isLoading, setIsLoading } = useStore((state) => state);
  const { title, summary, category, referencePostUrl, authorName } = post;

  const [editorContent, setEditorContent] = useState(summary);
  const [formData, setFormData] = useState({
    title,
    category,
    authorName,
    referencePostUrl,
  });

  if (isAdmin === false) {
    route.push("/auth/login");
  }

  const handleChange = async (formData) => {
    setIsLoading(true);

    const { post, message } = await updatePost(
      formData,
      editorContent,
      id,
      pathname
    );
    setIsLoading(false);

    if (!post) {
      toast.error(`${message}`);
      return;
    }

    toast.success(`${message}`);
    ref.current.reset();
    setEditorContent("");
    route.push(`/${pathname}/blog/${id}`);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <form
      ref={ref}
      action={handleChange}
      className="p-6 border-2 border-gray-200 rounded-xl"
    >
      <div className="flex flex-col gap-4">
        <div>
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              maxLength={100}
              required
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              disabled={isLoading}
            />
          </div>
          <div>
            <Label htmlFor="category">Category</Label>
            <Input
              maxLength={100}
              required
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              disabled={isLoading}
            />
          </div>
          <div>
            <Label htmlFor="authorName">Author Name</Label>
            <Input
              maxLength={100}
              required
              name="authorName"
              value={formData.authorName}
              onChange={handleInputChange}
              disabled={isLoading}
            />
          </div>
          <div>
            <Label htmlFor="image">Image URL</Label>
            <Input
              required
              type="file"
              name="image"
              accept="image/*"
              disabled
            />
          </div>
          <div>
            <Label htmlFor="referencePostUrl">Reference Post URL</Label>
            <Input
              name="referencePostUrl"
              value={formData.referencePostUrl}
              onChange={handleInputChange}
              placeholder="https://example.com/reference"
              disabled={isLoading}
            />
          </div>
        </div>
        <div className="w-full h-full">
          <ReactQuill
            value={editorContent}
            onChange={setEditorContent}
            name="summary"
            theme="snow"
            modules={{
              toolbar: [
                [{ header: [1, 2, 3, 4, 5, 6, false] }],
                [{ size: ["small", false, "large", "huge"] }],
                [{ font: [] }],
                ["bold", "italic", "underline", "strike"],
                ["blockquote", "code-block"],
                [{ list: "ordered" }, { list: "bullet" }],
                [{ script: "sub" }, { script: "super" }],
                [{ indent: "-1" }, { indent: "+1" }],
                [{ direction: "rtl" }],
                [{ color: [] }, { background: [] }],
                [{ align: [] }],
                ["image", "video"],
                ["clean"],
              ],
            }}
          />
        </div>
      </div>
      <div className="flex justify-end w-full mt-4">
        <Button disabled={isLoading} type="submit">
          Edit Post
        </Button>
      </div>
    </form>
  );
}
