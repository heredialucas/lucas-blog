export default function HomeLayout({ children }) {
  return (
    <div className="flex flex-col md:justify-around h-[750px] m-12 md:mx-6 ">
      {children}
    </div>
  );
}
