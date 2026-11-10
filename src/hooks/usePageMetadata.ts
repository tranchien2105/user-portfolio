import { useEffect } from "react";
import { useLanguage } from "./useLanguage";
import { pageMetadata } from "../lib/pageMetadata";
import type { PortfolioRoute } from "../lib/routes";
export function usePageMetadata(route: PortfolioRoute) {
  const { language } = useLanguage();
  useEffect(() => {
    const metadata = pageMetadata(route, language);
    document.title = metadata.title;
    for (const [selector, content] of [
      ["meta[name=description]", metadata.description],
      ["meta[property='og:description']", metadata.description],
      ["meta[property='og:title']", metadata.title],
      ["meta[name=robots]", metadata.robots],
    ]) {
      let element = document.querySelector<HTMLMetaElement>(selector);
      if (!element && selector === "meta[name=robots]") {
        element = document.createElement("meta");
        element.name = "robots";
        document.head.appendChild(element);
      }
      element?.setAttribute("content", content);
    }
  }, [route, language]);
}
