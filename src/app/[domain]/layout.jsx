import { NavServerSide } from "@/app/[domain]/navServerSide";

export default function HomeLayout({ children, params }) {
  const { domain } = params;
  return (
    <>
      <NavServerSide domain={domain} />
      <div className="flex flex-col md:justify-between  m-12 md:mx-6 ">
        {children}
      </div>
    </>
  );
}
