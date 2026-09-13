'use client';

import { useId, useRef, useState, useSyncExternalStore, type FormEvent } from 'react';
import Link from 'next/link';
import { CheckCircle, Loader2, AlertCircle, Send } from 'lucide-react';
import { captureLeadAttribution } from '@/lib/analytics/attribution';
import { readEffectiveConsent } from '@/lib/analytics/consent';
import { trackLeadConversion } from '@/lib/analytics/conversion';
import { isValidEmail, TIMELINE_OPTIONS, TURF_ISSUES } from '@/lib/forms/lead-fields';

interface LeadFormProps {
  locationCity: string;
  locationSlug: string;
}

type Status = 'idle' | 'submitting' | 'success' | 'error';
const subscribeToHydration = () => () => {};

export default function LeadForm({ locationCity, locationSlug }: LeadFormProps) {
  const formId = useId();
  const isHydrated = useSyncExternalStore(subscribeToHydration, () => true, () => false);
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [consent, setConsent] = useState(false);
  const submitting = useRef(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting.current) return;
    setStatus('submitting');
    setErrorMsg('');

    const fd = new FormData(e.currentTarget);

    const body = {
      firstName: (fd.get('firstName') as string).trim(),
      lastName: (fd.get('lastName') as string).trim(),
      phone: (fd.get('phone') as string).trim(),
      email: (fd.get('email') as string).trim(),
      city: (fd.get('city') as string).trim(),
      turfIssues: fd.get('turfIssues') as string,
      timeline: fd.get('timeline') as string,
      consent: consent ? 'Yes' : 'No',
      locationSlug,
      locationCity,
      attribution: captureLeadAttribution(),
      analyticsConsent: readEffectiveConsent() === 'accepted',
    };

    // Basic validation
    if (!body.firstName || !body.lastName || !body.phone || !body.email || !body.city) {
      setStatus('error');
      setErrorMsg('Please fill in all required fields.');
      return;
    }
    if (!body.turfIssues) {
      setStatus('error');
      setErrorMsg('Please select what issues you have with your turf.');
      return;
    }
    if (!isValidEmail(body.email)) {
      setStatus('error');
      setErrorMsg('Please enter a valid email address.');
      return;
    }
    if (!body.timeline) {
      setStatus('error');
      setErrorMsg('Please select how soon you need service.');
      return;
    }

    try {
      submitting.current = true;
      const res = await fetch('/.netlify/functions/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Request failed (${res.status})`);
      }

      const result: unknown = await res.json();
      if (!result || typeof result !== 'object' || !('ok' in result) || result.ok !== true) {
        throw new Error('We could not confirm your quote request. Please call us directly.');
      }

      setStatus('success');
      try { trackLeadConversion('turf_cleaning', locationCity); } catch { /* Analytics must not turn an accepted lead into an error or retry. */ }
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    } finally {
      submitting.current = false;
    }
  }

  if (status === 'success') {
    return (
      <div role="status" className="bg-white rounded-2xl shadow-2xl p-8 sm:p-10 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-sage/15 mb-5">
          <CheckCircle className="w-8 h-8 text-sage" />
        </div>
        <h2 className="text-2xl font-bold text-charcoal font-heading mb-3">
          Quote Request Received!
        </h2>
        <p className="text-charcoal-light font-body leading-relaxed">
          Thanks! Our {locationCity} team will reach out shortly with your free quote.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      method="post"
      className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8"
      noValidate
    >
      <h2 className="text-xl font-bold text-charcoal font-heading mb-1 text-center">
        Get a Free Quote
      </h2>
      <p className="text-sm text-charcoal-light font-body mb-6 text-center">
        {locationCity}, CA &amp; surrounding areas
      </p>

      <noscript>
        <p className="mb-5 text-sm text-charcoal font-body">
          To request a quote, call the regional number on this page or{' '}
          <Link href="/locations" className="underline">find your service area</Link>.
          {' '}Enable JavaScript to use the online form.
        </p>
      </noscript>

      {/* Name row */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <label htmlFor={`${formId}-firstName`} className="block text-sm font-medium text-charcoal font-body mb-1">
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            id={`${formId}-firstName`}
            name="firstName"
            type="text"
            required
            autoComplete="given-name"
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm font-body text-charcoal focus:ring-2 focus:ring-sage focus:border-sage outline-none transition-colors"
          />
        </div>
        <div>
          <label htmlFor={`${formId}-lastName`} className="block text-sm font-medium text-charcoal font-body mb-1">
            Last Name <span className="text-red-500">*</span>
          </label>
          <input
            id={`${formId}-lastName`}
            name="lastName"
            type="text"
            required
            autoComplete="family-name"
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm font-body text-charcoal focus:ring-2 focus:ring-sage focus:border-sage outline-none transition-colors"
          />
        </div>
      </div>

      {/* Phone */}
      <div className="mb-3">
        <label htmlFor={`${formId}-phone`} className="block text-sm font-medium text-charcoal font-body mb-1">
          Phone <span className="text-red-500">*</span>
        </label>
        <input
          id={`${formId}-phone`}
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm font-body text-charcoal focus:ring-2 focus:ring-sage focus:border-sage outline-none transition-colors"
        />
      </div>

      {/* Email */}
      <div className="mb-3">
        <label htmlFor={`${formId}-email`} className="block text-sm font-medium text-charcoal font-body mb-1">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          id={`${formId}-email`}
          name="email"
          type="email"
          required
          autoComplete="email"
          className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm font-body text-charcoal focus:ring-2 focus:ring-sage focus:border-sage outline-none transition-colors"
        />
      </div>

      {/* City */}
      <div className="mb-3">
        <label htmlFor={`${formId}-city`} className="block text-sm font-medium text-charcoal font-body mb-1">
          City <span className="text-red-500">*</span>
        </label>
        <input
          id={`${formId}-city`}
          name="city"
          type="text"
          required
          autoComplete="address-level2"
          className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm font-body text-charcoal focus:ring-2 focus:ring-sage focus:border-sage outline-none transition-colors"
        />
      </div>

      {/* Turf Issues */}
      <div className="mb-3">
        <label htmlFor={`${formId}-turfIssues`} className="block text-sm font-medium text-charcoal font-body mb-1">
          Issues With Turf <span className="text-red-500">*</span>
        </label>
        <select
          id={`${formId}-turfIssues`}
          name="turfIssues"
          required
          defaultValue=""
          className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm font-body text-charcoal focus:ring-2 focus:ring-sage focus:border-sage outline-none transition-colors bg-white"
        >
          <option value="" disabled>Select an option</option>
          {TURF_ISSUES.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>

      {/* Timeline */}
      <div className="mb-4">
        <label htmlFor={`${formId}-timeline`} className="block text-sm font-medium text-charcoal font-body mb-1">
          How Soon Are You Looking To Get Service? <span className="text-red-500">*</span>
        </label>
        <select
          id={`${formId}-timeline`}
          name="timeline"
          required
          defaultValue=""
          className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm font-body text-charcoal focus:ring-2 focus:ring-sage focus:border-sage outline-none transition-colors bg-white"
        >
          <option value="" disabled>Select an option</option>
          {TIMELINE_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>

      {/* Consent */}
      <div className="mb-5">
        <label className="flex items-start gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-1 w-4 h-4 text-sage border-gray-300 rounded focus:ring-sage"
          />
          <span className="text-xs text-charcoal-light font-body leading-relaxed">
            By checking this box, I consent to receive communication from{' '}
            <strong className="text-charcoal">Murphy&apos;s Turf</strong> about{' '}
            <strong className="text-charcoal">your Turf Cleaning Quote</strong>.
          </span>
        </label>
      </div>

      {/* Error */}
      {status === 'error' && (
        <div role="alert" className="flex items-center gap-2 text-red-600 text-sm font-body mb-4 bg-red-50 rounded-lg px-3 py-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {errorMsg}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={!isHydrated || status === 'submitting'}
        className="w-full bg-sage hover:bg-sage-light disabled:bg-sage/60 text-forest-dark font-bold py-3 rounded-lg transition-colors font-body flex items-center justify-center gap-2 shadow-md"
      >
        {status === 'submitting' ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Submitting...
          </>
        ) : (
          <>
            <Send className="w-4 h-4" />
            Get Quote
          </>
        )}
      </button>
    </form>
  );
}
