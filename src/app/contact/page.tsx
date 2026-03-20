'use client';

import { useState, type FormEvent } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  ClipboardList,
  MessageCircle,
  CalendarCheck,
  AlertCircle,
} from 'lucide-react';

export default function ContactPage() {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormStatus('submitting');

    // Simulate form submission
    setTimeout(() => {
      setFormStatus('success');
    }, 1500);
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-forest via-forest-light to-sage py-20 sm:py-28">
        <div className="absolute inset-0 bg-[url('/images/grass-pattern.svg')] opacity-5" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white font-heading tracking-tight mb-4">
            Get In Touch
          </h1>
          <p className="text-lg sm:text-xl text-white/90 font-body max-w-2xl mx-auto leading-relaxed">
            Ready for a healthier, greener lawn? Reach out for a{' '}
            <span className="font-semibold text-cream">free quote</span> and let our experts
            take care of the rest.
          </p>
        </div>
      </section>

      {/* Contact Form + Info Section */}
      <section className="py-16 sm:py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            {/* LEFT: Contact Form */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-10">
                <h2 className="text-2xl sm:text-3xl font-bold text-forest font-heading mb-2">
                  Send Us a Message
                </h2>
                <p className="text-charcoal-light font-body mb-8">
                  Fill out the form below and we&apos;ll get back to you within 24 hours.
                </p>

                {formStatus === 'success' ? (
                  <div className="text-center py-16">
                    <div className="w-16 h-16 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CalendarCheck className="w-8 h-8 text-sage" />
                    </div>
                    <h3 className="text-2xl font-bold text-forest font-heading mb-3">
                      Message Sent!
                    </h3>
                    <p className="text-charcoal-light font-body max-w-md mx-auto mb-6">
                      Thank you for reaching out. A member of our team will contact you within 24
                      hours to discuss your lawn care needs.
                    </p>
                    <button
                      type="button"
                      onClick={() => setFormStatus('idle')}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-forest text-white font-semibold font-body rounded-lg hover:bg-forest-light transition-colors"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6" noValidate={false}>
                    {/* Full Name */}
                    <div>
                      <label
                        htmlFor="fullName"
                        className="block text-sm font-semibold text-charcoal font-body mb-1.5"
                      >
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        required
                        autoComplete="name"
                        placeholder="John Murphy"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg font-body text-charcoal placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent transition-shadow"
                      />
                    </div>

                    {/* Email + Phone Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-semibold text-charcoal font-body mb-1.5"
                        >
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          autoComplete="email"
                          placeholder="john@example.com"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg font-body text-charcoal placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent transition-shadow"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-sm font-semibold text-charcoal font-body mb-1.5"
                        >
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          autoComplete="tel"
                          placeholder="(951) 331-3300"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg font-body text-charcoal placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent transition-shadow"
                        />
                      </div>
                    </div>

                    {/* Subject + Service Interest Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="subject"
                          className="block text-sm font-semibold text-charcoal font-body mb-1.5"
                        >
                          Subject
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          defaultValue=""
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg font-body text-charcoal bg-white focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent transition-shadow appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Cpath%20fill%3D%22%23424242%22%20d%3D%22M6%208L1%203h10z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px] bg-[right_16px_center] bg-no-repeat"
                        >
                          <option value="" disabled>
                            Select a subject
                          </option>
                          <option value="general">General Inquiry</option>
                          <option value="quote">Request a Quote</option>
                          <option value="schedule">Schedule Service</option>
                          <option value="billing">Billing Question</option>
                          <option value="feedback">Feedback</option>
                        </select>
                      </div>
                      <div>
                        <label
                          htmlFor="serviceInterest"
                          className="block text-sm font-semibold text-charcoal font-body mb-1.5"
                        >
                          Service Interest
                        </label>
                        <select
                          id="serviceInterest"
                          name="serviceInterest"
                          defaultValue=""
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg font-body text-charcoal bg-white focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent transition-shadow appearance-none bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20viewBox%3D%220%200%2012%2012%22%3E%3Cpath%20fill%3D%22%23424242%22%20d%3D%22M6%208L1%203h10z%22%2F%3E%3C%2Fsvg%3E')] bg-[length:12px] bg-[right_16px_center] bg-no-repeat"
                        >
                          <option value="" disabled>
                            Select a service
                          </option>
                          <option value="lawn-cleaning">Lawn Cleaning</option>
                          <option value="aeration">Aeration</option>
                          <option value="seeding">Seeding</option>
                          <option value="fertilization">Fertilization</option>
                          <option value="pest-control">Pest Control</option>
                          <option value="seasonal-maintenance">Seasonal Maintenance</option>
                          <option value="not-sure">Not Sure</option>
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-semibold text-charcoal font-body mb-1.5"
                      >
                        Message <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        placeholder="Tell us about your lawn care needs, property size, or any questions you have..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg font-body text-charcoal placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent transition-shadow resize-y"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={formStatus === 'submitting'}
                      className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-sage text-white font-bold font-body text-lg rounded-lg hover:bg-sage-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage transition-colors disabled:opacity-70 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
                    >
                      {formStatus === 'submitting' ? (
                        <>
                          <svg
                            className="animate-spin h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            />
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* RIGHT: Contact Info Cards */}
            <div className="lg:col-span-2 space-y-6">
              {/* Phone Card */}
              <a
                href="tel:+19513313300"
                className="block bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl hover:-translate-y-0.5 transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-sage/15 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-sage/25 transition-colors">
                    <Phone className="w-6 h-6 text-sage" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-charcoal-light font-body uppercase tracking-wide mb-1">
                      Phone
                    </h3>
                    <p className="text-lg font-bold text-forest font-heading group-hover:text-sage-dark transition-colors">
                      (951) 331-3300
                    </p>
                    <p className="text-sm text-charcoal-light font-body mt-0.5">
                      Tap to call us directly
                    </p>
                  </div>
                </div>
              </a>

              {/* Email Card */}
              <a
                href="mailto:info@murphysturfcare.com"
                className="block bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl hover:-translate-y-0.5 transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-sage/15 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-sage/25 transition-colors">
                    <Mail className="w-6 h-6 text-sage" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-charcoal-light font-body uppercase tracking-wide mb-1">
                      Email
                    </h3>
                    <p className="text-lg font-bold text-forest font-heading group-hover:text-sage-dark transition-colors">
                      info@murphysturfcare.com
                    </p>
                    <p className="text-sm text-charcoal-light font-body mt-0.5">
                      We reply within 24 hours
                    </p>
                  </div>
                </div>
              </a>

              {/* Address Card */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-sage/15 rounded-xl flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-sage" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-charcoal-light font-body uppercase tracking-wide mb-1">
                      Address
                    </h3>
                    <p className="text-lg font-bold text-forest font-heading">
                      26323 Jefferson Avenue
                    </p>
                    <p className="text-charcoal-light font-body">Murrieta, CA 92562</p>
                  </div>
                </div>
              </div>

              {/* Business Hours Card */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-sage/15 rounded-xl flex items-center justify-center shrink-0">
                    <Clock className="w-6 h-6 text-sage" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-semibold text-charcoal-light font-body uppercase tracking-wide mb-3">
                      Business Hours
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-charcoal font-body text-sm">Monday - Friday</span>
                        <span className="text-forest font-semibold font-body text-sm">
                          7:00 AM - 6:00 PM
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-charcoal font-body text-sm">Saturday</span>
                        <span className="text-forest font-semibold font-body text-sm">
                          8:00 AM - 4:00 PM
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-charcoal font-body text-sm">Sunday</span>
                        <span className="text-charcoal-light font-semibold font-body text-sm">
                          Closed
                        </span>
                      </div>
                      <div className="border-t border-gray-200 pt-2 mt-2">
                        <div className="flex justify-between items-center">
                          <span className="text-charcoal font-body text-sm flex items-center gap-1.5">
                            <AlertCircle className="w-3.5 h-3.5 text-sage" />
                            Emergency Line
                          </span>
                          <span className="text-sage font-bold font-body text-sm">
                            Available 24/7
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="bg-cream-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-forest font-heading text-center mb-8">
            Find Us
          </h2>
          <div className="relative w-full h-80 sm:h-96 bg-gradient-to-br from-sage/10 via-forest/5 to-sage/10 rounded-2xl border-2 border-dashed border-sage/30 flex flex-col items-center justify-center overflow-hidden shadow-inner">
            <MapPin className="w-12 h-12 text-sage/50 mb-4" />
            <p className="text-lg font-semibold text-forest/70 font-heading">
              26323 Jefferson Avenue, Murrieta, CA 92562
            </p>
            <p className="text-sm text-charcoal-light/60 font-body mt-1">
              Interactive map coming soon
            </p>
            {/* Decorative grid lines to mimic map texture */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(45,80,22,1) 1px, transparent 1px), linear-gradient(90deg, rgba(45,80,22,1) 1px, transparent 1px)',
                  backgroundSize: '40px 40px',
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* What to Expect Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-3xl sm:text-4xl font-bold text-forest font-heading mb-4">
              What to Expect
            </h2>
            <p className="text-lg text-charcoal-light font-body max-w-2xl mx-auto">
              From first contact to a beautiful lawn, here&apos;s how we make it simple.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {/* Step 1 */}
            <div className="relative text-center group">
              <div className="w-16 h-16 bg-sage/15 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-sage/25 transition-colors">
                <ClipboardList className="w-8 h-8 text-sage" />
              </div>
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-0 w-8 h-8 bg-forest text-white rounded-full flex items-center justify-center text-sm font-bold font-heading shadow-md">
                1
              </div>
              <h3 className="text-xl font-bold text-charcoal font-heading mb-3">
                Submit Your Request
              </h3>
              <p className="text-charcoal-light font-body leading-relaxed">
                Fill out our quick contact form or give us a call. Tell us about your lawn and
                what services you&apos;re interested in.
              </p>
            </div>

            {/* Step 2 */}
            <div className="relative text-center group">
              <div className="w-16 h-16 bg-sage/15 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-sage/25 transition-colors">
                <MessageCircle className="w-8 h-8 text-sage" />
              </div>
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-0 w-8 h-8 bg-forest text-white rounded-full flex items-center justify-center text-sm font-bold font-heading shadow-md">
                2
              </div>
              <h3 className="text-xl font-bold text-charcoal font-heading mb-3">
                We&apos;ll Contact You Within 24 Hours
              </h3>
              <p className="text-charcoal-light font-body leading-relaxed">
                A lawn care specialist will reach out to discuss your needs, answer any questions,
                and schedule a convenient time to visit.
              </p>
            </div>

            {/* Step 3 */}
            <div className="relative text-center group">
              <div className="w-16 h-16 bg-sage/15 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-sage/25 transition-colors">
                <CalendarCheck className="w-8 h-8 text-sage" />
              </div>
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-0 w-8 h-8 bg-forest text-white rounded-full flex items-center justify-center text-sm font-bold font-heading shadow-md">
                3
              </div>
              <h3 className="text-xl font-bold text-charcoal font-heading mb-3">
                Get Your Free On-Site Estimate
              </h3>
              <p className="text-charcoal-light font-body leading-relaxed">
                We&apos;ll visit your property, assess your lawn&apos;s condition, and provide a
                detailed, no-obligation quote tailored to your needs.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
