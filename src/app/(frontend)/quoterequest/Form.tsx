'use client'

import React, { useState } from 'react';

interface RequestQuotationMessage {
  type: 'success' | 'error';
  text: string;
}

const RequestQuotationForm: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [projectDetail, setProjectDetail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<RequestQuotationMessage | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!fullName || !email || !phone || !company || !projectDetail) {
      setMessage({ type: 'error', text: 'Please fill all required fields.' });
      return;
    }

    const payload = { fullName, email, phone, company, projectDetail };

    try {
      setSubmitting(true);
      const res = await fetch('/api/request-quotation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || 'Failed to send request');
      }

      setMessage({ type: 'success', text: 'Request sent successfully.' });
      setFullName('');
      setEmail('');
      setPhone('');
      setCompany('');
      setProjectDetail('');
    } catch (err: any) {
      setMessage({ type: 'error', text: err.message || 'Something went wrong' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {[
        { label: 'Full name *', value: fullName, setValue: setFullName, type: 'text', placeholder: 'Ex: John Doe' },
        { label: 'Email *', value: email, setValue: setEmail, type: 'email', placeholder: 'Ex: john@example.com' },
        { label: 'Phone *', value: phone, setValue: setPhone, type: 'tel', placeholder: 'Ex: +123456789' },
        { label: 'Company / Organization *', value: company, setValue: setCompany, type: 'text', placeholder: 'Ex: Acme Inc.' },
      ].map((field, idx) => (
        <div key={idx} className="flex flex-col">
          <label className="text-gray-800 mb-1">{field.label}</label>
          <input
            type={field.type}
            value={field.value}
            onChange={(e) => field.setValue(e.target.value)}
            placeholder={field.placeholder}
            className="border-b border-gray-300 focus:outline-none focus:border-gray-500 pb-1 text-gray-800"
            required
          />
        </div>
      ))}

      {/* Project Detail */}
      <div className="flex flex-col">
        <label className="text-gray-800 mb-1">Project Detail *</label>
        <textarea
          value={projectDetail}
          onChange={(e) => setProjectDetail(e.target.value)}
          rows={6}
          placeholder="Describe your project in detail..."
          className="border-b border-gray-300 focus:outline-none focus:border-gray-500 pb-1 text-gray-800"
          required
        />
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          disabled={submitting}
          className="bg-black text-white py-2 px-6 rounded hover:bg-gray-800 transition"
        >
          {submitting ? 'Sending...' : 'Send Request'}
        </button>
      </div>

      {/* Message */}
      {message && (
        <div className={`mt-4 text-${message.type === 'error' ? 'red-600' : 'green-600'}`} role="status">
          {message.text}
        </div>
      )}
    </form>
  );
};

export default RequestQuotationForm;
