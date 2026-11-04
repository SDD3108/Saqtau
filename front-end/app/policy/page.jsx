import { permanentRedirect } from "next/navigation";
import { privacyHref } from "@/src/feature/Privacy/links";

export default async function PolicyRedirect({ searchParams }) {
  permanentRedirect(privacyHref((await searchParams)?.lang));
}
