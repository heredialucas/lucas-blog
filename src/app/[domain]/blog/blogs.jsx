import { getPosts } from "@/app/server/actions/getPosts";
import { BlogCard } from "./[id]/blogCard";
import parse from "html-react-parser";

export const revalidate = 86400; // 1 day

export async function BlogCards({ domain, isAdmin }) {
  const { posts } = await getPosts(domain);

  const formatedPostsByDate = posts.sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });

  return (
    <div className={`container mx-auto p-6`}>
      {posts.length === 0 && <h2>No posts found.</h2>}

      <div className="flex flex-wrap gap-6">
        {formatedPostsByDate.map((post) => (
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
            domain={domain}
          />
        ))}
      </div>
    </div>
  );
}
