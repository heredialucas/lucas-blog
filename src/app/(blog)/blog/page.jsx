import BlogCard from "@/components/custom/blogCard";
import { blogData } from "./data";
import DialogPost from "@/components/custom/dialogPost";

export default function BlogCards() {
  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold">Blog Posts</h1>
        <DialogPost />
      </div>

      <div className="flex flex-wrap gap-6">
        {blogData.map((post) => (
          <BlogCard
            key={post.id}
            id={post.id}
            image={post.image}
            title={post.title}
            summary={post.summary}
            author={post.author}
            category={post.category}
          />
        ))}
      </div>
    </div>
  );
}
