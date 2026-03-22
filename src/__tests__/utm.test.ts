import {
  parseUTMFromURL,
  storeUTMParams,
  getStoredUTMParams,
  appendUTMToFormData,
} from "@/lib/analytics/utm";
import type { UTMParams } from "@/lib/analytics/utm";

beforeEach(() => {
  sessionStorage.clear();
});

describe("parseUTMFromURL", () => {
  it("returns null when no UTM params are present", () => {
    const params = new URLSearchParams("");
    expect(parseUTMFromURL(params)).toBeNull();
  });

  it("returns UTMParams when utm_source is present", () => {
    const params = new URLSearchParams("utm_source=google");
    const result = parseUTMFromURL(params);
    expect(result).not.toBeNull();
    expect(result!.source).toBe("google");
  });

  it("returns UTMParams when utm_medium is present", () => {
    const params = new URLSearchParams("utm_medium=cpc");
    const result = parseUTMFromURL(params);
    expect(result).not.toBeNull();
    expect(result!.medium).toBe("cpc");
  });

  it("returns UTMParams when utm_campaign is present", () => {
    const params = new URLSearchParams("utm_campaign=spring_sale");
    const result = parseUTMFromURL(params);
    expect(result).not.toBeNull();
    expect(result!.campaign).toBe("spring_sale");
  });

  it("fills missing params with empty strings", () => {
    const params = new URLSearchParams("utm_source=google");
    const result = parseUTMFromURL(params)!;
    expect(result.medium).toBe("");
    expect(result.campaign).toBe("");
    expect(result.term).toBe("");
    expect(result.content).toBe("");
  });

  it("returns null when only utm_term or utm_content are present", () => {
    const termOnly = new URLSearchParams("utm_term=keyword");
    expect(parseUTMFromURL(termOnly)).toBeNull();

    const contentOnly = new URLSearchParams("utm_content=banner");
    expect(parseUTMFromURL(contentOnly)).toBeNull();

    const both = new URLSearchParams("utm_term=keyword&utm_content=banner");
    expect(parseUTMFromURL(both)).toBeNull();
  });
});

describe("storeUTMParams", () => {
  it("stores params in sessionStorage", () => {
    const utm: UTMParams = {
      source: "google",
      medium: "cpc",
      campaign: "spring",
      term: "turf",
      content: "ad1",
    };

    storeUTMParams(utm);

    const stored = sessionStorage.getItem("murphys_turf_utm");
    expect(stored).not.toBeNull();
    expect(JSON.parse(stored!)).toEqual(utm);
  });
});

describe("getStoredUTMParams", () => {
  it("returns null when nothing is stored", () => {
    expect(getStoredUTMParams()).toBeNull();
  });

  it("returns parsed params when stored", () => {
    const utm: UTMParams = {
      source: "facebook",
      medium: "social",
      campaign: "summer",
      term: "",
      content: "post",
    };

    sessionStorage.setItem("murphys_turf_utm", JSON.stringify(utm));
    expect(getStoredUTMParams()).toEqual(utm);
  });

  it("returns null for invalid JSON", () => {
    sessionStorage.setItem("murphys_turf_utm", "not-valid-json{");
    expect(getStoredUTMParams()).toBeNull();
  });
});

describe("appendUTMToFormData", () => {
  it("returns original formData when no UTM is stored", () => {
    const formData = { name: "John", email: "john@example.com" };
    expect(appendUTMToFormData(formData)).toEqual(formData);
  });

  it("appends UTM params to formData when stored", () => {
    const utm: UTMParams = {
      source: "google",
      medium: "cpc",
      campaign: "spring",
      term: "turf",
      content: "ad1",
    };

    sessionStorage.setItem("murphys_turf_utm", JSON.stringify(utm));

    const formData = { name: "John", email: "john@example.com" };
    const result = appendUTMToFormData(formData);

    expect(result).toEqual({
      name: "John",
      email: "john@example.com",
      utm_source: "google",
      utm_medium: "cpc",
      utm_campaign: "spring",
      utm_term: "turf",
      utm_content: "ad1",
    });
  });
});
