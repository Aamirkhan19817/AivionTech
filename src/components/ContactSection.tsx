import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/companyData';
import { Mail, Phone, MapPin, Send, CheckCircle, Copy, Check } from 'lucide-react';
import { ScrollReveal } from './ScrollReveal';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: 'Web Development',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Use Web3Forms for direct email forwarding without a backend.
      // The user must provide VITE_WEB3FORMS_ACCESS_KEY in their .env file.
      const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

      if (accessKey) {
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            access_key: accessKey,
            subject: 'New Client Inquiry — Aiviontech Website',
            from_name: formData.name,
            ...formData,
          }),
        });

        if (!response.ok) {
          throw new Error('Failed to send message');
        }
        setSubmitted(true);
      } else {
        // Fallback or warning if no endpoint is configured
        console.warn('VITE_WEB3FORMS_ACCESS_KEY is not configured.');
        setSubmitError('Email service not configured. Please add VITE_WEB3FORMS_ACCESS_KEY to your .env file.');
      }
    } catch (error) {
      console.error('Email submission error:', error);
      setSubmitError('Unable to send message. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32 bg-gray-950 border-t border-white/[0.04]">
      {/* Background glow */}
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-600/10 blur-[140px] rounded-full pointer-events-none" />

      <ScrollReveal variant="3d-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Contact Information */}
          <div className="lg:col-span-5">
            <ScrollReveal variant="fade-up">
              <div className="text-xs font-mono tracking-[0.25em] text-cyan-400 uppercase mb-3">
                START A CONVERSATION
              </div>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-4">
                LET'S BUILD SOMETHING GREAT.
              </h2>
              <p className="text-base text-gray-300 leading-relaxed mb-8">
                Have an idea, project or business problem? Let's turn it into a digital solution.
              </p>

              {/* Direct Contact Cards */}
              <div className="space-y-4">
                {/* Email */}
                <div className="p-4 rounded-xl bg-gray-900/50 border border-white/[0.06] flex items-center justify-between group hover:border-cyan-500/40 transition-colors">
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-lg bg-gray-950 flex items-center justify-center text-cyan-400 border border-white/10">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[11px] font-mono uppercase text-gray-500">Business Email</div>
                      <a
                        href={`mailto:${COMPANY_INFO.email}`}
                        className="text-sm font-semibold text-white hover:text-cyan-400 transition-colors"
                      >
                        {COMPANY_INFO.email}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(COMPANY_INFO.email, 'email')}
                    aria-label="Copy email"
                    className="p-2 text-gray-400 hover:text-cyan-400 rounded-md"
                  >
                    {copiedField === 'email' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Phone */}
                <div className="p-4 rounded-xl bg-gray-900/50 border border-white/[0.06] flex items-center justify-between group hover:border-cyan-500/40 transition-colors">
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-lg bg-gray-950 flex items-center justify-center text-blue-400 border border-white/10">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[11px] font-mono uppercase text-gray-500">Phone Direct</div>
                      <a
                        href={`tel:${COMPANY_INFO.phone}`}
                        className="text-sm font-semibold text-white hover:text-cyan-400 transition-colors"
                      >
                        {COMPANY_INFO.phone}
                      </a>
                    </div>
                  </div>
                  <button
                    onClick={() => copyToClipboard(COMPANY_INFO.phone, 'phone')}
                    aria-label="Copy phone"
                    className="p-2 text-gray-400 hover:text-cyan-400 rounded-md"
                  >
                    {copiedField === 'phone' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                {/* Address */}
                <div className="p-4 rounded-xl bg-gray-900/50 border border-white/[0.06] flex items-center justify-between group">
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-lg bg-gray-950 flex items-center justify-center text-teal-400 border border-white/10">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[11px] font-mono uppercase text-gray-500">Headquarters</div>
                      <div className="text-sm text-gray-300">
                        {COMPANY_INFO.address}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Column: Project Inquiry Form */}
          <div className="lg:col-span-7">
            <ScrollReveal variant="fade-scale" delay={150}>
              <div className="rounded-2xl bg-gray-900/60 border border-white/[0.08] backdrop-blur-xl p-6 sm:p-10 shadow-2xl">
              {submitted ? (
                <div className="py-10 text-center relative overflow-hidden">
                  {/* Animated background glow burst */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div
                      className="w-64 h-64 rounded-full bg-cyan-500/10 blur-[60px]"
                      style={{ animation: 'successGlow 2s ease-out forwards' }}
                    />
                  </div>

                  {/* Floating particles */}
                  {[...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 rounded-full bg-cyan-400"
                      style={{
                        left: `${15 + i * 10}%`,
                        top: '50%',
                        animation: `particle-${i % 4} 1.2s ease-out ${i * 0.1}s forwards`,
                        opacity: 0,
                      }}
                    />
                  ))}

                  {/* Animated checkmark ring */}
                  <div className="relative w-20 h-20 mx-auto mb-6" style={{ animation: 'successPop 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.2s both' }}>
                    {/* Outer spinning ring */}
                    <div className="absolute inset-0 rounded-full border-2 border-cyan-400/30" style={{ animation: 'spinRing 3s linear infinite' }} />
                    {/* Inner ring that draws in */}
                    <div className="absolute inset-2 rounded-full border border-cyan-400/50" style={{ animation: 'spinRing 2s linear infinite reverse' }} />
                    {/* Glow circle */}
                    <div className="absolute inset-3 rounded-full bg-cyan-500/15 border border-cyan-400/60 flex items-center justify-center shadow-[0_0_25px_rgba(6,182,212,0.5)]">
                      <CheckCircle className="w-7 h-7 text-cyan-400" style={{ animation: 'successPop 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.5s both', opacity: 0 }} />
                    </div>
                  </div>

                  {/* Text with staggered reveal */}
                  <div style={{ animation: 'fadeSlideUp 0.6s ease-out 0.7s both' }}>
                    <div className="text-xs font-mono tracking-[0.3em] text-cyan-400 uppercase mb-2">
                      ✦ MESSAGE SENT ✦
                    </div>
                    <h3 className="font-display font-bold text-3xl text-white mb-3">
                      Inquiry Recorded
                    </h3>
                  </div>

                  <div style={{ animation: 'fadeSlideUp 0.6s ease-out 0.9s both' }}>
                    <p className="text-sm text-gray-300 max-w-sm mx-auto mb-2 leading-relaxed">
                      Thank you, <span className="text-white font-semibold">{formData.name}</span>. Your project brief has been received by our engineering team.
                    </p>
                    <p className="text-xs text-gray-500 mb-8">
                      We will respond at{' '}
                      <span className="text-cyan-400">{COMPANY_INFO.email}</span>{' '}
                      within 24 hours.
                    </p>
                  </div>

                  {/* Progress line animation */}
                  <div style={{ animation: 'fadeSlideUp 0.5s ease-out 1.1s both' }} className="mb-6 px-8">
                    <div className="h-px bg-gray-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-500 to-teal-400 rounded-full"
                        style={{ animation: 'progressLine 1.5s ease-out 1.2s both', width: '0%' }}
                      />
                    </div>
                  </div>

                  <div style={{ animation: 'fadeSlideUp 0.5s ease-out 1.3s both' }}>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          name: '',
                          email: '',
                          phone: '',
                          projectType: 'Web Development',
                          message: '',
                        });
                      }}
                      className="px-8 py-3 text-xs font-semibold uppercase tracking-widest text-cyan-400 border border-cyan-500/40 rounded-sm hover:bg-cyan-500/10 hover:border-cyan-400/70 transition-all duration-300"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>

                  <style>{`
                    @keyframes successGlow {
                      0% { transform: scale(0); opacity: 0; }
                      50% { transform: scale(1.5); opacity: 1; }
                      100% { transform: scale(2); opacity: 0; }
                    }
                    @keyframes successPop {
                      0% { transform: scale(0) rotate(-10deg); opacity: 0; }
                      100% { transform: scale(1) rotate(0deg); opacity: 1; }
                    }
                    @keyframes spinRing {
                      from { transform: rotate(0deg); }
                      to { transform: rotate(360deg); }
                    }
                    @keyframes fadeSlideUp {
                      from { opacity: 0; transform: translateY(20px); }
                      to { opacity: 1; transform: translateY(0); }
                    }
                    @keyframes progressLine {
                      from { width: 0%; }
                      to { width: 100%; }
                    }
                  `}</style>
                </div>

              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {submitError && (
                    <div className="p-3 bg-red-900/30 border border-red-500/50 text-red-400 text-sm rounded-lg">
                      {submitError}
                    </div>
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Name */}
                    <div>
                      <label className="block text-xs font-mono uppercase text-gray-400 mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-lg bg-gray-950/70 border border-white/10 text-white placeholder-gray-600 text-sm focus:border-cyan-400 focus:outline-none transition-colors"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-mono uppercase text-gray-400 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 rounded-lg bg-gray-950/70 border border-white/10 text-white placeholder-gray-600 text-sm focus:border-cyan-400 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Phone */}
                    <div>
                      <label className="block text-xs font-mono uppercase text-gray-400 mb-2">
                        Phone (Optional)
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+92 300 0000000"
                        className="w-full px-4 py-3 rounded-lg bg-gray-950/70 border border-white/10 text-white placeholder-gray-600 text-sm focus:border-cyan-400 focus:outline-none transition-colors"
                      />
                    </div>

                    {/* Project Type */}
                    <div>
                      <label className="block text-xs font-mono uppercase text-gray-400 mb-2">
                        Project Type
                      </label>
                      <select
                        value={formData.projectType}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                        className="w-full px-4 py-3 rounded-lg bg-gray-950 border border-white/10 text-white text-sm focus:border-cyan-400 focus:outline-none transition-colors"
                      >
                        <option value="Web Development">Web Development</option>
                        <option value="Mobile App Development">Mobile App Development</option>
                        <option value="AI & Machine Learning">AI & Machine Learning</option>
                        <option value="Custom Software Development">Custom Software Development</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-mono uppercase text-gray-400 mb-2">
                      Project Message *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your project objectives, timeline, and key requirements..."
                      className="w-full px-4 py-3 rounded-lg bg-gray-950/70 border border-white/10 text-white placeholder-gray-600 text-sm focus:border-cyan-400 focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 text-xs sm:text-sm font-semibold uppercase tracking-wider text-gray-950 bg-gradient-to-r from-cyan-400 to-teal-400 hover:from-cyan-300 hover:to-teal-300 rounded-lg shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                    <Send className={`w-4 h-4 ${isSubmitting ? 'animate-pulse' : ''}`} />
                  </button>

                  <p className="text-[11px] font-mono text-gray-500 text-center">
                    Direct communication with AIVION TECH senior engineering leadership.
                  </p>
                </form>
              )}
            </div>
            </ScrollReveal>
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
};
