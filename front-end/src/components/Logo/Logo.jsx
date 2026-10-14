import Image from "next/image";
export default function Logo() {
  return (
    <a className="logo" href="#top" aria-label="SaqtauAI">
      <Image unoptimized src="/logo.svg" alt="" width={38} height={36} />
      <span>
        Saqtau<span className="logo-ai">AI</span>
      </span>
    </a>
  );
}
