const { Resend } = require('resend');

const sendOtpEmail = async ({ to, otp, username }) => {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';

  console.log(`[OTP Service] Generated OTP for user '${username}': ${otp} (Recipient: ${to})`);

  // Check if a valid Resend API key is provided
  if (!apiKey || apiKey === 're_your_resend_api_key' || apiKey === 'your_resend_api_key_here') {
    console.warn('[Resend API] No valid RESEND_API_KEY set in .env file. OTP logged above for dev testing.');
    return { success: true, simulated: true };
  }

  try {
    const resend = new Resend(apiKey);

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #111111; color: #ffffff; border-radius: 10px; border: 1px solid #333333;">
        <div style="text-align: center; padding-bottom: 20px; border-bottom: 1px solid #222222;">
          <h1 style="color: #ffd700; margin: 0; font-size: 26px;">SCIEnT Admin Portal</h1>
          <p style="color: #888888; margin-top: 5px; font-size: 14px;">Password Reset Verification Code</p>
        </div>
        <div style="padding: 30px 20px; text-align: center;">
          <p style="font-size: 16px; color: #dddddd;">Hello <strong>${username}</strong>,</p>
          <p style="font-size: 14px; color: #aaaaaa; margin-bottom: 25px;">You requested a password reset for your admin account. Use the OTP code below to verify your request:</p>
          
          <div style="background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%); border: 2px solid #ffd700; border-radius: 8px; padding: 20px; display: inline-block; letter-spacing: 8px; font-size: 32px; font-weight: bold; color: #ffd700; margin-bottom: 25px;">
            ${otp}
          </div>

          <p style="font-size: 13px; color: #888888;">This OTP is valid for <strong>10 minutes</strong>. If you did not request a password reset, please ignore this email.</p>
        </div>
        <div style="text-align: center; padding-top: 20px; border-top: 1px solid #222222; font-size: 12px; color: #666666;">
          &copy; ${new Date().getFullYear()} SCIEnT NITT. All rights reserved.
        </div>
      </div>
    `;

    const { data, error } = await resend.emails.send({
      from: `SCIEnT Admin <${fromEmail}>`,
      to: [to],
      subject: `[SCIEnT Admin] Password Reset OTP: ${otp}`,
      html: htmlContent,
    });

    if (error) {
      console.error('[Resend API Error]:', error);
      throw new Error(error.message || 'Failed to send email via Resend');
    }

    console.log('[Resend API Success] Email sent successfully:', data);
    return { success: true, data };
  } catch (err) {
    console.error('[OTP Email Error]:', err.message);
    throw err;
  }
};

const escapeHtml = (text = '') =>
  String(text).replace(/[&<>"']/g, ch => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));

// Forwards a Contact Us message to the SCIEnT inbox (CONTACT_INBOX_EMAIL, else
// ADMIN_EMAIL). Replying to the email replies to the visitor. Returns false when
// email isn't configured; the message is still saved and shown in the admin portal.
const sendContactEmail = async ({ name, email, subject, message }) => {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_INBOX_EMAIL || process.env.ADMIN_EMAIL;
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';

  if (!apiKey || apiKey === 're_your_resend_api_key' || apiKey === 'your_resend_api_key_here' || !to) {
    console.warn('[Contact] RESEND_API_KEY or CONTACT_INBOX_EMAIL/ADMIN_EMAIL not set; message saved without email.');
    return false;
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: `SCIEnT Website <${fromEmail}>`,
    to: [to],
    replyTo: email,
    subject: `[SCIEnT Contact] ${subject || `Message from ${name}`}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #111;">
        <h2 style="margin: 0 0 4px; font-size: 18px;">New message from the SCIEnT website</h2>
        <p style="margin: 0 0 16px; color: #555; font-size: 14px;">${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</p>
        ${subject ? `<p style="margin: 0 0 12px; font-weight: bold;">${escapeHtml(subject)}</p>` : ''}
        <p style="white-space: pre-wrap; line-height: 1.5; margin: 0;">${escapeHtml(message)}</p>
        <p style="margin-top: 24px; color: #888; font-size: 12px;">Reply to this email to answer them. All messages are also in the admin portal under Messages.</p>
      </div>
    `,
  });
  if (error) throw new Error(error.message || 'Failed to send email via Resend');
  return true;
};

module.exports = { sendOtpEmail, sendContactEmail };
