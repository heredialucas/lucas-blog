import { FooterClientSide } from "./footerClientBlogui";
import { NavClientSideBlogui } from "./navClientSideBlogui";

export default function HomeLayout({ children }) {
  return (
    <>
      <NavClientSideBlogui />
      {children}
      <FooterClientSide />
    </>
  );
}
