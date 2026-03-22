import { renderHook, act } from "@testing-library/react";
import { useScrollDepth } from "@/hooks/useScrollDepth";
import { trackScrollDepth } from "@/lib/analytics/gtag";

vi.mock("@/lib/analytics/gtag", () => ({
  trackScrollDepth: vi.fn(),
}));

const mockTrackScrollDepth = vi.mocked(trackScrollDepth);

function simulateScroll(scrollY: number, scrollHeight: number, innerHeight: number) {
  Object.defineProperty(window, "scrollY", { value: scrollY, writable: true });
  Object.defineProperty(window, "innerHeight", { value: innerHeight, writable: true });
  Object.defineProperty(document.documentElement, "scrollHeight", {
    value: scrollHeight,
    writable: true,
    configurable: true,
  });
  window.dispatchEvent(new Event("scroll"));
}

describe("useScrollDepth", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("registers a scroll event listener on mount", () => {
    const addSpy = vi.spyOn(window, "addEventListener");

    renderHook(() => useScrollDepth());

    expect(addSpy).toHaveBeenCalledWith("scroll", expect.any(Function), {
      passive: true,
    });

    addSpy.mockRestore();
  });

  it("calls trackScrollDepth for each milestone when scrolled past it", () => {
    renderHook(() => useScrollDepth());

    // scrollHeight=1000, innerHeight=0 => denominator=1000
    // scrollY=250 => 25%, scrollY=500 => 50%, scrollY=750 => 75%, scrollY=1000 => 100%

    act(() => {
      simulateScroll(250, 1000, 0);
    });
    expect(mockTrackScrollDepth).toHaveBeenCalledWith(25);
    expect(mockTrackScrollDepth).toHaveBeenCalledTimes(1);

    act(() => {
      simulateScroll(500, 1000, 0);
    });
    expect(mockTrackScrollDepth).toHaveBeenCalledWith(50);
    expect(mockTrackScrollDepth).toHaveBeenCalledTimes(2);

    act(() => {
      simulateScroll(750, 1000, 0);
    });
    expect(mockTrackScrollDepth).toHaveBeenCalledWith(75);
    expect(mockTrackScrollDepth).toHaveBeenCalledTimes(3);

    act(() => {
      simulateScroll(1000, 1000, 0);
    });
    expect(mockTrackScrollDepth).toHaveBeenCalledWith(100);
    expect(mockTrackScrollDepth).toHaveBeenCalledTimes(4);
  });

  it("fires each milestone only once per mount", () => {
    renderHook(() => useScrollDepth());

    // Scroll to 50% twice
    act(() => {
      simulateScroll(500, 1000, 0);
    });
    act(() => {
      simulateScroll(500, 1000, 0);
    });

    // 25 and 50 should each fire exactly once (scrollY=500 triggers both 25 and 50)
    const calls = mockTrackScrollDepth.mock.calls.flat();
    expect(calls.filter((m) => m === 25)).toHaveLength(1);
    expect(calls.filter((m) => m === 50)).toHaveLength(1);
  });

  it("does not call trackScrollDepth when scrollHeight <= innerHeight", () => {
    renderHook(() => useScrollDepth());

    act(() => {
      simulateScroll(0, 800, 800);
    });

    expect(mockTrackScrollDepth).not.toHaveBeenCalled();
  });

  it("removes the scroll event listener on unmount", () => {
    const removeSpy = vi.spyOn(window, "removeEventListener");

    const { unmount } = renderHook(() => useScrollDepth());
    unmount();

    expect(removeSpy).toHaveBeenCalledWith("scroll", expect.any(Function));

    removeSpy.mockRestore();
  });
});
