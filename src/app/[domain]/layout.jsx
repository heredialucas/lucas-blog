import { NavServerSide } from "./navServerSide";
import { FooterServerSide } from "./footerServerSide";

export default function HomeLayout({ children, params }) {
  const { domain } = params;
  return (
    <>
      <NavServerSide domain={domain} />
      {children}
      <div>
        <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
        <FooterServerSide domain={domain} />
      </div>
    </>
  );
}
