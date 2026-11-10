import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import App from "./App";
import { LanguageProvider } from "./hooks/LanguageProvider";
import "./styles/global.css";
import "./styles/interactive.css";
import "./styles/cursor.css";
import "./styles/context-menu.css";
import "./styles/experience.css";
import "./styles/daily-welcome.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error('Root element "#root" was not found in index.html');
}

createRoot(rootElement).render(
  <StrictMode>
    <LanguageProvider>
      <App />
    </LanguageProvider>
  </StrictMode>,
);
