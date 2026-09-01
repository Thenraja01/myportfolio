/**
 * Professional HTML Email Template for portfolio contact notifications.
 */
export function buildContactEmailHtml({ name, email, subject, message, date, time }) {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Portfolio Contact</title>
  <style>
    body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #050816; color: #e2e8f0; margin: 0; padding: 40px 20px; }
    .container { max-width: 600px; margin: 0 auto; background: #0f172a; border: 1px solid rgba(99, 102, 241, 0.3); border-radius: 16px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.5); }
    .header { background: linear-gradient(135deg, #4f46e5, #7c3aed); padding: 30px; text-align: center; }
    .header h1 { margin: 0; font-size: 22px; font-weight: 700; color: #ffffff; letter-spacing: 1px; }
    .content { padding: 30px; }
    .field { margin-bottom: 20px; }
    .label { font-size: 11px; text-transform: uppercase; letter-spacing: 1.5px; color: #a855f7; font-weight: 700; margin-bottom: 4px; }
    .value { font-size: 15px; color: #f8fafc; line-height: 1.6; }
    .message-box { background: rgba(255,255,255,0.05); border-left: 4px solid #6366f1; padding: 16px; border-radius: 8px; margin-top: 8px; font-size: 14px; white-space: pre-wrap; }
    .footer { background: #0b0f19; padding: 20px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid rgba(255,255,255,0.05); }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>NEW PORTFOLIO MESSAGE</h1>
    </div>
    <div class="content">
      <div class="field">
        <div class="label">Sender Name</div>
        <div class="value">${name}</div>
      </div>
      <div class="field">
        <div class="label">Sender Email</div>
        <div class="value"><a href="mailto:${email}" style="color: #6366f1;">${email}</a></div>
      </div>
      <div class="field">
        <div class="label">Subject</div>
        <div class="value">${subject}</div>
      </div>
      <div class="field">
        <div class="label">Date & Time</div>
        <div class="value">${date} at ${time}</div>
      </div>
      <div class="field" >
        <div class="label">Message Content</div>
        <div class="message-box" style="background-color: #ffffffff;">${message}</div>
      </div>
    </div>
    <div class="footer">
      This message was sent from your Next.js Portfolio Contact System (thenraja-01.vercel.app).
    </div>
  </div>
</body>
</html>
  `;
}
