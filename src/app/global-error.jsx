"use client"; // Error boundaries must be Client Components
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
export default function GlobalError({ error, reset }) {
  toast.error(error);
  const router = useRouter();
  router.push("/blogui");
  return (
    <html>
      <body>
        <h1>Something went wrong</h1>
      </body>
    </html>
  );
}
