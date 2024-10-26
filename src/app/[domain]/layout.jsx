import { NavServerSide } from "./navServerSide";
import { FooterServerSide } from "./footerServerSide";

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
