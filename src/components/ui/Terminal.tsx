import {
  useEffect,
  useId,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { profile, skills } from "../../data/portfolio";
import { projects, projectUrl } from "../../data/projects";
import { useLanguage } from "../../hooks/useLanguage";

interface TerminalProps {
  title?: string;
  children: ReactNode;
  focusOnOpen?: boolean;
}

interface CommandResult {
  command: string;
  response: ReactNode;
}

export function Terminal({
  title = "terminal",
  children,
  focusOnOpen = false,
}: TerminalProps) {
  const { language } = useLanguage();
  const inputId = useId();
  const [command, setCommand] = useState("");
  const [history, setHistory] = useState<CommandResult[]>([]);
  const [cleared, setCleared] = useState(false);
  const consoleRef = useRef<HTMLDivElement>(null);
  const commandHistory = useRef<string[]>([]);
  const historyIndex = useRef(0);

  useEffect(() => {
    const consoleElement = consoleRef.current;
    if (consoleElement) consoleElement.scrollTop = consoleElement.scrollHeight;
  }, [history, cleared]);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const raw = command.trim();
    if (!raw) return;
    const normalized = raw
      .toLocaleLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "");
    let response: ReactNode;

    switch (normalized) {
      case "help":
        response = (
          <span>
            Commands: <b>help</b>, <b>about</b>, <b>skills</b>, <b>projects</b>,{" "}
            <b>contact</b>, <b>clear</b>
          </span>
        );
        break;
      case "info":
      case "infor":
      case "thongtin":
      case "about":
      case "whoami":
        response = (
          <span>
            {profile.name} · {profile.title}
            <br />
            {profile.location}
            <br />
            {profile.email}
            <br />
            <a href={profile.github} target="_blank" rel="noreferrer">
              {profile.github}
            </a>
          </span>
        );
        break;
      case "projects":
        response = (
          <span>
            {projects.map((project) => (
              <span className="terminal-result-line" key={project.name}>
                › <a href={projectUrl(project)}>{project.name}</a> —{" "}
                {project.summary[language]}
              </span>
            ))}
          </span>
        );
        break;
      case "skills":
        response = (
          <span>
            {skills.map((group) => (
              <span className="terminal-result-line" key={group.title.en}>
                <b>{group.title[language]}:</b>{" "}
                {[...group.skills, ...(group.supportingSkills ?? [])].join(
                  ", ",
                )}
              </span>
            ))}
          </span>
        );
        break;
      case "contact":
        response = (
          <span>
            Email: <a href={`mailto:${profile.email}`}>{profile.email}</a>
            <br />
            GitHub:{" "}
            <a href={profile.github} target="_blank" rel="noreferrer">
              {profile.github}
            </a>
          </span>
        );
        break;
      case "clear":
        setHistory([]);
        setCleared(true);
        setCommand("");
        return;
      case "pwd":
        response = <span>/home/chien/portfolio</span>;
        break;
      case "ls":
        response = (
          <span>about.md skills.json experience.log projects/ contact.txt</span>
        );
        break;
      case "date":
        response = (
          <span>
            {new Intl.DateTimeFormat(language === "vi" ? "vi-VN" : "en-GB", {
              dateStyle: "full",
              timeZone: "Asia/Ho_Chi_Minh",
            }).format(new Date())}
          </span>
        );
        break;
      default:
        if (normalized.startsWith("echo"))
          response = <span>{raw.slice(4).trim() || "\u00a0"}</span>;
        else
          response = (
            <span className="terminal-error">
              {language === "vi"
                ? `bash: ${raw}: không tìm thấy lệnh. Gõ help để xem lệnh.`
                : `bash: ${raw}: command not found. Type help to list commands.`}
            </span>
          );
        break;
    }

    commandHistory.current.push(raw);
    historyIndex.current = commandHistory.current.length;
    setHistory((entries) => [
      ...entries.slice(-49),
      { command: raw, response },
    ]);
    setCleared(false);
    setCommand("");
  };

  const handleInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowUp") {
      event.preventDefault();
      historyIndex.current = Math.max(0, historyIndex.current - 1);
      setCommand(commandHistory.current[historyIndex.current] ?? "");
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      historyIndex.current = Math.min(
        commandHistory.current.length,
        historyIndex.current + 1,
      );
      setCommand(commandHistory.current[historyIndex.current] ?? "");
    } else if (event.ctrlKey && event.key.toLowerCase() === "l") {
      event.preventDefault();
      setHistory([]);
      setCleared(true);
    }
  };

  return (
    <div className="terminal panel">
      <div className="terminal-bar" aria-hidden="true">
        <span />
        <span />
        <span />
        <small>{title}</small>
      </div>
      <div className="terminal-content">
        <div
          className="terminal-console"
          ref={consoleRef}
          role="log"
          aria-live="polite"
        >
          {!cleared && <div className="terminal-static-output">{children}</div>}
          {history.map((entry, index) => (
            <div className="terminal-entry" key={`${entry.command}-${index}`}>
              <div className="terminal-command-line">
                <span className="terminal-user">chien@portfolio</span>:
                <span className="terminal-path">~</span>$ {entry.command}
              </div>
              <div className="terminal-response">{entry.response}</div>
            </div>
          ))}
        </div>
        <form className="terminal-input-row" onSubmit={submit}>
          <label className="terminal-user" htmlFor={inputId}>
            chien@portfolio
          </label>
          <span aria-hidden="true">:</span>
          <span className="terminal-path" aria-hidden="true">
            ~
          </span>
          <label className="terminal-input-symbol" htmlFor={inputId}>
            $
          </label>
          <input
            id={inputId}
            data-modal-focus={focusOnOpen ? "" : undefined}
            data-terminal-input
            value={command}
            onChange={(event) => setCommand(event.target.value)}
            onKeyDown={handleInputKeyDown}
            autoComplete="off"
            spellCheck={false}
            aria-label={
              language === "vi"
                ? "Nhập lệnh terminal"
                : "Enter terminal command"
            }
            placeholder={
              language === "vi"
                ? "help, info, projects…"
                : "help, info, projects…"
            }
          />
          <button
            type="submit"
            aria-label={language === "vi" ? "Chạy lệnh" : "Run command"}
          >
            ↵
          </button>
        </form>
      </div>
    </div>
  );
}
