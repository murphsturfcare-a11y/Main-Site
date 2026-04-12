'use client';

import { useState, type FormEvent } from 'react';
import { CheckCircle, Loader2, AlertCircle, Send } from 'lucide-react';

interface LeadFormProps {
  locationCity: string;
  locationSlug: string;
}

type Status = 'idle' | 'submitting' | 'success' | 'error';

const TURF_ISSUES = [
  'Pet Odor',
  'Matted/Flat Turf',
  'General Cleaning Needed',
  'All of The Above',
  'Other',
] as const;

const TIMELINE_OPTIONS = [
  'As soon as possible',
  'Within the next week',
  'Within the next month',
  'Just browsing',
] as const;

export default function LeadForm({ locationCity, locationSlug }: LeadFormProps) {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [consent, setConsent] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
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
    if (!body.timeline) {
      setStatus('error');
      setErrorMsg('Please select how soon you need service.');
      return;
    }

    try {
      const res = await fetch('/.netlify/functions/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `Request failed (${res.status})`);
      }

      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-white rounded-2xl shadow-2xl p-8 sm:p-10 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-sage/15 mb-5">
          <CheckCircle className="w-8 h-8 text-sage" />
        </div>
        <h3 className="text-2xl font-bold text-charcoal font-heading mb-3">
          Quote Request Received!
        </h3>
        <p className="text-charcoal-light font-body leading-relaxed">
          Thanks! Our {locationCity} team will reach out shortly with your free quote.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8"
      noValidate
    >
      <h3 className="text-xl font-bold text-charcoal font-heading mb-1 text-center">
        Get a Free Quote
      </h3>
      <p className="text-sm text-charcoal-light font-body mb-6 text-center">
        {locationCity}, CA &amp; surrounding areas
      </p>

      {/* Name row */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div>
          <label htmlFor="lf-firstName" className="block text-sm font-medium text-charcoal font-body mb-1">
            First Name <span className="text-red-500">*</span>
          </label>
          <input
            id="lf-firstName"
            name="firstName"
            type="text"
            required
            autoComplete="given-name"
            className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm font-body text-charcoal focus:ring-2 focus:ring-sage focus:border-sage outline-none transition-colors"
          />
        </div>
        <div>
          <label htmlFor="lf-lastName" className="block text-sm font-medium text-charcoal font-body mb-1">
            Last Name <span className="text-red-500">*</span>
          </label>
          <input
            id="lf-lastName"
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
        <label htmlFor="lf-phone" className="block text-sm font-medium text-charcoal font-body mb-1">
          Phone <span className="text-red-500">*</span>
        </label>
        <input
          id="lf-phone"
          name="phone"
          type="tel"
          required
          autoComplete="tel"
          className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm font-body text-charcoal focus:ring-2 focus:ring-sage focus:border-sage outline-none transition-colors"
        />
      </div>

      {/* Email */}
      <div className="mb-3">
        <label htmlFor="lf-email" className="block text-sm font-medium text-charcoal font-body mb-1">
          Email <span className="text-red-500">*</span>
        </label>
        <input
          id="lf-email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm font-body text-charcoal focus:ring-2 focus:ring-sage focus:border-sage outline-none transition-colors"
        />
      </div>

      {/* City */}
      <div className="mb-3">
        <label htmlFor="lf-city" className="block text-sm font-medium text-charcoal font-body mb-1">
          City <span className="text-red-500">*</span>
        </label>
        <input
          id="lf-city"
          name="city"
          type="text"
          required
          autoComplete="address-level2"
          className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm font-body text-charcoal focus:ring-2 focus:ring-sage focus:border-sage outline-none transition-colors"
        />
      </div>

      {/* Turf Issues */}
      <div className="mb-3">
        <label htmlFor="lf-turfIssues" className="block text-sm font-medium text-charcoal font-body mb-1">
          Issues With Turf <span className="text-red-500">*</span>
        </label>
        <select
          id="lf-turfIssues"
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
        <label htmlFor="lf-timeline" className="block text-sm font-medium text-charcoal font-body mb-1">
          How Soon Are You Looking To Get Service? <span className="text-red-500">*</span>
        </label>
        <select
          id="lf-timeline"
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
        <div className="flex items-center gap-2 text-red-600 text-sm font-body mb-4 bg-red-50 rounded-lg px-3 py-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          {errorMsg}
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={status === 'submitting'}
        className="w-full bg-sage hover:bg-sage-dark disabled:bg-sage/60 text-white font-bold py-3 rounded-lg transition-colors font-body flex items-center justify-center gap-2 shadow-md"
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
