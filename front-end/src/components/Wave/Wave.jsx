export default function Wave({ className = "" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 600 100"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M0 52H50L62 47L73 58L85 52H115L125 50L138 55L149 52H170L185 35L199 73L214 5L234 94L249 42L262 53H300L314 47L329 58L341 52H381L394 35L406 72L421 6L442 94L458 42L472 53H520L537 48L550 57L563 52H600"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}
