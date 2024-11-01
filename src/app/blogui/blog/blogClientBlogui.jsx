"use client";

import parse from "html-react-parser";
import BlogCardBlogui from './example-post/blogCardBlogui';

export function BlogCardsClientBlogui({ posts }) {
  return (
    <div className={`container mx-auto p-6`}>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-xl md:text-2xl font-semibold">Blog Posts</h1>
      </div>

      {posts.length === 0 && <p>No posts found.</p>}

      <div className="flex flex-wrap gap-6">
        {posts.map((post) => (
          <BlogCardBlogui
            key={post.id}
            id={post.id}
            image={post.imageUrl}
            title={post.title}
            summary={parse(post.summary)}
            author={post.authorName}
            date={post.date}
            category={post.category}
            isAdmin={true}
          />
        ))}
      </div>
    </div>
  );
}
