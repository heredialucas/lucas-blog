import { posts } from "./posts";
import { BlogCardsClientBlogui } from "./blogClientBlogui";
import PremiumBanner from "../premium-banner";
export default async function BlogCardsServerSide() {
  return (
    <>
      <div className="flex justify-center items-center mb-4">
        <PremiumBanner />
      </div>
      <BlogCardsClientBlogui posts={posts} />;
    </>
  );
}
