import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import {
  GA_MEASUREMENT_ID,
  pageview,
  event,
  trackFormSubmission,
  trackCTAClick,
  trackPhoneCall,
  trackServicePageView,
  trackLocationPageView,
  trackScrollDepth,
} from "@/lib/analytics/gtag";

describe("gtag analytics module", () => {
  beforeEach(() => {
    window.gtag = vi.fn();
  });

  afterEach(() => {
    // @ts-expect-error cleaning up mock
    delete window.gtag;
  });

  describe("pageview", () => {
    it("calls window.gtag with config and page_path", () => {
      pageview("/about");

      expect(window.gtag).toHaveBeenCalledWith("config", GA_MEASUREMENT_ID, {
        page_path: "/about",
      });
    });

    it("does not throw when window.gtag is undefined", () => {
      // @ts-expect-error removing gtag to test guard
      delete window.gtag;

      expect(() => pageview("/about")).not.toThrow();
    });
  });

  describe("event", () => {
    it("calls window.gtag with event action and params", () => {
      event("signup", { method: "email" });

      expect(window.gtag).toHaveBeenCalledWith("event", "signup", {
        method: "email",
      });
    });

    it("does not throw when window.gtag is undefined", () => {
      // @ts-expect-error removing gtag to test guard
      delete window.gtag;

      expect(() => event("signup", { method: "email" })).not.toThrow();
    });
  });

  describe("trackFormSubmission", () => {
    it("fires a form_submission event with correct params", () => {
      trackFormSubmission("contact", "homepage");

      expect(window.gtag).toHaveBeenCalledWith("event", "form_submission", {
        form_name: "contact",
        form_location: "homepage",
      });
    });
  });

  describe("trackCTAClick", () => {
    it("fires a cta_click event with correct params", () => {
      trackCTAClick("get_quote", "hero_section");

      expect(window.gtag).toHaveBeenCalledWith("event", "cta_click", {
        cta_name: "get_quote",
        cta_location: "hero_section",
      });
    });
  });

  describe("trackPhoneCall", () => {
    it("fires a phone_call event with the phone number", () => {
      trackPhoneCall("555-123-4567");

      expect(window.gtag).toHaveBeenCalledWith("event", "phone_call", {
        phone_number: "555-123-4567",
      });
    });
  });

  describe("trackServicePageView", () => {
    it("fires a service_page_view event with the service name", () => {
      trackServicePageView("turf_cleaning");

      expect(window.gtag).toHaveBeenCalledWith("event", "service_page_view", {
        service_name: "turf_cleaning",
      });
    });
  });

  describe("trackLocationPageView", () => {
    it("fires a location_page_view event with the location name", () => {
      trackLocationPageView("phoenix");

      expect(window.gtag).toHaveBeenCalledWith("event", "location_page_view", {
        location_name: "phoenix",
      });
    });
  });

  describe("trackScrollDepth", () => {
    it("fires a scroll_depth event with the depth percentage", () => {
      trackScrollDepth(75);

      expect(window.gtag).toHaveBeenCalledWith("event", "scroll_depth", {
        depth_percentage: 75,
      });
    });
  });
});
