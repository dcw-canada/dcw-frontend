"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollObserver() {
  const pathname = usePathname();

  // Ensure every page navigation scrolls strictly to top (unless navigating to a specific hash)
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Prevent browser from restoring middle-of-page scroll positions
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }

      if (!window.location.hash) {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      }
    }
  }, [pathname]);

  // Handle scroll-triggered entrance animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    const observeElements = () => {
      const targets = document.querySelectorAll(
        ".reveal, .reveal-scale, .reveal-left, .reveal-right, [data-reveal]"
      );
      targets.forEach((target) => {
        observer.observe(target);
      });
    };

    observeElements();

    const mutationObserver = new MutationObserver(() => {
      observeElements();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [pathname]);

  return null;
}
