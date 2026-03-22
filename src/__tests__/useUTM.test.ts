import { renderHook, waitFor } from "@testing-library/react";
import { useSearchParams } from "next/navigation";
import { useUTM } from "@/hooks/useUTM";
import {
  parseUTMFromURL,
  storeUTMParams,
  getStoredUTMParams,
} from "@/lib/analytics/utm";

vi.mock("next/navigation", () => ({
  useSearchParams: vi.fn(),
}));

vi.mock("@/lib/analytics/utm", () => ({
  parseUTMFromURL: vi.fn(),
  storeUTMParams: vi.fn(),
  getStoredUTMParams: vi.fn(),
}));

const mockUseSearchParams = vi.mocked(useSearchParams);
const mockParseUTMFromURL = vi.mocked(parseUTMFromURL);
const mockStoreUTMParams = vi.mocked(storeUTMParams);
const mockGetStoredUTMParams = vi.mocked(getStoredUTMParams);

describe("useUTM", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("parses and stores UTM params when present in the URL", async () => {
    const searchParams = new URLSearchParams(
      "utm_source=google&utm_medium=cpc&utm_campaign=spring"
    );
    mockUseSearchParams.mockReturnValue(searchParams as any);

    const utmData = {
      utm_source: "google",
      utm_medium: "cpc",
      utm_campaign: "spring",
    };
    mockParseUTMFromURL.mockReturnValue(utmData);

    const { result } = renderHook(() => useUTM());

    await waitFor(() => {
      expect(result.current.utmParams).toEqual(utmData);
    });

    expect(mockParseUTMFromURL).toHaveBeenCalledWith(searchParams);
    expect(mockStoreUTMParams).toHaveBeenCalledWith(utmData);
    expect(result.current.hasUTM).toBe(true);
  });

  it("falls back to stored UTM params when URL has none", async () => {
    const searchParams = new URLSearchParams("");
    mockUseSearchParams.mockReturnValue(searchParams as any);
    mockParseUTMFromURL.mockReturnValue(null);

    const storedData = {
      utm_source: "newsletter",
      utm_medium: "email",
      utm_campaign: "fall",
    };
    mockGetStoredUTMParams.mockReturnValue(storedData);

    const { result } = renderHook(() => useUTM());

    await waitFor(() => {
      expect(result.current.utmParams).toEqual(storedData);
    });

    expect(mockGetStoredUTMParams).toHaveBeenCalled();
    expect(mockStoreUTMParams).not.toHaveBeenCalled();
    expect(result.current.hasUTM).toBe(true);
  });

  it("returns hasUTM false when no UTM params exist anywhere", async () => {
    const searchParams = new URLSearchParams("");
    mockUseSearchParams.mockReturnValue(searchParams as any);
    mockParseUTMFromURL.mockReturnValue(null);
    mockGetStoredUTMParams.mockReturnValue(null);

    const { result } = renderHook(() => useUTM());

    await waitFor(() => {
      expect(result.current.utmParams).toBeNull();
    });

    expect(result.current.hasUTM).toBe(false);
  });

  it("returns hasUTM true when utmParams is not null", async () => {
    const searchParams = new URLSearchParams("utm_source=facebook");
    mockUseSearchParams.mockReturnValue(searchParams as any);

    const utmData = { utm_source: "facebook" };
    mockParseUTMFromURL.mockReturnValue(utmData);

    const { result } = renderHook(() => useUTM());

    await waitFor(() => {
      expect(result.current.utmParams).toEqual(utmData);
    });

    expect(result.current.hasUTM).toBe(true);
  });
});
