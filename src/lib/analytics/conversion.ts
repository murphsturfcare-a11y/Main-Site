import * as gtag from "./gtag";

function pushToDataLayer(event: string, data: Record<string, any>): void {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...data });
}

export function trackLeadConversion(serviceType: string, location?: string): void {
  gtag.event("generate_lead", {
    service_type: serviceType,
    location: location ?? "",
    value: 1,
    currency: "EUR",
  });

  pushToDataLayer("lead_conversion", {
    service_type: serviceType,
    location: location ?? "",
  });
}

export function trackContactConversion(): void {
  gtag.event("contact_form_submission", {
    value: 1,
    currency: "EUR",
  });

  pushToDataLayer("contact_conversion", {});
}

export function trackNewsletterConversion(): void {
  gtag.event("newsletter_signup", {
    value: 0.5,
    currency: "EUR",
  });

  pushToDataLayer("newsletter_conversion", {});
}

export function trackQuoteRequest(serviceType: string): void {
  gtag.event("quote_request", {
    service_type: serviceType,
    value: 5,
    currency: "EUR",
  });

  pushToDataLayer("quote_request", {
    service_type: serviceType,
  });
}
