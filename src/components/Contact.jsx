import React, { useState } from "react";
import axios from "axios";
import { Linkedin, Instagram, MapPin, CheckCircle2, Loader2 } from "lucide-react";

const API_BASE = process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : '';

const CONTACTS = [
  { topic: 'Admin', people: [{ name: 'Sivanesan S', phone: '9092559610' }] },
  { topic: 'Technical', people: [{ name: 'Pranesh S K', phone: '9345718019' }] },
  {
    topic: 'Facility',
    people: [
      { name: 'Advaith S', phone: '9345682446' },
      { name: 'D Sai Sri Mouriya', phone: '6374239764' },
      { name: 'A M Yafea Nazz', phone: '8838376991' },
    ],
  },
];

const MAPS_URL = 'https://www.google.com/maps/search/?api=1&query=SCIEnT%2C+NIT+Trichy';
const EMPTY_FORM = { name: '', email: '', subject: '', message: '', website: '' };

// Shared input styling; bracket values because Bootstrap's spacing/border
// utilities are !important and would override Tailwind's
const fieldClass =
  'w-full rounded-[10px] border-[1px] border-zinc-800 bg-zinc-900 px-[14px] text-sm text-zinc-50 placeholder-zinc-500 outline-none transition-colors focus:border-[#facc15]';

const Field = ({ label, children }) => (
  <label className="m-0 flex flex-col gap-1.5 text-[13px] font-medium text-zinc-300">
    {label}
    {children}
  </label>
);

// Contact Us card (used on the home page and /contact). Messages are saved by
// the backend, emailed to the SCIEnT inbox and listed in the admin portal.
const Contact = () => {
  const [form, setForm] = useState(EMPTY_FORM);
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [error, setError] = useState('');

  const update = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setError('');
    try {
      await axios.post(`${API_BASE}/api/contact`, form);
      setStatus('sent');
      setForm(EMPTY_FORM);
    } catch (err) {
      setStatus('error');
      setError(err.response?.data?.message || 'Could not send your message. Please try again later.');
    }
  };

  return (
    <section className="mb-24 mt-10 flex w-full justify-center px-[16px] text-white md:mt-24 md:px-6 lg:px-12">
      <div className="grid w-full max-w-6xl grid-cols-1 overflow-hidden rounded-[20px] border-[1px] border-zinc-800 bg-zinc-950 lg:grid-cols-2">

        {/* ── Left: intro, who to call, links ── */}
        <div className="flex flex-col gap-6 border-b-[1px] border-zinc-800 p-[24px] md:p-[40px] lg:border-b-0 lg:border-r-[1px]">
          <div className="flex flex-col gap-2.5">
            <p className="m-0 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#facc15]">Contact us</p>
            <h2 className="m-0 text-[28px] font-bold leading-tight text-zinc-50 md:text-[30px]">Talk to the SCIEnT team</h2>
            <p className="m-0 text-sm leading-relaxed text-zinc-400">
              Tell us about your idea, a challenge you're facing, or just say hi. We'd love to hear from you.
            </p>
          </div>

          <div className="flex flex-col">
            {CONTACTS.map(({ topic, people }) => (
              <div key={topic} className="flex flex-col gap-1 border-t-[1px] border-zinc-800 py-[14px]">
                <p className="m-0 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#facc15]">{topic}</p>
                {people.map(({ name, phone }) => (
                  <div key={phone} className="flex items-center justify-between gap-[12px] text-sm">
                    <span className="font-medium text-zinc-50">{name}</span>
                    <a href={`tel:+91${phone}`} className="py-[6px] text-zinc-400 no-underline transition-colors hover:text-[#facc15]">
                      {phone.replace(/(\d{5})(\d{5})/, '$1 $2')}
                    </a>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="mt-auto flex items-center gap-1 border-t-[1px] border-zinc-800 pt-[16px]">
            <a
              href="https://www.linkedin.com/company/scientnitt/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="SCIEnT on LinkedIn"
              className="-ml-[13px] flex h-11 w-11 items-center justify-center text-zinc-400 transition-colors hover:text-[#facc15]"
            >
              <Linkedin className="h-[18px] w-[18px]" strokeWidth={1.75} aria-hidden="true" />
            </a>
            <a
              href="https://www.instagram.com/scient_nitt/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="SCIEnT on Instagram"
              className="flex h-11 w-11 items-center justify-center text-zinc-400 transition-colors hover:text-[#facc15]"
            >
              <Instagram className="h-[18px] w-[18px]" strokeWidth={1.75} aria-hidden="true" />
            </a>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-auto flex min-h-[44px] items-center gap-2 text-[13px] text-zinc-400 no-underline transition-colors hover:text-[#facc15]"
            >
              <MapPin className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
              SCIEnT, NIT Trichy
            </a>
          </div>
        </div>

        {/* ── Right: message form ── */}
        <div className="bg-[#09090b] p-[24px] md:p-[40px]">
          {status === 'sent' ? (
            <div className="flex h-full min-h-[320px] flex-col items-center justify-center gap-[12px] text-center" role="status">
              <CheckCircle2 className="h-12 w-12 text-[#facc15]" strokeWidth={1.5} aria-hidden="true" />
              <h3 className="m-0 text-xl font-semibold text-zinc-50">Message sent</h3>
              <p className="m-0 max-w-xs text-sm text-zinc-400">Thanks for writing to us. We'll get back to you by email.</p>
              <button
                type="button"
                onClick={() => setStatus('idle')}
                className="mt-2 rounded-[10px] border-[1px] border-zinc-700 px-[18px] py-[10px] text-sm font-semibold text-zinc-200 transition-colors hover:border-[#facc15] hover:text-[#facc15]"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex h-full flex-col gap-[16px]">
              <div className="grid grid-cols-1 gap-[16px] sm:grid-cols-2">
                <Field label="Name">
                  <input name="name" value={form.name} onChange={update} required maxLength={100} placeholder="Your name" className={`${fieldClass} h-11`} />
                </Field>
                <Field label="Email">
                  <input name="email" type="email" value={form.email} onChange={update} required maxLength={200} placeholder="you@example.com" className={`${fieldClass} h-11`} />
                </Field>
              </div>
              <Field label="Subject">
                <input name="subject" value={form.subject} onChange={update} maxLength={200} placeholder="What is this about?" className={`${fieldClass} h-11`} />
              </Field>
              <label className="m-0 flex flex-1 flex-col gap-1.5 text-[13px] font-medium text-zinc-300">
                Message
                <textarea
                  name="message"
                  value={form.message}
                  onChange={update}
                  required
                  maxLength={5000}
                  rows={6}
                  placeholder="Hi! I'd love to ask about..."
                  className={`${fieldClass} min-h-[140px] flex-1 resize-none py-[12px]`}
                />
              </label>

              {/* Honeypot: hidden from people, filled in by spam bots */}
              <input
                name="website"
                value={form.website}
                onChange={update}
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                className="absolute -left-[9999px] h-0 w-0 opacity-0"
              />

              {status === 'error' && <p className="m-0 text-sm text-red-400" role="alert">{error}</p>}

              <div className="flex flex-wrap items-center justify-between gap-[16px]">
                <p className="m-0 text-xs text-zinc-500">We usually reply within a few days.</p>
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="flex h-11 items-center gap-2 rounded-[10px] bg-[#facc15] px-[28px] text-sm font-bold text-zinc-950 transition-colors hover:bg-yellow-300 disabled:opacity-60"
                >
                  {status === 'sending' && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
                  {status === 'sending' ? 'Sending…' : 'Send message'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;
