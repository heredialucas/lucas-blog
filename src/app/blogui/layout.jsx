import { FooterClientSide } from "./footerClientBlogui";
import { NavClientSideBlogui } from "./navClientSideBlogui";

export default function HomeLayout({ children }) {
  return (
    <>
      <NavClientSideBlogui />
      {children}
      <div>
        <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
        <FooterClientSide />
      </div>
    </>
  );
}
