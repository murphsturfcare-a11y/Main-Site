import * as gtag from "./gtag";
import { readEffectiveConsent } from './consent';

function pushToDataLayer(event: string, data: Record<string, unknown>): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...data });
}

export function trackLeadConversion(serviceType: string, location?: string): void {
  if (readEffectiveConsent() !== 'accepted') return;
  gtag.event("generate_lead", {
    service_type: serviceType,
    location: location ?? "",
  });

  pushToDataLayer("lead_conversion", {
    service_type: serviceType,
    location: location ?? "",
  });
}

export function trackContactConversion(): void {
  gtag.event("contact_form_submission", {
    value: 1,
    currency: "USD",
  });

  pushToDataLayer("contact_conversion", {});
}

export function trackNewsletterConversion(): void {
  gtag.event("newsletter_signup", {
    value: 0.5,
    currency: "USD",
  });

  pushToDataLayer("newsletter_conversion", {});
}

export function trackQuoteRequest(serviceType: string): void {
  gtag.event("quote_request", {
    service_type: serviceType,
    value: 5,
    currency: "USD",
  });

  pushToDataLayer("quote_request", {
    service_type: serviceType,
  });
}
