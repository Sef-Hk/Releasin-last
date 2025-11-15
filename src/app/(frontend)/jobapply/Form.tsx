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

interface FormProps {
  // Optional: could pass default positions if needed
}

const Form: React.FC<FormProps> = () => {
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

  // Load positions from API
  useEffect(() => {
    async function loadPositions() {
      try {
        const res = await fetch("/api/openpositions2");
        const data = await res.json();
        const options: PositionOption[] = Array.isArray(data.docs)
          ? data.docs.map((p: any) => ({ id: p.id ?? p._id, header: p.header }))
          : [];
        setPositionsOptions(options);

        if (options.length > 0 && !position) setPosition(options[0].header);
      } catch (err) {
        console.error(err);
      }
    }
    loadPositions();
  }, [position]);

  const handleCvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCvFile(e.target.files?.[0] || null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
      const res = await fetch("/api/apply", { method: "POST", body: formData });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Submission failed");
      }

      setMessage({ type: "success", text: "Application sent successfully." });

      // Reset form
      setFullName("");
      setEmail("");
      setPhone("");
      setPosition(positionsOptions[0]?.header || "");
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
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
      {/* Name, Email, Phone */}
      {[
        { label: "Full name *", value: fullName, setValue: setFullName, type: "text", placeholder: "Example Full name" },
        { label: "Email *", value: email, setValue: setEmail, type: "email", placeholder: "example@email.com" },
        { label: "Phone *", value: phone, setValue: setPhone, type: "tel", placeholder: "+123456789" },
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
        <label htmlFor="cv-input" className="flex items-center gap-2 cursor-pointer border-b border-gray-300 pb-1">
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
          placeholder="Example: portfolio link"
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

      {/* Message */}
      {message && (
        <div className={`mt-4 text-${message.type === "error" ? "red-600" : "green-600"}`} role="status">
          {message.text}
        </div>
      )}
    </form>
  );
};

export default Form;
