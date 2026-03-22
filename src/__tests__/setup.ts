import '@testing-library/jest-dom/vitest';
import React from 'react';

// Mock next/link
vi.mock('next/link', () => ({
  default: ({ children, href, ...props }: { children: React.ReactNode; href: string; [key: string]: unknown }) =>
    React.createElement('a', { href, ...props }, children),
}));

// Mock next/image
vi.mock('next/image', () => ({
  default: ({ src, alt, fill, priority, ...props }: { src: string; alt: string; fill?: boolean; priority?: boolean; [key: string]: unknown }) =>
    React.createElement('img', { src, alt, ...props }),
}));

// Mock framer-motion
vi.mock('framer-motion', () => {
  const createMotionComponent = (tag: string) =>
    React.forwardRef(({ children, initial, animate, exit, variants, transition, whileHover, whileInView, style, ...props }: Record<string, unknown>, ref: React.Ref<HTMLElement>) => {
      return React.createElement(tag, { ...props, ref, style }, children as React.ReactNode);
    });

  return {
    motion: new Proxy({} as Record<string, unknown>, {
      get: (_target: Record<string, unknown>, prop: string) => createMotionComponent(prop),
    }),
    AnimatePresence: ({ children }: { children: React.ReactNode }) => React.createElement(React.Fragment, null, children),
    useScroll: () => ({ scrollYProgress: { get: () => 0 } }),
    useTransform: () => '0%',
    useInView: () => true,
  };
});

// Mock IntersectionObserver
class MockIntersectionObserver {
  observe = vi.fn();
  unobserve = vi.fn();
  disconnect = vi.fn();
  root = null;
  rootMargin = '';
  thresholds = [0];
  takeRecords = vi.fn().mockReturnValue([]);
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  value: MockIntersectionObserver,
});

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] ?? null),
    setItem: vi.fn((key: string, value: string) => { store[key] = value; }),
    removeItem: vi.fn((key: string) => { delete store[key]; }),
    clear: vi.fn(() => { store = {}; }),
    get length() { return Object.keys(store).length; },
    key: vi.fn((i: number) => Object.keys(store)[i] ?? null),
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });
