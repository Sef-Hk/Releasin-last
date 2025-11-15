export const dynamic = "force-dynamic";


import React from "react";
import Form from "./Form";



const Page: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-4xl font-medium text-left mb-4">Join Our Team</h1>

      <p className="text-gray-700 mb-4">
        We’re always looking for talented, passionate individuals to join our growing team.
        Fill out the form below to apply and share your CV with us. We review every application
        carefully and will get back to you if your profile matches our needs.
      </p>

      <div className="border-t border-gray-300 mb-6"></div>

      <Form />
    </div>
  );
};

export default Page;
