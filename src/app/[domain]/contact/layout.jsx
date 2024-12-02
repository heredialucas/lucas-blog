export default function ContactLayout({ children }) {
  return (
    <div className="flex flex-col justify-center items-center h-[750px] ">
      <div className="w-full md:w-[600px] p-4 md:p-12 rounded-xl border-2 border-primary">
        {children}
      </div>
    </div>
  );
}
