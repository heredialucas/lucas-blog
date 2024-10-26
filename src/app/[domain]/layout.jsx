import { NavServerSide } from "@/app/[domain]/navServerSide";

export default function HomeLayout({ children, params }) {
  const { domain } = params;
  return (
    <>
      <NavServerSide domain={domain} />
      {children}
    </>
  );
}
