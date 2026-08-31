"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

type Direction = "up" | "down" | "left" | "right" | "none";

const offset: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 28 },
  down: { y: -28 },
  left: { x: 28 },
  right: { x: -28 },
  none: {},
};

interface RevealProps extends Omit<HTMLMotionProps<"div">, "ref"> {
  /** slide-in direction (default "up") */
  from?: Direction;
  /** seconds before the animation starts */
  delay?: number;
  /** seconds the animation runs (default 0.6) */
  duration?: number;
  /** how much of the element must be visible before it fires (0-1) */
  amount?: number;
  /** replay every time it scrolls into view */
  repeat?: boolean;
}

/**
 * Scroll-triggered fade / slide wrapper. Fires once by default.
 */
export function Reveal({
  from = "up",
  delay = 0,
  duration = 0.6,
  amount = 0.2,
  repeat = false,
  children,
  ...rest
}: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, ...offset[from] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: !repeat, amount }}
      transition={{ duration, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

interface StaggerProps extends Omit<HTMLMotionProps<"div">, "ref"> {
  gap?: number;
  delay?: number;
  amount?: number;
  repeat?: boolean;
}

/**
 * Parent that reveals its <StaggerItem> children one after another
 * as the group scrolls into view.
 */
export function Stagger({
  gap = 0.1,
  delay = 0,
  amount = 0.2,
  repeat = false,
  children,
  ...rest
}: StaggerProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: !repeat, amount }}
      variants={{
        show: { transition: { staggerChildren: gap, delayChildren: delay } },
      }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  from = "up",
  duration = 0.55,
  children,
  ...rest
}: Omit<RevealProps, "delay" | "amount" | "repeat">) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, ...offset[from] },
        show: {
          opacity: 1,
          x: 0,
          y: 0,
          transition: { duration, ease: EASE },
        },
      }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
