'use client';

import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

type ParallaxProps = {
  children: React.ReactNode;
  /** Pixels of travel each way while the element crosses the viewport. */
  distance?: number;
  className?: string;
};

/** Scroll-linked vertical drift. Transform only; off under reduced motion. */
export function Parallax({ children, distance = 24, className }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [distance, -distance]);

  return (
    <motion.div ref={ref} style={{ y: reduce ? 0 : y }} className={className}>
      {children}
    </motion.div>
  );
}
