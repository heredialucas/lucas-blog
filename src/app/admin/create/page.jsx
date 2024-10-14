"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { postData, postImage } from "@/app/api/util/actions";
import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { useStore } from "@/zustand/config";
import { redirect } from "next/navigation";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

export default function Create() {
  const { isLoading, setIsLoading, isAdmin } = useStore((state) => state);
  if (isAdmin === false) {
    redirect("/admin/login");
  }
  const [editorContent, setEditorContent] = useState("");
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
      await postData(formData, editorContent, image.url);
      ref.current.reset();
      setEditorContent("");
      setIsLoading(false);
      redirect("/blog");
    }
  };

  return (
    <form
      ref={ref}
      action={handleChange}
      className=" p-6 border-2 border-gray-200 rounded-xl"
    >
      <div className="flex flex-col  gap-4">
        <div>
          <div>
            <Label htmlFor="title">Title</Label>
            <Input maxLength={100} required name="title" disabled={isLoading} />
          </div>
          <div>
            <Label htmlFor="category">Category</Label>
            <Input
              maxLength={100}
              required
              name="category"
              disabled={isLoading}
            />
          </div>
          <div>
            <Label htmlFor="authorName">Author Name</Label>
            <Input
              maxLength={100}
              required
              name="authorName"
              disabled={isLoading}
            />
          </div>
          <div>
            <Label htmlFor="image">Image URL</Label>
            <Input required type="file" name="image" disabled={isLoading} />
          </div>
          <div>
            <Label htmlFor="referencePostUrl">Reference Post URL</Label>
            <Input
              name="referencePostUrl"
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
          Create Post
        </Button>
      </div>
    </form>
  );
}
