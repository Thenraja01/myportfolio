/**
 * Contact form input validation helper.
 */
export function validateContactInput({ name, email, subject, message, honeypot }) {
  const errors = {};

  if (honeypot && honeypot.trim() !== "") {
    return { isValid: false, errors: { bot: "Spam detected." } };
  }

  if (!name || typeof name !== "string" || name.trim().length === 0) {
    errors.name = "Name is required.";
  } else if (name.trim().length > 100) {
    errors.name = "Name cannot exceed 100 characters.";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || typeof email !== "string" || !emailRegex.test(email.trim())) {
    errors.email = "Please enter a valid email address.";
  } else if (email.trim().length > 150) {
    errors.email = "Email cannot exceed 150 characters.";
  }

  if (!subject || typeof subject !== "string" || subject.trim().length === 0) {
    errors.subject = "Subject is required.";
  } else if (subject.trim().length > 200) {
    errors.subject = "Subject cannot exceed 200 characters.";
  }

  if (!message || typeof message !== "string" || message.trim().length === 0) {
    errors.message = "Message is required.";
  } else if (message.trim().length > 3000) {
    errors.message = "Message cannot exceed 3000 characters.";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
