import { NavServerSide } from "@/app/[domain]/navServerSide";

export default function HomeLayout({ children }) {
  return (
    <>
      <NavServerSide />
      <div className="flex flex-col md:justify-between  m-12 md:mx-6 ">
        {children}
      </div>
    </>
  );
}
