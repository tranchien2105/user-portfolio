import type { Capability } from "../../types/portfolio";
const paths: Record<Capability, string> = {
  backend: "M5 4h14v6H5zM5 14h14v6H5zM8 7h.01M8 17h.01M12 7h4M12 17h4M12 10v4",
  frontend: "M3 4h18v16H3zM3 9h18M8 9v11M6 6.5h.01M9 6.5h.01",
  database:
    "M20 6c0 2.2-16 2.2-16 0s16-2.2 16 0v12c0 2.7-16 2.7-16 0V6M4 12c0 2.7 16 2.7 16 0",
  infrastructure:
    "m12 3 9 5v9l-9 5-9-5V8l9-5Zm0 10 9-5M12 13 3 8m9 5v9M7.5 5.5l9 5",
};
export function CapabilityIcon({ name }: { name: Capability }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[name]} />
    </svg>
  );
}
