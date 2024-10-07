"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { postData, postImage } from "@/app/api/util/actions";
import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";
import { useForm } from "react-hook-form";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
});

const FormField = ({
  label,
  name,
  register,
  error,
  type = "text",
  tooltip,
  validation,
  placeholder,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="mb-4">
      <TooltipProvider>
        <Tooltip open={showTooltip || !!error}>
          <TooltipTrigger asChild>
            <div>
              <Label
                htmlFor={name}
                className={`block mb-2 ${error ? "text-red-500" : ""}`}
              >
                {label}
                {validation?.required && (
                  <span className="text-red-500 ml-1">*</span>
                )}
              </Label>
              <Input
                id={name}
                type={type}
                placeholder={placeholder}
                className={`w-full ${
                  error ? "border-red-500 focus:ring-red-500" : ""
                }`}
                {...register(name, validation)}
                onFocus={() => setShowTooltip(true)}
                onBlur={() => setShowTooltip(false)}
              />
            </div>
          </TooltipTrigger>
          <TooltipContent
            side="top"
            className={error ? "bg-red-500 text-white" : "bg-slate-400"}
          >
            <p>{error ? error.message : tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      {error && <p className="mt-1 text-xs text-red-500">{error.message}</p>}
    </div>
  );
};

export default function PostForm() {
  const [editorContent, setEditorContent] = useState("");
  const [editorError, setEditorError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      title: "",
      category: "",
      authorName: "",
      referencePostUrl: "",
    },
  });

  const validateFileType = (file) => {
    const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!validTypes.includes(file?.type)) {
      return "File must be an image (JPEG, PNG, GIF, or WebP)";
    }
    return true;
  };

  const validateFileSize = (file) => {
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file?.size > maxSize) {
      return "File size must be less than 5MB";
    }
    return true;
  };

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);

      // Validar el contenido del editor
      if (!editorContent.trim()) {
        setEditorError("Content is required");
        return;
      }
      setEditorError("");

      // Validar la imagen
      const file = data.image[0];
      if (!file) {
        return;
      }

      const fileValidation = validateFileType(file) && validateFileSize(file);
      if (fileValidation !== true) {
        return;
      }

      const arrayBuffer = await file.arrayBuffer();
      const buffer = new Uint8Array(arrayBuffer);
      const serializedFile = Array.from(buffer);

      const fileData = {
        name: file.name,
        type: file.type,
        data: serializedFile,
      };

      const image = await postImage(fileData);
      await postData(data, editorContent, image.url);

      // Resetear el formulario
      reset();
      setEditorContent("");
      setEditorError("");
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Observar cambios en el editor
  const handleEditorChange = (content) => {
    setEditorContent(content);
    if (!content.trim()) {
      setEditorError("Content is required");
    } else {
      setEditorError("");
    }
  };

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit(onSubmit)}
      className="p-6 border-2 border-gray-200 rounded-xl space-y-6"
    >
      <FormField
        label="Title"
        name="title"
        register={register}
        error={errors.title}
        tooltip="Enter a descriptive title for your post"
        placeholder="Enter post title"
        validation={{
          required: "Title is required",
          minLength: {
            value: 3,
            message: "Title must be at least 3 characters long",
          },
          maxLength: {
            value: 100,
            message: "Title must not exceed 100 characters",
          },
          pattern: {
            value: /^[A-Za-z0-9\s.,!?-]+$/,
            message: "Title contains invalid characters",
          },
        }}
      />

      <FormField
        label="Category"
        name="category"
        register={register}
        error={errors.category}
        tooltip="Select a category for your post"
        placeholder="Enter post category"
        validation={{
          required: "Category is required",
          minLength: {
            value: 2,
            message: "Category must be at least 2 characters long",
          },
          maxLength: {
            value: 50,
            message: "Category must not exceed 50 characters",
          },
          pattern: {
            value: /^[A-Za-z\s&-]+$/,
            message: "Category should only contain letters, spaces, & and -",
          },
        }}
      />

      <FormField
        label="Author Name"
        name="authorName"
        register={register}
        error={errors.authorName}
        tooltip="Enter the author's name"
        placeholder="Enter author name"
        validation={{
          required: "Author name is required",
          minLength: {
            value: 2,
            message: "Author name must be at least 2 characters long",
          },
          maxLength: {
            value: 50,
            message: "Author name must not exceed 50 characters",
          },
          pattern: {
            value: /^[A-Za-z\s.-]+$/,
            message:
              "Author name should only contain letters, spaces, dots and hyphens",
          },
        }}
      />

      <FormField
        label="Image"
        name="image"
        type="file"
        register={register}
        error={errors.image}
        tooltip="Upload an image for your post (JPEG, PNG, GIF, or WebP, max 5MB)"
        validation={{
          required: "Image is required",
          validate: {
            fileType: (value) => !value[0] || validateFileType(value[0]),
            fileSize: (value) => !value[0] || validateFileSize(value[0]),
          },
        }}
      />

      <FormField
        label="Reference Post URL"
        name="referencePostUrl"
        register={register}
        error={errors.referencePostUrl}
        tooltip="Optional: Add a reference URL"
        placeholder="https://example.com/reference"
        validation={{
          pattern: {
            value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
            message: "Please enter a valid URL",
          },
        }}
      />

      <div className="relative">
        <TooltipProvider>
          <Tooltip open={!!editorError}>
            <TooltipTrigger asChild>
              <div>
                <Label
                  htmlFor="editor"
                  className={`block mb-2 ${editorError ? "text-red-500" : ""}`}
                >
                  Content <span className="text-red-500">*</span>
                </Label>
                <div
                  className={`border rounded-md ${
                    editorError ? "border-red-500" : ""
                  }`}
                >
                  <ReactQuill
                    id="editor"
                    value={editorContent}
                    onChange={handleEditorChange}
                    theme="snow"
                    placeholder="Write your post content here..."
                  />
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent side="top" className="bg-red-500 text-white">
              <p>{editorError}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        {editorError && (
          <p className="mt-1 text-xs text-red-500">{editorError}</p>
        )}
      </div>

      <div className="flex justify-end pt-4">
        <Button
          type="submit"
          disabled={
            isSubmitting || Object.keys(errors).length > 0 || !!editorError
          }
          className="px-6"
        >
          {isSubmitting ? "Creating Post..." : "Create Post"}
        </Button>
      </div>
    </form>
  );
}
