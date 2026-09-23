import { act, cleanup, fireEvent, render, screen } from '@testing-library/react';
import { renderToStaticMarkup } from 'react-dom/server';
import WorkClip from '@/components/sections/WorkClip';

const CLIP = '/images/gallery/turf-grooming-clip.mp4';
const POSTER = '/images/gallery/turf-grooming-poster.webp';
const LABEL = 'Power brooming a residential artificial turf lawn';

const originalObserver = window.IntersectionObserver;
const queries = new Map<string, { matches: boolean; listeners: Set<() => void> }>();
let onIntersection: (entries: { isIntersecting: boolean }[]) => void;
let paused = new WeakMap<HTMLMediaElement, boolean>();

function setQuery(query: string, matches: boolean) {
  const state = queries.get(query)!;
  state.matches = matches;
  state.listeners.forEach((listener) => listener());
}

const clip = () => <WorkClip src={CLIP} poster={POSTER} label={LABEL} />;

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

describe('work clip loading policy', () => {
  it('serves a described poster and no video source in server HTML', () => {
    const html = renderToStaticMarkup(clip());
    expect(html).toContain('turf-grooming-poster');
    expect(html).toContain(LABEL);
    expect(html.match(/<video[^>]*>/)?.[0]).not.toContain('src=');
    expect(html.match(/<video[^>]*>/)?.[0]).toContain('preload="none"');
    expect(html).not.toContain('<source');
    expect(html).not.toContain('<button');
  });

  it.each(['(prefers-reduced-motion: reduce)', '(max-width: 767px)'])('never attaches a video source for %s', (query) => {
    window.matchMedia(query);
    setQuery(query, true);
    const { container } = render(clip());
    expect(container.querySelector('video')).not.toHaveAttribute('src');
    expect(HTMLMediaElement.prototype.play).not.toHaveBeenCalled();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });

  it.each([{ saveData: true }, { effectiveType: '3g' }])('keeps a static poster on a constrained connection (%j)', (policy) => {
    Object.defineProperty(navigator, 'connection', { configurable: true, value: Object.assign(new EventTarget(), policy) });
    const { container } = render(clip());
    expect(container.querySelector('video')).not.toHaveAttribute('src');
    expect(HTMLMediaElement.prototype.play).not.toHaveBeenCalled();
  });

  it('loads only once scrolled into view and honours a deliberate pause', async () => {
    const { container } = render(clip());
    const video = container.querySelector('video')!;
    expect(video).not.toHaveAttribute('src');
    await act(async () => onIntersection([{ isIntersecting: true }]));
    expect(video).toHaveAttribute('src', CLIP);
    fireEvent.click(screen.getByRole('button', { name: `Pause video: ${LABEL}` }));
    act(() => { onIntersection([{ isIntersecting: false }]); onIntersection([{ isIntersecting: true }]); });
    expect(HTMLMediaElement.prototype.play).toHaveBeenCalledTimes(1);
    fireEvent.click(screen.getByRole('button', { name: `Play video: ${LABEL}` }));
    expect(HTMLMediaElement.prototype.play).toHaveBeenCalledTimes(2);
  });

  it('plays silently and on a loop, never announcing itself twice', async () => {
    const { container } = render(clip());
    await act(async () => onIntersection([{ isIntersecting: true }]));
    const video = container.querySelector('video')!;
    expect(video).toHaveAttribute('loop');
    expect(video).toHaveAttribute('aria-hidden', 'true');
    expect((video as HTMLVideoElement).muted).toBe(true);
    // The poster image carries the description; the video must not repeat it.
    expect(screen.getAllByAltText(LABEL)).toHaveLength(1);
  });
});
