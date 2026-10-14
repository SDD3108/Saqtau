"use client";

import { useEffect } from "react";

const revealSelector = [
  ".section-heading",
  ".stats > div",
  ".step",
  ".research-note",
  ".signal-panel",
  ".pilots-grid > article",
  ".funding-intro",
  ".funding-row",
  ".partners",
  ".founders > article",
  ".advisors > article",
  ".faq-section > div",
  ".final-cta > h2",
  ".final-cta > p",
  ".feature-copy",
  ".feature-phones",
  ".gallery-heading",
].join(",");

export default function useSiteMotion() {
  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const fine = matchMedia("(hover: hover) and (pointer: fine)");
    let dispose = () => {};

    function setup() {
      dispose();
      if (reduced.matches || !Element.prototype.animate) return;
      const root = document.documentElement;
      const main = document.querySelector("#main");
      if (!main) return;
      const animations = new Set();
      const revealed = new WeakSet();
      let alive = true;
      let scrollFrame = 0;
      let pointerFrame = 0;
      let scanFrame = 0;
      let magnet = null;
      let spotlight = null;
      let targetX = 0;
      let targetY = 0;
      let currentX = 0;
      let currentY = 0;
      let pointerX = 0;
      let pointerY = 0;
      const visual = main.querySelector(".hero-visual");
      const hero = main.querySelector(".hero");
      root.dataset.siteMotion = "on";

      function animate(element, frames, options) {
        const animation = element.animate(frames, options);
        animations.add(animation);
        animation.onfinish = () => {
          animation.cancel();
          animations.delete(animation);
        };
        return animation;
      }

      main.querySelectorAll(".hero-copy > *").forEach((element, index) => {
        animate(
          element,
          [
            { opacity: 0, translate: "0 28px", filter: "blur(8px)" },
            { opacity: 1, translate: "0 0", filter: "blur(0)" },
          ],
          {
            duration: 950,
            delay: index * 100,
            easing: "cubic-bezier(.16,1,.3,1)",
            fill: "both",
          },
        );
      });
      if (visual)
        animate(
          visual,
          [
            { opacity: 0, translate: "0 48px" },
            { opacity: 1, translate: "0 0" },
          ],
          {
            duration: 1300,
            delay: 180,
            easing: "cubic-bezier(.16,1,.3,1)",
            fill: "both",
          },
        );

      const observer = new IntersectionObserver(
        (entries) => {
          const visible = entries
            .filter((entry) => entry.isIntersecting)
            .sort(
              (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
            );
          visible.forEach(({ target }, index) => {
            observer.unobserve(target);
            animate(
              target,
              [
                { opacity: 0, translate: "0 34px", filter: "blur(5px)" },
                { opacity: 1, translate: "0 0", filter: "blur(0)" },
              ],
              {
                duration: 850,
                delay: Math.min(index, 4) * 65,
                easing: "cubic-bezier(.16,1,.3,1)",
                fill: "both",
              },
            );
          });
        },
        { threshold: 0.08, rootMargin: "0px 0px -24px 0px" },
      );

      function register() {
        scanFrame = 0;
        main.querySelectorAll(revealSelector).forEach((element) => {
          if (revealed.has(element)) return;
          revealed.add(element);
          observer.observe(element);
        });
      }
      register();
      const mutations = new MutationObserver((records) => {
        if (
          records.some((record) =>
            [...record.addedNodes].some((node) => node.nodeType === 1),
          ) &&
          !scanFrame
        ) {
          scanFrame = requestAnimationFrame(register);
        }
      });
      mutations.observe(main, { childList: true, subtree: true });

      function updateScroll() {
        scrollFrame = 0;
        const total = root.scrollHeight - innerHeight;
        root.style.setProperty(
          "--page-progress",
          String(total > 0 ? Math.min(1, Math.max(0, scrollY / total)) : 0),
        );
      }
      function onScroll() {
        if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScroll);
        resetHover();
      }
      const resizeObserver = new ResizeObserver(onScroll);
      resizeObserver.observe(main);
      updateScroll();

      function resetHover() {
        if (magnet) {
          magnet.style.removeProperty("translate");
          magnet = null;
        }
        if (spotlight) {
          spotlight.removeAttribute("data-spotlight");
          spotlight = null;
        }
        targetX = targetY = 0;
        wakePointer();
      }

      function tickPointer() {
        pointerFrame = 0;
        if (!alive || document.hidden) return;
        const dx = targetX - currentX;
        const dy = targetY - currentY;
        currentX += dx * 0.12;
        currentY += dy * 0.12;
        if (visual) {
          visual.style.setProperty(
            "--tilt-x",
            `${(-currentY * 7).toFixed(3)}deg`,
          );
          visual.style.setProperty(
            "--tilt-y",
            `${(currentX * 9).toFixed(3)}deg`,
          );
          visual.style.setProperty(
            "--drift-x",
            `${(currentX * 15).toFixed(3)}px`,
          );
          visual.style.setProperty(
            "--drift-y",
            `${(currentY * 12).toFixed(3)}px`,
          );
        }
        if (spotlight) {
          const rect = spotlight.getBoundingClientRect();
          spotlight.style.setProperty("--light-x", `${pointerX - rect.left}px`);
          spotlight.style.setProperty("--light-y", `${pointerY - rect.top}px`);
        }
        if (magnet) {
          const rect = magnet.getBoundingClientRect();
          const x = Math.max(
            -7,
            Math.min(7, (pointerX - rect.left - rect.width / 2) * 0.12),
          );
          const y = Math.max(
            -5,
            Math.min(5, (pointerY - rect.top - rect.height / 2) * 0.15),
          );
          magnet.style.translate = `${x}px ${y}px`;
        }
        if (Math.abs(dx) + Math.abs(dy) > 0.002) wakePointer();
      }
      function wakePointer() {
        if (!pointerFrame && !document.hidden)
          pointerFrame = requestAnimationFrame(tickPointer);
      }
      function onPointer(event) {
        if (!fine.matches || event.pointerType !== "mouse") return;
        pointerX = event.clientX;
        pointerY = event.clientY;
        const button = event.target.closest?.(".primary-btn:not(:disabled)");
        if (magnet && button !== magnet)
          magnet.style.removeProperty("translate");
        magnet = button;
        const card = event.target.closest?.(
          ".pilots-grid > article, .signal-panel, .launch, .final-cta, .founders > article",
        );
        if (spotlight && card !== spotlight)
          spotlight.removeAttribute("data-spotlight");
        spotlight = card;
        if (spotlight) spotlight.dataset.spotlight = "on";
        if (hero?.contains(event.target)) {
          const rect = hero.getBoundingClientRect();
          targetX = Math.max(
            -1,
            Math.min(1, ((pointerX - rect.left) / rect.width) * 2 - 1),
          );
          targetY = Math.max(
            -1,
            Math.min(1, ((pointerY - rect.top) / rect.height) * 2 - 1),
          );
        } else targetX = targetY = 0;
        wakePointer();
      }
      function onVisibility() {
        root.dataset.motionPaused = document.hidden ? "true" : "false";
        if (document.hidden) {
          cancelAnimationFrame(pointerFrame);
          pointerFrame = 0;
          animations.forEach((animation) => animation.pause());
        } else {
          animations.forEach((animation) => animation.play());
          updateScroll();
          wakePointer();
        }
      }
      window.addEventListener("scroll", onScroll, { passive: true });
      document.addEventListener("pointermove", onPointer, { passive: true });
      document.addEventListener("pointerleave", resetHover);
      window.addEventListener("blur", resetHover);
      document.addEventListener("visibilitychange", onVisibility);

      dispose = () => {
        alive = false;
        observer.disconnect();
        mutations.disconnect();
        resizeObserver.disconnect();
        window.removeEventListener("scroll", onScroll);
        document.removeEventListener("pointermove", onPointer);
        document.removeEventListener("pointerleave", resetHover);
        window.removeEventListener("blur", resetHover);
        document.removeEventListener("visibilitychange", onVisibility);
        if (magnet) magnet.style.removeProperty("translate");
        if (spotlight) spotlight.removeAttribute("data-spotlight");
        [scrollFrame, pointerFrame, scanFrame].forEach(cancelAnimationFrame);
        animations.forEach((animation) => animation.cancel());
        ["--tilt-x", "--tilt-y", "--drift-x", "--drift-y"].forEach((key) =>
          visual?.style.removeProperty(key),
        );
        root.style.removeProperty("--page-progress");
        delete root.dataset.siteMotion;
        delete root.dataset.motionPaused;
      };
    }
    setup();
    reduced.addEventListener("change", setup);
    return () => {
      reduced.removeEventListener("change", setup);
      dispose();
    };
  }, []);
}
