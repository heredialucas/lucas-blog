"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

import { toast } from "react-toastify";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

export default function CreateBlogui() {
  const handleChange = () => {
    toast.success("Post created successfully");
    toast.info("Revalidating blogs...");
    toast.info("Redirecting to blogs...");
  };

  return (
    <form
      action={handleChange}
      className=" p-6 border-2 border-gray-200 rounded-xl"
    >
      <div className="flex flex-col  gap-4">
        <div>
          <div>
            <Label htmlFor="title">Title</Label>
            <Input maxLength={100} name="title" placeholder="Title" />
          </div>
          <div>
            <Label htmlFor="category">Category</Label>
            <Input maxLength={100} name="category" placeholder="Category" />
          </div>
          <div>
            <Label htmlFor="authorName">Author Name</Label>
            <Input
              maxLength={100}
              name="authorName"
              placeholder="Author Name"
            />
          </div>
          <div>
            <Label htmlFor="image">Image</Label>
            <Input
              type="file"
              name="image"
              className="bg-white"
              placeholder="Image URL"
            />
          </div>
          {/* <div>
            <Label htmlFor="referencePostUrl">Reference Post URL</Label>
            <Input
              name="referencePostUrl"
              placeholder="https://example.com/reference"
            />
          </div> */}
        </div>
        <div className="w-full h-full">
          <ReactQuill
            value="Write something..."
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
        <Button type="submit">Create Post</Button>
      </div>
    </form>
  );
}
