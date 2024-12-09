import { FooterServerSide } from "./footerServerSide";
import { NavServerSide } from "./navServerSide";

export default function HomeLayout({ children, params }) {
  const { domain } = params;
  return (
    <>
      <NavServerSide domain={domain} />
      {children}
      <FooterServerSide domain={domain} />
    </>
  );
}
