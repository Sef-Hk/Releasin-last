'use client'
import React, { useEffect, useState } from "react";
import Image from "next/image";

interface PositionOption {
  id: string;
  header: string;
}

interface Message {
  type: "success" | "error";
  text: string;
}

function Page() {
  
  const [fullName, setFullName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [position, setPosition] = useState<string>("");
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [additionalLinks, setAdditionalLinks] = useState<string>("");
  const [coverLetter, setCoverLetter] = useState<string>("");

  const [positionsOptions, setPositionsOptions] = useState<PositionOption[]>([]);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [message, setMessage] = useState<Message | null>(null);
 
  

  useEffect(() => {
    async function loadPositions() {
      try {
        const res = await fetch("/api/openpositions");
        const data = await res.json();
  
        // Payload returns a paginated object, so we need data.docs
        const positionsArray = Array.isArray(data.docs) ? data.docs : [];
  
        // Map to our interface
        const options: PositionOption[] = positionsArray.map((p: any) => ({
          id: p.id ?? p._id,
          header: p.header,
        }));
  
        setPositionsOptions(options);
  
        // Set default selected position
        if (options.length > 0 && !position) setPosition(options[0].header);
  
        // console.log("Positions options:", options);
      } catch (err) {
        console.error(err);
      }
    }
    loadPositions();
  }, []);





  function handleCvChange(e: React.ChangeEvent<HTMLInputElement>) {
    setCvFile(e.target.files && e.target.files[0] ? e.target.files[0] : null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);

    if (!fullName || !email || !phone || !position || !cvFile || !coverLetter) {
      setMessage({ type: "error", text: "Please fill all required fields." });
      return;
    }

    const formData = new FormData();
    formData.append("fullName", fullName);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("position", position);
    formData.append("cv", cvFile);
    formData.append("additionalLinks", additionalLinks);
    formData.append("coverLetter", coverLetter);

    try {
      setSubmitting(true);
      const res = await fetch("/api/apply", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Submission failed");
      }

      setMessage({ type: "success", text: "Application sent successfully." });

      // reset form
      setFullName("");
      setEmail("");
      setPhone("");
      setPosition(positionsOptions.length > 0 ? positionsOptions[0].id : "");
      setCvFile(null);
      setAdditionalLinks("");
      setCoverLetter("");
      const input = document.getElementById("cv-input") as HTMLInputElement | null;
      if (input) input.value = "";
    } catch (err: any) {
      setMessage({ type: "error", text: err.message || "Something went wrong" });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      {/* Title */}
      <h1 className="text-4xl font-medium text-left mb-4">Join Our Team</h1>

      {/* Description */}
      <p className="text-gray-700 mb-4">
        We’re always looking for talented, passionate individuals to join our growing team.
        Fill out the form below to apply and share your CV with us. We review every application
        carefully and will get back to you if your profile matches our needs.
      </p>

      {/* Grey line */}
      <div className="border-t border-gray-300 mb-6"></div>

      {/* Form */}
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
        {[
          { label: "Full name *", value: fullName, setValue: setFullName, type: "text", placeholder: "Exemple Full name" },
          { label: "Email *", value: email, setValue: setEmail, type: "email", placeholder: "Exemple email@example.com" },
          { label: "Phone *", value: phone, setValue: setPhone, type: "tel", placeholder: "Exemple +123456789" },
        ].map((field, i) => (
          <div key={i} className="flex flex-col">
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

        {/* Position */}
    

<div className="flex flex-col">
  <label className="text-gray-800 mb-1">Position *</label>
  <select
    value={position}
    onChange={(e) => setPosition(e.target.value)}
    className="border-b border-gray-300 focus:outline-none focus:border-gray-500 pb-1"
    required
  >
    {positionsOptions.map((opt) => (
      <option key={opt.id} value={opt.header}>
        {opt.header}
      </option>
    ))}
  </select>
</div>




        {/* CV Upload */}
        <div className="flex flex-col">
          <label className="text-gray-800 mb-1">CV / Resume *</label>
          <label
            htmlFor="cv-input"
            className="flex items-center gap-2 cursor-pointer border-b border-gray-300 pb-1"
          >
            <Image src="/upload.svg" alt="Upload" width={24} height={24} />
            <span className="text-gray-500">{cvFile ? cvFile.name : "Upload your CV"}</span>
          </label>
          <input
            id="cv-input"
            type="file"
            accept=".pdf,.doc,.docx,application/pdf,application/msword"
            onChange={handleCvChange}
            className="hidden"
            required
          />
        </div>

        {/* Additional Links */}
        <div className="flex flex-col">
          <label className="text-gray-800 mb-1">Additional links / Work samples</label>
          <input
            type="text"
            value={additionalLinks}
            onChange={(e) => setAdditionalLinks(e.target.value)}
            placeholder="Exemple: portfolio link"
            className="border-b border-gray-300 focus:outline-none focus:border-gray-500 pb-1"
          />
        </div>

        {/* Cover Letter */}
        <div className="flex flex-col">
          <label className="text-gray-800 mb-1">Cover letter *</label>
          <textarea
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            rows={6}
            placeholder="Write your cover letter here..."
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
            {submitting ? "Sending..." : "Send Application"}
          </button>
        </div>
      </form>

      {/* Message */}
      {message && (
        <div className={`mt-4 text-${message.type === "error" ? "red-600" : "green-600"}`} role="status">
          {message.text}
        </div>
      )}
    </div>
  );
}

export default Page;
