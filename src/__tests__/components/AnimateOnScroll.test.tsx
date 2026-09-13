import { act, cleanup, render, screen } from '@testing-library/react';
import { renderToStaticMarkup } from 'react-dom/server';
import Link from 'next/link';
import { AnimateOnScroll, Counter, StaggerContainer, StaggerItem } from '@/components/ui/AnimateOnScroll';

const originalObserver = window.IntersectionObserver;
let intersection: (entries: { isIntersecting: boolean }[]) => void;
let cancel: ReturnType<typeof vi.fn>;
let animate: ReturnType<typeof vi.fn>;
let reducedMotion: boolean;
let preferenceChanged: () => void;

beforeEach(() => {
  reducedMotion = false;
  cancel = vi.fn();
  animate = vi.fn(() => ({ cancel }));
  Object.defineProperty(Element.prototype, 'animate', { configurable: true, value: animate });
  vi.stubGlobal('matchMedia', vi.fn(() => ({
    get matches() { return reducedMotion; },
    addEventListener: (_: string, callback: () => void) => { preferenceChanged = callback; },
    removeEventListener: vi.fn(),
  })));
  window.IntersectionObserver = class {
    constructor(callback: typeof intersection) { intersection = callback; }
    observe() {}
    unobserve() {}
    disconnect() {}
  } as unknown as typeof IntersectionObserver;
  vi.spyOn(Element.prototype, 'getBoundingClientRect').mockReturnValue({ top: 1500, bottom: 1700 } as DOMRect);
});

afterEach(() => {
  cleanup();
  window.IntersectionObserver = originalObserver;
  delete (Element.prototype as Partial<Element>).animate;
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe('progressive scroll enhancement', () => {
  it('server-renders visible content and the actual counter value', () => {
    const html = renderToStaticMarkup(
      <AnimateOnScroll><h1>Service areas</h1><StaggerContainer><StaggerItem><Link href="/locations/murrieta">Murrieta</Link></StaggerItem></StaggerContainer><Counter value={1250} suffix="+" /></AnimateOnScroll>,
    );
    expect(html).toContain('Service areas');
    expect(html).toContain('Murrieta');
    expect(html).toContain('1,250');
    expect(html).not.toMatch(/opacity|transform|visibility/);
  });

  it('leaves reduced-motion content visible without starting animation', () => {
    reducedMotion = true;
    render(<AnimateOnScroll><h1>Request a quote</h1></AnimateOnScroll>);
    expect(screen.getByRole('heading')).toBeVisible();
    expect(animate).not.toHaveBeenCalled();
  });

  it('never hides content that is already in view after hydration', () => {
    vi.mocked(Element.prototype.getBoundingClientRect).mockReturnValue({ top: 100, bottom: 300 } as DOMRect);
    render(<AnimateOnScroll><h1>Visible heading</h1></AnimateOnScroll>);
    expect(screen.getByRole('heading')).toBeVisible();
    expect(animate).not.toHaveBeenCalled();
  });

  it('enhances offscreen content only as it enters and cancels when motion preference changes', () => {
    render(<AnimateOnScroll direction="up"><h2>More services</h2></AnimateOnScroll>);
    expect(animate).not.toHaveBeenCalled();
    act(() => intersection([{ isIntersecting: true }]));
    expect(animate).toHaveBeenCalledTimes(1);
    expect(animate.mock.calls[0][0]).toEqual([{ opacity: 0, transform: 'translate3d(0, 40px, 0)' }, { opacity: 1, transform: 'none' }]);
    act(() => { reducedMotion = true; preferenceChanged(); });
    expect(cancel).toHaveBeenCalled();
    expect(screen.getByRole('heading')).toBeVisible();
  });

  it('retains a stagger delay for optional offscreen list reveals', () => {
    render(<StaggerContainer><StaggerItem>First area</StaggerItem><StaggerItem>Second area</StaggerItem></StaggerContainer>);
    act(() => intersection([{ isIntersecting: true }]));
    expect(animate.mock.calls[0][1].delay).toBe(60);
  });

  it('keeps content visible when Web Animations is unavailable', () => {
    delete (Element.prototype as Partial<Element>).animate;
    render(<AnimateOnScroll><p>Always readable</p></AnimateOnScroll>);
    expect(screen.getByText('Always readable')).toBeVisible();
  });
});
