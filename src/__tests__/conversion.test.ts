import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import * as gtag from "@/lib/analytics/gtag";
import { CONSENT_KEY } from '@/lib/analytics/consent';
import {
  trackLeadConversion,
  trackContactConversion,
  trackNewsletterConversion,
  trackQuoteRequest,
} from "@/lib/analytics/conversion";

vi.mock("@/lib/analytics/gtag");

describe("conversion tracking module", () => {
  beforeEach(() => {
    delete window.murphysConsentChoice;
    window.dataLayer = [];
    localStorage.setItem(CONSENT_KEY, 'accepted');
  });

  afterEach(() => {
    // @ts-expect-error cleaning up dataLayer
    delete window.dataLayer;
    vi.clearAllMocks();
  });

  describe("trackLeadConversion", () => {
    it("calls gtag.event with correct params including location", () => {
      trackLeadConversion("turf_cleaning", "Dublin");

      expect(gtag.event).toHaveBeenCalledWith("generate_lead", {
        service_type: "turf_cleaning",
        location: "Dublin",
      });
    });

    it("pushes lead_conversion event to dataLayer with location", () => {
      trackLeadConversion("turf_cleaning", "Dublin");

      expect(window.dataLayer).toContainEqual({
        event: "lead_conversion",
        service_type: "turf_cleaning",
        location: "Dublin",
      });
    });

    it("defaults location to empty string when not provided", () => {
      trackLeadConversion("turf_cleaning");

      expect(gtag.event).toHaveBeenCalledWith("generate_lead", {
        service_type: "turf_cleaning",
        location: "",
      });

      expect(window.dataLayer).toContainEqual({
        event: "lead_conversion",
        service_type: "turf_cleaning",
        location: "",
      });
    });
  });

  it('does not emit lead conversions without analytics consent', () => {
    localStorage.setItem(CONSENT_KEY, 'declined');
    trackLeadConversion('turf_cleaning', 'Palm Desert');
    expect(gtag.event).not.toHaveBeenCalled();
    expect(window.dataLayer).toEqual([]);
  });

  describe("trackContactConversion", () => {
    it("calls gtag.event with contact_form_submission", () => {
      trackContactConversion();

      expect(gtag.event).toHaveBeenCalledWith("contact_form_submission", {
        value: 1,
        currency: "USD",
      });
    });

    it("pushes contact_conversion event to dataLayer", () => {
      trackContactConversion();

      expect(window.dataLayer).toContainEqual({
        event: "contact_conversion",
      });
    });
  });

  describe("trackNewsletterConversion", () => {
    it("calls gtag.event with newsletter_signup and value 0.5", () => {
      trackNewsletterConversion();

      expect(gtag.event).toHaveBeenCalledWith("newsletter_signup", {
        value: 0.5,
        currency: "USD",
      });
    });

    it("pushes newsletter_conversion event to dataLayer", () => {
      trackNewsletterConversion();

      expect(window.dataLayer).toContainEqual({
        event: "newsletter_conversion",
      });
    });
  });

  describe("trackQuoteRequest", () => {
    it("calls gtag.event with quote_request and serviceType", () => {
      trackQuoteRequest("turf_cleaning");

      expect(gtag.event).toHaveBeenCalledWith("quote_request", {
        service_type: "turf_cleaning",
        value: 5,
        currency: "USD",
      });
    });

    it("pushes quote_request event to dataLayer with serviceType", () => {
      trackQuoteRequest("turf_cleaning");

      expect(window.dataLayer).toContainEqual({
        event: "quote_request",
        service_type: "turf_cleaning",
      });
    });
  });
});
