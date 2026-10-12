'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const EASE = [0.23, 1, 0.32, 1] as const;
const VIEWPORT = { once: true, amount: 0.15, margin: '0px 0px -10% 0px' } as const;

type RevealProps = {
  children: React.ReactNode;
  /** Seconds. Stagger siblings by 0.08. */
  delay?: number;
  className?: string;
};

/**
 * Clip-path wipe with a lift, played once when the element scrolls in.
 * The observed element is the unclipped wrapper: a clipped target reports an
 * intersection ratio of 0 and would never trigger.
 */
export function Reveal({ children, delay = 0, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, VIEWPORT);

  return (
    <div ref={ref} className={className}>
      <motion.div
        data-reveal="wipe"
        initial="hidden"
        animate={inView ? 'shown' : 'hidden'}
        variants={{
          hidden: { opacity: 0, y: 24, clipPath: 'inset(0% 0% 100% 0%)' },
          shown: {
            opacity: 1,
            y: 0,
            clipPath: 'inset(0% 0% 0% 0%)',
            transition: { duration: 0.7, ease: EASE, delay },
            // Drop the clip afterwards so focus outlines are not cut off.
            transitionEnd: { clipPath: 'none' },
          },
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

/** 1px structural line that draws itself from the left. */
export function Rule({ tone = 'steel', delay = 0 }: { tone?: 'steel' | 'neon' | 'surgical'; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, VIEWPORT);
  const color = { steel: 'bg-steel', neon: 'bg-neon', surgical: 'bg-surgical' }[tone];

  return (
    <div ref={ref} aria-hidden="true" className="h-px">
      <motion.div
        data-reveal="rule"
        className={`h-px origin-left ${color}`}
        initial="hidden"
        animate={inView ? 'shown' : 'hidden'}
        variants={{
          hidden: { opacity: 0, scaleX: 0 },
          shown: { opacity: 1, scaleX: 1, transition: { duration: 0.9, ease: EASE, delay } },
        }}
      />
    </div>
  );
}
