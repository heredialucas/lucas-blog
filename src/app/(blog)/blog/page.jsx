import BlogCard from "@/components/custom/blogCard";
import { getData } from "@/app/api/util/utils";
import parse from "html-react-parser";

export default async function BlogCards() {
  const { posts } = await getData("posts");

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-semibold">Blog Posts</h1>
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
            category={post.category}
          />
        ))}
      </div>
    </div>
  );
}
