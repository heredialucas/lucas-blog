import { NavClientSideBlogui } from "@/components/custom/navClientSideBlogui";

export default function HomeLayout({ children }) {
  return (
    <>
      <NavClientSideBlogui />
      <div className="flex flex-col md:justify-between  m-12 md:mx-6 ">
        {children}
      </div>
    </>
  );
}
