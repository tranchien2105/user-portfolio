import {
  useId,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from "react";
import type { Architecture } from "../../types/caseStudy";
import { text, useLanguage } from "../../hooks/useLanguage";
export function InteractiveArchitecture({
  architecture,
}: {
  architecture: Architecture;
}) {
  const { language } = useLanguage();
  const [selected, setSelected] = useState(architecture.nodes[0].id);
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const uid = useId();
  const active =
    architecture.nodes.find((node) => node.id === selected) ??
    architecture.nodes[0];
  const rows = Math.max(...architecture.nodes.map((node) => node.row)) + 1;
  const positions = new Map(
    architecture.nodes.map((node) => [
      node.id,
      { x: 160 + node.column * 340, y: 55 + node.row * 110 },
    ]),
  );
  function keyboard(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next: number;
    if (["ArrowRight", "ArrowDown"].includes(event.key))
      next = (index + 1) % refs.current.length;
    else if (["ArrowLeft", "ArrowUp"].includes(event.key))
      next = (index - 1 + refs.current.length) % refs.current.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = refs.current.length - 1;
    else return;
    event.preventDefault();
    refs.current[next]?.focus();
  }
  return (
    <div className="interactive-architecture">
      <p className="architecture-hint">
        {text(
          "Chọn một thành phần để tìm hiểu. Dùng Tab hoặc phím mũi tên để điều hướng.",
          "Select a component to explore it. Use Tab or arrow keys to navigate.",
          language,
        )}
      </p>
      <div
        className="architecture-canvas"
        style={{ "--architecture-rows": rows } as CSSProperties}
        role="group"
        aria-label={text(
          "Các thành phần kiến trúc",
          "Architecture components",
          language,
        )}
      >
        <svg
          className="architecture-wires"
          viewBox={`0 0 1000 ${rows * 110}`}
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <marker
              id={`${uid}-arrow`}
              markerWidth="7"
              markerHeight="7"
              refX="6"
              refY="3.5"
              orient="auto"
            >
              <path d="M0 0L7 3.5L0 7" fill="currentColor" />
            </marker>
          </defs>
          {architecture.edges.map((edge, index) => {
            const from = positions.get(edge.from)!;
            const to = positions.get(edge.to)!;
            const horizontal = from.x !== to.x;
            const direction = horizontal
              ? Math.sign(to.x - from.x)
              : Math.sign(to.y - from.y);
            const sx = from.x + (horizontal ? 132 * direction : 0),
              sy = from.y + (horizontal ? 0 : 30 * direction);
            const tx = to.x - (horizontal ? 132 * direction : 0),
              ty = to.y - (horizontal ? 0 : 30 * direction);
            const d = horizontal
              ? `M${sx} ${sy} C${(sx + tx) / 2} ${sy},${(sx + tx) / 2} ${ty},${tx} ${ty}`
              : `M${sx} ${sy} L${tx} ${ty}`;
            return (
              <path
                key={index}
                d={d}
                className={
                  edge.from === selected || edge.to === selected
                    ? "is-connected"
                    : ""
                }
                markerEnd={`url(#${uid}-arrow)`}
              />
            );
          })}
        </svg>
        {architecture.nodes.map((node, index) => (
          <button
            type="button"
            className="architecture-node"
            key={node.id}
            ref={(element) => {
              refs.current[index] = element;
            }}
            style={{
              left: `${(160 + node.column * 340) / 10}%`,
              top: `${((55 + node.row * 110) / (rows * 110)) * 100}%`,
            }}
            onFocus={() => setSelected(node.id)}
            onPointerEnter={(event) => {
              if (event.pointerType === "mouse") setSelected(node.id);
            }}
            onClick={() => setSelected(node.id)}
            onKeyDown={(event) => keyboard(event, index)}
            aria-pressed={selected === node.id}
            aria-controls={`${uid}-description`}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            {node.label}
          </button>
        ))}
      </div>
      <div
        className="architecture-inspector"
        id={`${uid}-description`}
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        <h3>{active.label}</h3>
        <p>{active.description[language]}</p>
      </div>
      <ul
        className="architecture-relationships"
        aria-label={text(
          "Kết nối đã xác minh",
          "Verified connections",
          language,
        )}
      >
        {architecture.edges.map((edge, index) => (
          <li
            key={index}
            className={
              edge.from === selected || edge.to === selected
                ? "is-connected"
                : ""
            }
          >
            <span>
              {architecture.nodes.find((node) => node.id === edge.from)?.label}{" "}
              <span aria-hidden="true">→</span>{" "}
              {architecture.nodes.find((node) => node.id === edge.to)?.label}
            </span>
            <small>{edge.label[language]}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}
