import { FooterServerSide } from "./footerServerSide";
import { Loading } from "@/components/custom/loading";
import { NavServerSide } from "./navServerSide";
import { Suspense } from "react";

export default function HomeLayout({ children, params }) {
  const { domain } = params;
  return (
    <>
      <NavServerSide domain={domain} />
      <Suspense fallback={<Loading />}>{children}</Suspense>
      <FooterServerSide domain={domain} />
    </>
  );
}
