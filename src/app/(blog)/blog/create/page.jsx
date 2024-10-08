"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { postData, postImage } from "@/app/api/util/actions";
import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

export default function PostForm() {
  const [editorContent, setEditorContent] = useState("");
  const ref = useRef();

  const handleChange = async (formData) => {
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
      postData(formData, editorContent, image.url);
      ref.current.reset();
      setEditorContent("");
    }
  };

  return (
    <form
      ref={ref}
      action={handleChange}
      className="h-lvh p-6 border-2 border-gray-200 rounded-xl"
    >
      <div className="flex flex-col  gap-4">
        <div>
          <div>
            <Label htmlFor="title">Title</Label>
            <Input maxLength={100} required name="title" />
          </div>
          <div>
            <Label htmlFor="category">Category</Label>
            <Input maxLength={100} required name="category" />
          </div>
          <div>
            <Label htmlFor="authorName">Author Name</Label>
            <Input maxLength={100} required name="authorName" />
          </div>
          <div>
            <Label htmlFor="image">Image URL</Label>
            <Input required type="file" name="image" />
          </div>
          <div>
            <Label htmlFor="referencePostUrl">Reference Post URL</Label>
            <Input
              name="referencePostUrl"
              placeholder="https://example.com/reference"
            />
          </div>
        </div>
        <div className="w-full h-full">
          <ReactQuill
            value={editorContent}
            onChange={setEditorContent}
            name="summary"
            theme="snow"
          />
        </div>
      </div>
      <div className="flex justify-end w-full mt-4">
        <Button type="submit">Create Post</Button>
      </div>
    </form>
  );
}
