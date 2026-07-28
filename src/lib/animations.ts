import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export const EASINGS = {
  luxury: "power3.inOut",
  smooth: "power2.inOut",
  dramatic: "power4.inOut",
  snap: "back.out(1.7)",
  elastic: "elastic.out(1, 0.5)",
} as const;

export const DURATIONS = {
  fast: 0.6,
  normal: 1.0,
  slow: 1.5,
  cinematic: 2.5,
} as const;

export function fadeInUp(
  element: gsap.TweenTarget,
  options?: { duration?: number; delay?: number; y?: number }
) {
  return gsap.fromTo(
    element,
    { opacity: 0, y: options?.y || 60, filter: "blur(10px)" },
    {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: options?.duration || DURATIONS.normal,
      delay: options?.delay || 0,
      ease: EASINGS.luxury,
    }
  );
}

export function scaleReveal(
  element: gsap.TweenTarget,
  options?: { duration?: number; delay?: number }
) {
  return gsap.fromTo(
    element,
    { opacity: 0, scale: 0.8, filter: "blur(20px)" },
    {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      duration: options?.duration || DURATIONS.slow,
      delay: options?.delay || 0,
      ease: EASINGS.dramatic,
    }
  );
}

export function slideReveal(
  element: gsap.TweenTarget,
  direction: "left" | "right" | "up" | "down" = "up",
  options?: { duration?: number; delay?: number }
) {
  const directions = {
    left: { x: -100, y: 0 },
    right: { x: 100, y: 0 },
    up: { x: 0, y: 100 },
    down: { x: 0, y: -100 },
  };
  const dir = directions[direction];

  return gsap.fromTo(
    element,
    { opacity: 0, x: dir.x, y: dir.y, filter: "blur(8px)" },
    {
      opacity: 1,
      x: 0,
      y: 0,
      filter: "blur(0px)",
      duration: options?.duration || DURATIONS.normal,
      delay: options?.delay || 0,
      ease: EASINGS.luxury,
    }
  );
}

export function createScrollTrigger(
  trigger: string | Element,
  config: ScrollTrigger.Vars
) {
  return ScrollTrigger.create({
    trigger,
    start: "top 80%",
    end: "bottom 20%",
    ...config,
  });
}
