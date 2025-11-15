export const dynamic = 'force-dynamic'; // or 'auto'

import React from 'react';
import RequestQuotationForm from './Form';


const RequestQuotationPage: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-4xl font-medium text-left mb-4">Request Quotation</h1>

      <p className="text-gray-700 mb-4">
        Need a custom software solution, app, or digital product? Fill out the form below
        and provide as much detail as possible. Our team will review your request and
        get back to you with a personalized quotation.
      </p>

      <div className="border-t border-gray-300 mb-6"></div>

      <RequestQuotationForm />
    </div>
  );
};

export default RequestQuotationPage;
