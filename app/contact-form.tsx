'use client';

import { useRef, useState, type FormEvent } from 'react';

// Formspree form IDs are public submission addresses, not private API keys.
const contactEndpoint = process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT?.trim() || 'https://formspree.io/f/xqppwpeo';

type Field = 'name' | 'email' | 'service' | 'date' | 'message';
const labels: Record<Field, string> = { name: 'Your name', email: 'Email address', service: 'Photography service', date: 'Event date', message: 'Your story' };

export default function ContactForm() {
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const sending = useRef(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending.current) return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const nextErrors: Partial<Record<Field, string>> = {};
    for (const field of Object.keys(labels) as Field[]) {
      if (!String(data.get(field) ?? '').trim()) nextErrors[field] = `Please enter ${field === 'service' ? 'a photography service' : field === 'date' ? 'your event date' : field === 'message' ? 'a message' : labels[field].toLowerCase()}.`;
    }
    const email = form.elements.namedItem('email') as HTMLInputElement;
    if (email.value && !email.validity.valid) nextErrors.email = 'Please enter a valid email address.';
    setErrors(nextErrors);
    setStatus('idle');
    const firstInvalid = Object.keys(nextErrors)[0];
    if (firstInvalid) {
      (form.elements.namedItem(firstInvalid) as HTMLElement).focus();
      return;
    }
    sending.current = true;
    setStatus('loading');
    try {
      const response = await fetch(contactEndpoint, {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(Object.fromEntries(Array.from(data.entries()).map(([key, value]) => [key, String(value).trim()]))),
        signal: AbortSignal.timeout(15000),
      });
      if (!response.ok) throw new Error('Submission failed');
      form.reset();
      setStatus('success');
    } catch {
      setStatus('error');
    } finally {
      sending.current = false;
    }
  }

  function accessibility(field: Field) {
    return { id: `contact-${field}`, name: field, required: true, 'aria-invalid': !!errors[field], 'aria-describedby': errors[field] ? `contact-${field}-error` : undefined };
  }
  function error(field: Field) {
    return errors[field] ? <span id={`contact-${field}-error`} className="contact-field-error">{errors[field]}</span> : null;
  }

  return <form className="contact-form" onSubmit={submit} noValidate aria-busy={status === 'loading'}>
    <div className="contact-form-intro"><span className="eyebrow">A LITTLE ABOUT YOU</span><span>All fields are required</span></div>
    <fieldset disabled={status === 'loading'}>
      <div className="contact-fields">
        <div className="contact-field"><label htmlFor="contact-name">Your name</label><input {...accessibility('name')} autoComplete="name" maxLength={120} placeholder="The name I’ll get to know"/>{error('name')}</div>
        <div className="contact-field"><label htmlFor="contact-email">Email address</label><input {...accessibility('email')} type="email" autoComplete="email" maxLength={254} placeholder="you@example.com"/>{error('email')}</div>
        <div className="contact-field"><label htmlFor="contact-service">Photography service</label><select {...accessibility('service')} defaultValue=""><option value="" disabled>Select your experience</option><option>Weddings</option><option>Elopements</option><option>Couples</option></select>{error('service')}</div>
        <div className="contact-field"><label htmlFor="contact-date">Event date</label><input {...accessibility('date')} type="date"/>{error('date')}</div>
        <div className="contact-field contact-message"><label htmlFor="contact-message">Tell me your story</label><textarea {...accessibility('message')} rows={5} maxLength={5000} placeholder="Your plans, your people, the moments you want to remember…"/>{error('message')}</div>
      </div>
      <div className="contact-submit"><span>A little note. The start of something lovely.</span><button className="contact-button" type="submit" disabled={status === 'loading'}>{status === 'loading' ? <><span className="contact-spinner" aria-hidden="true"/>Sending your story…</> : <>Send your story <span aria-hidden="true">↗</span></>}</button></div>
    </fieldset>
    <div role="status" aria-live="polite" aria-atomic="true">{status === 'success' && <div className="contact-feedback contact-success"><strong>Thank you for sharing your story.</strong><span>Your inquiry has been sent. I’m looking forward to connecting with you.</span></div>}</div>
    {status === 'error' && <div className="contact-feedback contact-error" role="alert"><strong>Your story couldn’t be sent just yet.</strong><span>Your details are still here. Please try again in a moment.</span></div>}
  </form>;
}
