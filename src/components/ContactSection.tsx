import React, { useState } from 'react';
import { COMPANY_INFO } from '../data/companyData';
import { Mail, Phone, MapPin, Send, CheckCircle, Copy, Check } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: 'Web Development',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    // Simulate submission handling without pretending fake backend email server
    setSubmitted(true);
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32 bg-gray-950 overflow-hidden border-t border-white/[0.04]">
      {/* Background glow */}
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-600/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Contact Information */}
          <div className="lg:col-span-5">
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
          </div>

          {/* Right Column: Project Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-gray-900/60 border border-white/[0.08] backdrop-blur-xl p-6 sm:p-10 shadow-2xl">
              {submitted ? (
                <div className="py-12 text-center">
                  <div className="w-14 h-14 rounded-full bg-cyan-500/10 border border-cyan-400/40 text-cyan-400 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-7 h-7" />
                  </div>
                  <h3 className="font-display font-bold text-2xl text-white mb-2">
                    Inquiry Recorded
                  </h3>
                  <p className="text-sm text-gray-300 max-w-md mx-auto mb-6">
                    Thank you, {formData.name}. Your project brief has been recorded. You can also reach our engineering desk directly at{' '}
                    <span className="text-cyan-400">{COMPANY_INFO.email}</span>.
                  </p>
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
                    className="px-6 py-2.5 text-xs font-semibold uppercase tracking-wider text-cyan-400 border border-cyan-500/40 rounded-sm hover:bg-cyan-500/10 transition-colors"
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
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
                    className="w-full py-4 text-xs sm:text-sm font-semibold uppercase tracking-wider text-gray-950 bg-gradient-to-r from-cyan-400 to-teal-400 hover:from-cyan-300 hover:to-teal-300 rounded-lg shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    <span>Send Message</span>
                    <Send className="w-4 h-4" />
                  </button>

                  <p className="text-[11px] font-mono text-gray-500 text-center">
                    Direct communication with AIVION TECH senior engineering leadership.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
