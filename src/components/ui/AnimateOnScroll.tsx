'use client';

import { createContext, type ReactNode, useContext, useEffect, useMemo, useRef } from 'react';
import type { Variants } from 'framer-motion';

type Direction = 'up' | 'down' | 'left' | 'right' | 'fade' | 'scale';

interface AnimateOnScrollProps {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  once?: boolean;
  amount?: number;
}

interface RevealOptions {
  direction: Direction;
  delay: number;
  duration: number;
  distance: number;
  once: boolean;
  amount: number;
  staggerDelay?: number;
}

function initialTransform(direction: Direction, distance: number) {
  switch (direction) {
    case 'up': return `translate3d(0, ${distance}px, 0)`;
    case 'down': return `translate3d(0, ${-distance}px, 0)`;
    case 'left': return `translate3d(${distance}px, 0, 0)`;
    case 'right': return `translate3d(${-distance}px, 0, 0)`;
    case 'scale': return 'scale(0.95)';
    default: return 'none';
  }
}

function useScrollReveal({ direction, delay, duration, distance, once, amount, staggerDelay = 0 }: RevealOptions) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || !('IntersectionObserver' in window) || typeof element.animate !== 'function') return;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (preference.matches) return;

    // Above-the-fold content is already visible. Do not hide it after hydration
    // to replay an entrance; only enhance content that starts offscreen.
    const bounds = element.getBoundingClientRect();
    if (bounds.top < window.innerHeight && bounds.bottom > 0) return;

    let animation: Animation | undefined;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || preference.matches) return;
      const siblings = element.parentElement ? Array.from(element.parentElement.children) : [];
      const index = Math.max(0, siblings.indexOf(element));
      animation?.cancel();
      animation = element.animate([
        { opacity: 0, transform: initialTransform(direction, distance) },
        { opacity: 1, transform: 'none' },
      ], {
        duration: Math.max(0, duration * 1000),
        delay: Math.max(0, (delay + index * staggerDelay) * 1000),
        easing: 'cubic-bezier(0.23, 1, 0.32, 1)',
        fill: 'backwards',
      });
      if (once) observer.unobserve(element);
    }, { threshold: Math.min(1, Math.max(0, amount)) });

    const onPreferenceChange = () => {
      if (preference.matches) {
        observer.disconnect();
        animation?.cancel();
      }
    };
    observer.observe(element);
    preference.addEventListener('change', onPreferenceChange);
    return () => {
      observer.disconnect();
      animation?.cancel();
      preference.removeEventListener('change', onPreferenceChange);
    };
  }, [direction, delay, duration, distance, once, amount, staggerDelay]);

  return ref;
}

export function AnimateOnScroll({
  children, direction = 'up', delay = 0, duration = 0.6, distance = 40,
  className = '', once = true, amount = 0.05,
}: AnimateOnScrollProps) {
  const ref = useScrollReveal({ direction, delay, duration, distance, once, amount });
  return <div ref={ref} className={className}>{children}</div>;
}

interface StaggerContainerProps {
  children: ReactNode;
  staggerDelay?: number;
  className?: string;
  once?: boolean;
  amount?: number;
}

const StaggerContext = createContext({ staggerDelay: 0, once: true, amount: 0.05 });

export function StaggerContainer({
  children, staggerDelay = 0.06, className = '', once = true, amount = 0.05,
}: StaggerContainerProps) {
  const policy = useMemo(() => ({ staggerDelay, once, amount }), [staggerDelay, once, amount]);
  return (
    <StaggerContext.Provider value={policy}>
      <div className={className}>{children}</div>
    </StaggerContext.Provider>
  );
}

interface StaggerItemProps {
  children: ReactNode;
  direction?: Direction;
  distance?: number;
  duration?: number;
  className?: string;
}

export function StaggerItem({
  children, direction = 'up', distance = 30, duration = 0.5, className = '',
}: StaggerItemProps) {
  const policy = useContext(StaggerContext);
  const ref = useScrollReveal({ direction, distance, duration, delay: 0, ...policy });
  return <div ref={ref} className={className}>{children}</div>;
}

interface CounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

// A statistic is content, so show its actual value in every rendering mode.
// Keep the duration prop in the public interface for existing callers.
export function Counter({ value, suffix = '', prefix = '', className = '' }: CounterProps) {
  return <span className={className}>{prefix}{value.toLocaleString('en-US')}{suffix}</span>;
}

// Retained for compatibility with callers using this exported transition map.
export const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};
