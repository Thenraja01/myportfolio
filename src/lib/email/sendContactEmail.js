import nodemailer from "nodemailer";
import { buildContactEmailHtml } from "./emailTemplate";

/**
 * Send email notification to portfolio owner using server-side Nodemailer.
 * Supports SMTP_USER / SMTP_PASS or EMAIL_FROM / EMAIL_APP_PASSWORD credentials.
 */
export async function sendContactEmail({ name, email, subject, message, date, time }) {
  const smtpUser = process.env.SMTP_USER || process.env.EMAIL_FROM;
  const smtpPass = process.env.SMTP_PASS || process.env.EMAIL_APP_PASSWORD;
  const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
  const smtpPort = parseInt(process.env.SMTP_PORT || "587", 10);
  const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL ;

  if (!smtpUser || !smtpPass) {
    console.warn("Nodemailer missing SMTP_USER or SMTP_PASS. Skipping email delivery.");
    return { success: false, reason: "Server email configuration incomplete." };
  }

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465, // true for 465, false for 587
    auth: {
      user: smtpUser,
      pass: smtpPass,
    },
  });

  const htmlContent = buildContactEmailHtml({ name, email, subject, message, date, time });

  const senderHeader = process.env.SMTP_FROM
    ? `"${process.env.SMTP_FROM}" <${smtpUser}>`
    : `"Portfolio Contact System" <${smtpUser}>`;

  const mailOptions = {
    from: senderHeader,
    to: receiverEmail,
    replyTo: email,
    subject: `Portfolio Contact: ${subject} (${name})`,
    html: htmlContent,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Contact email sent successfully via Nodemailer:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Failed to send contact email:", error);
    return { success: false, error: error.message };
  }
}
