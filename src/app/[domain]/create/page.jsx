"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { postData, postImage } from "@/app/server/actions/actions";
import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { useStore } from "@/zustand/config";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { toast } from "react-toastify";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

export default function Create() {
  const { isLoading, setIsLoading } = useStore((state) => state);
  const pathname = usePathname().split("/")[1];
  const router = useRouter();
  const [editorContent, setEditorContent] = useState("");

  useEffect(() => {
    if (editorContent) {
      localStorage.setItem("editorContent", editorContent);
    }
  }, [editorContent]);

  useEffect(() => {
    const savedContent = localStorage.getItem("editorContent");
    if (savedContent) {
      setEditorContent(savedContent);
    }
  }, []);

  const ref = useRef();

  const handleChange = async (formData) => {
    setIsLoading(true);
    const file = formData.get("image");

    if (file) {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = new Uint8Array(arrayBuffer);
      const serializedFile = Array.from(buffer);

      const fileData = {
        name: file.name,
        type: file.type,
        data: serializedFile,
      };
      const image = await postImage(fileData);
      const { newPost, message } = await postData(
        formData,
        editorContent,
        image.url,
        pathname
      );

      if (!newPost) {
        toast.error(`${message}`);
        setIsLoading(false);
        return;
      }

      ref.current.reset();
      setEditorContent("");
      setIsLoading(false);
      toast.success(`${message}`);
      localStorage.clear();
      router.push(`/${pathname}/blog`);
    }
  };

  return (
    <form
      ref={ref}
      action={handleChange}
      className="p-2 md:p-6 border-2 border-gray-200 rounded-xl"
    >
      <div className="flex flex-col  gap-4">
        <div>
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              className=""
              maxLength={100}
              required
              name="title"
              disabled={isLoading}
            />
          </div>
          <div>
            <Label htmlFor="category">Category</Label>
            <Input
              className=""
              maxLength={100}
              required
              name="category"
              disabled={isLoading}
            />
          </div>
          <div>
            <Label htmlFor="authorName">Author Name</Label>
            <Input
              className=""
              maxLength={100}
              required
              name="authorName"
              disabled={isLoading}
            />
          </div>
          <div>
            <Label htmlFor="image">Image URL</Label>
            <Input
              className=""
              required
              type="file"
              name="image"
              accept="image/*"
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
                ["video", "image"],
                ["clean"],
              ],
            }}
          />
        </div>
      </div>
      <div className="flex justify-end w-full mt-4">
        <Button disabled={isLoading} type="submit">
          Create Post
        </Button>
      </div>
    </form>
  );
}
