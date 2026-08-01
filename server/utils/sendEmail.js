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

module.exports = { sendOtpEmail };
