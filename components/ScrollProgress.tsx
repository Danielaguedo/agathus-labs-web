'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

/** 1px violet line across the top of the viewport tracking page scroll. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-30 h-px origin-left bg-neon"
    />
  );
}
