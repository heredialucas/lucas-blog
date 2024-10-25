import Link from "next/link";
export default function ConfigLayout({ params, children }) {
  const { domain } = params;
  return (
    <div className="flex flex-col justify-center items-center w-full">
      <Link
        className="btn btn-primary text-primary-content w-fit m-4"
        href={`/${domain}`}
      >
        Come back
      </Link>
      {children}
    </div>
  );
}
