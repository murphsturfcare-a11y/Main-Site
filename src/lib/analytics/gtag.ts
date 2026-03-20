export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID as string;

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: Record<string, any>[];
  }
}

export function pageview(url: string): void {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("config", GA_MEASUREMENT_ID, {
    page_path: url,
  });
}

export function event(action: string, params: Record<string, any>): void {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", action, params);
}

export function trackFormSubmission(formName: string, formLocation: string): void {
  event("form_submission", {
    form_name: formName,
    form_location: formLocation,
  });
}

export function trackCTAClick(ctaName: string, ctaLocation: string): void {
  event("cta_click", {
    cta_name: ctaName,
    cta_location: ctaLocation,
  });
}

export function trackPhoneCall(phoneNumber: string): void {
  event("phone_call", {
    phone_number: phoneNumber,
  });
}

export function trackServicePageView(serviceName: string): void {
  event("service_page_view", {
    service_name: serviceName,
  });
}

export function trackLocationPageView(locationName: string): void {
  event("location_page_view", {
    location_name: locationName,
  });
}

export function trackScrollDepth(percentage: number): void {
  event("scroll_depth", {
    depth_percentage: percentage,
  });
}
