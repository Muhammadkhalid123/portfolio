"use client";

import React, { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function GsapScrollEffects() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    // Scroll reveal animation for all cards and section containers
    const elementsToReveal = document.querySelectorAll(
      ".liquid-glass, .butter-card, .liquid-glass-dev, .liquid-glass-ai, .liquid-glass-personal"
    );

    elementsToReveal.forEach((el) => {
      gsap.fromTo(
        el,
        {
          opacity: 0.85,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: el,
            start: "top 92%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    // Magnetic effect on interactive buttons
    const buttons = document.querySelectorAll<HTMLElement>(".magnetic-hover");
    const cleanupHandlers: Array<{ el: HTMLElement; mouseMove: (e: MouseEvent) => void; mouseLeave: () => void }> = [];

    buttons.forEach((btn) => {
      const onMouseMove = (e: MouseEvent) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(btn, {
          x: x * 0.25,
          y: y * 0.25,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      const onMouseLeave = () => {
        gsap.to(btn, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "elastic.out(1, 0.4)",
        });
      };

      btn.addEventListener("mousemove", onMouseMove);
      btn.addEventListener("mouseleave", onMouseLeave);

      cleanupHandlers.push({ el: btn, mouseMove: onMouseMove, mouseLeave: onMouseLeave });
    });

    return () => {
      cleanupHandlers.forEach(({ el, mouseMove, mouseLeave }) => {
        el.removeEventListener("mousemove", mouseMove);
        el.removeEventListener("mouseleave", mouseLeave);
      });
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return null;
}
