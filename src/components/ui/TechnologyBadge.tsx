import { technologyLogos } from "../../data/technologies";
export function TechnologyBadge({ name }: { name: string }) {
  const logo = technologyLogos[name];
  return (
    <span className="technology-badge">
      {logo && (
        <img
          className="technology-logo"
          src={`/technology/${logo}.svg`}
          width="20"
          height="20"
          alt=""
          aria-hidden="true"
          loading="lazy"
          decoding="async"
        />
      )}
      <span>{name}</span>
    </span>
  );
}
