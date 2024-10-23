"use client"; // Error boundaries must be Client Components
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
export default function GlobalError({ error, reset }) {
  toast.error(error);
  const router = useRouter();
  router.push("/blogui");
}
