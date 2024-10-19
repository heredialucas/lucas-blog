"use client";

import BlogCard from "@/components/custom/blogCard";
import parse from "html-react-parser";
import { useStore } from "@/zustand/config";

export function BlogCardsClient({ posts, isAdmin }) {
  const { isLoading } = useStore((state) => state);

  return (
    <div
      className={`container mx-auto p-6 ${
        isLoading ? "cursor-wait" : "cursor-default"
      }`}
    >
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-neutral text-2xl font-semibold">Blog Posts</h1>
      </div>

      {posts.length === 0 && <p>No posts found.</p>}

      <div className="flex flex-wrap gap-6">
        {posts.map((post) => (
          <BlogCard
            key={post.id}
            id={post.id}
            image={post.imageUrl}
            title={post.title}
            summary={parse(post.summary)}
            author={post.authorName}
            date={post.date}
            category={post.category}
            isAdmin={isAdmin}
          />
        ))}
      </div>
    </div>
  );
}
