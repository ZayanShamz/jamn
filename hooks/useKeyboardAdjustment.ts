// Create this as a new file: hooks/useKeyboardAdjustment.ts

import { useEffect } from "react";

export function useKeyboardAdjustment() {
  useEffect(() => {
    if (typeof window === "undefined" || !window.visualViewport) return;

    const handleResize = () => {
      const viewport = window.visualViewport;
      if (!viewport) return;

      // Calculate the difference between layout viewport and visual viewport
      const viewportHeight = viewport.height;
      const offsetTop = viewport.offsetTop;

      // Adjust the document's position when keyboard opens
      document.documentElement.style.setProperty(
        "--viewport-height",
        `${viewportHeight}px`
      );

      // Adjust scroll to bring focused element into view
      if (offsetTop > 0) {
        const activeElement = document.activeElement as HTMLElement;
        if (activeElement && activeElement.tagName === "TEXTAREA") {
          activeElement.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      }
    };

    window.visualViewport.addEventListener("resize", handleResize);
    window.visualViewport.addEventListener("scroll", handleResize);

    return () => {
      window.visualViewport?.removeEventListener("resize", handleResize);
      window.visualViewport?.removeEventListener("scroll", handleResize);
    };
  }, []);
}
