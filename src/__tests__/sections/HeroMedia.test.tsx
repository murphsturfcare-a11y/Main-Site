import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { renderToStaticMarkup } from 'react-dom/server';
import HeroMedia from '@/components/sections/HeroMedia';

const originalObserver = window.IntersectionObserver;
const queries = new Map<string, { matches: boolean; listeners: Set<() => void> }>();
let onIntersection: (entries: { isIntersecting: boolean }[]) => void;
let paused = new WeakMap<HTMLMediaElement, boolean>();

function setQuery(query: string, matches: boolean) {
  const state = queries.get(query)!;
  state.matches = matches;
  state.listeners.forEach((listener) => listener());
}

beforeEach(() => {
  queries.clear();
  paused = new WeakMap();
  vi.stubGlobal('matchMedia', vi.fn((query: string) => {
    if (!queries.has(query)) queries.set(query, { matches: false, listeners: new Set() });
    const state = queries.get(query)!;
    return {
      get matches() { return state.matches; },
      addEventListener: (_: string, listener: () => void) => state.listeners.add(listener),
      removeEventListener: (_: string, listener: () => void) => state.listeners.delete(listener),
    };
  }));
  window.IntersectionObserver = class {
    constructor(callback: typeof onIntersection) { onIntersection = callback; }
    observe() {}
    disconnect() {}
  } as unknown as typeof IntersectionObserver;
  Object.defineProperty(navigator, 'connection', { configurable: true, value: undefined });
  vi.spyOn(document, 'readyState', 'get').mockReturnValue('complete');
  vi.spyOn(document, 'hidden', 'get').mockReturnValue(false);
  vi.spyOn(HTMLMediaElement.prototype, 'paused', 'get').mockImplementation(function (this: HTMLMediaElement) { return paused.get(this) ?? true; });
  vi.spyOn(HTMLMediaElement.prototype, 'play').mockImplementation(function (this: HTMLMediaElement) {
    paused.set(this, false);
    this.dispatchEvent(new Event('playing'));
    return Promise.resolve();
  });
  vi.spyOn(HTMLMediaElement.prototype, 'pause').mockImplementation(function (this: HTMLMediaElement) {
    paused.set(this, true);
    this.dispatchEvent(new Event('pause'));
  });
  vi.spyOn(HTMLMediaElement.prototype, 'load').mockImplementation(() => {});
});

afterEach(() => { cleanup(); window.IntersectionObserver = originalObserver; vi.restoreAllMocks(); vi.unstubAllGlobals(); });

describe('hero media loading policy', () => {
  it('renders a poster and no video source in server HTML', () => {
    const html = renderToStaticMarkup(<HeroMedia />);
    expect(html).toContain('/images/gallery/hero-poster.webp');
    expect(html.match(/<video[^>]*>/)?.[0]).not.toContain('src=');
    expect(html).not.toContain('<source');
    expect(html).not.toContain('<button');
  });

  it.each(['(prefers-reduced-motion: reduce)', '(max-width: 767px)'])('never attaches a video source for %s', (query) => {
    window.matchMedia(query);
    setQuery(query, true);
    const { container } = render(<HeroMedia />);
    expect(container.querySelector('video')).not.toHaveAttribute('src');
    expect(HTMLMediaElement.prototype.play).not.toHaveBeenCalled();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it.each([{ saveData: true }, { effectiveType: '3g' }])('keeps a static poster on a constrained connection (%j)', (policy) => {
    Object.defineProperty(navigator, 'connection', { configurable: true, value: Object.assign(new EventTarget(), policy) });
    const { container } = render(<HeroMedia />);
    expect(container.querySelector('video')).not.toHaveAttribute('src');
    expect(HTMLMediaElement.prototype.play).not.toHaveBeenCalled();
  });

  it('defers desktop loading until visible and retains a deliberate pause across scrolling', async () => {
    const { container } = render(<HeroMedia />);
    const video = container.querySelector('video')!;
    expect(video).not.toHaveAttribute('src');
    await act(async () => onIntersection([{ isIntersecting: true }]));
    expect(video).toHaveAttribute('src', '/images/gallery/hero-video-1280.mp4');
    fireEvent.click(screen.getByRole('button', { name: 'Pause background video' }));
    act(() => { onIntersection([{ isIntersecting: false }]); onIntersection([{ isIntersecting: true }]); });
    expect(HTMLMediaElement.prototype.play).toHaveBeenCalledTimes(1);
    fireEvent.click(screen.getByRole('button', { name: 'Play background video' }));
    expect(HTMLMediaElement.prototype.play).toHaveBeenCalledTimes(2);
  });

  it('keeps the poster when autoplay is blocked and allows explicit play', async () => {
    vi.mocked(HTMLMediaElement.prototype.play).mockRejectedValueOnce(new DOMException('Autoplay blocked', 'NotAllowedError'));
    const { container } = render(<HeroMedia />);
    await act(async () => onIntersection([{ isIntersecting: true }]));
    expect(container.querySelector('video')).toHaveClass('opacity-0');
    fireEvent.click(screen.getByRole('button', { name: 'Play background video' }));
    expect(screen.getByRole('button', { name: 'Pause background video' })).toBeInTheDocument();
  });

  it('unloads playback if reduced motion is enabled after the page loads', async () => {
    const { container } = render(<HeroMedia />);
    await act(async () => onIntersection([{ isIntersecting: true }]));
    expect(container.querySelector('video')).toHaveAttribute('src');
    act(() => setQuery('(prefers-reduced-motion: reduce)', true));
    expect(container.querySelector('video')).not.toHaveAttribute('src');
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
    expect(HTMLMediaElement.prototype.load).toHaveBeenCalled();
  });
});
