import { useState } from "react";

export function useContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    honeypot: "",
  });

  const [status, setStatus] = useState("IDLE"); // IDLE | LOADING | SUCCESS | ERROR
  const [toastMessage, setToastMessage] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === "LOADING") return;

    setStatus("LOADING");
    setToastMessage(null);
    setErrors({});

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus("SUCCESS");
        setToastMessage({ type: "success", text: "Message sent successfully." });
        setFormData({ name: "", email: "", subject: "", message: "", honeypot: "" });
      } else {
        setStatus("ERROR");
        if (data.details) {
          setErrors(data.details);
        }
        setToastMessage({
          type: "error",
          text: data.error || "Unable to send your message right now.",
        });
      }
    } catch (err) {
      console.error("Form submit error:", err);
      setStatus("ERROR");
      setToastMessage({
        type: "error",
        text: "Something went wrong. Please check your connection and try again.",
      });
    }
  };

  const clearToast = () => setToastMessage(null);

  return {
    formData,
    status,
    errors,
    toastMessage,
    handleChange,
    handleSubmit,
    clearToast,
  };
}
