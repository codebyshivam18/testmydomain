import { Resend } from 'resend';

export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { password, email, status } = JSON.parse(event.body);

  if (password !== process.env.ADMIN_PASSWORD) {
    return { statusCode: 403, body: 'Unauthorized' };
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  const subject = status === 'approved'
    ? 'Appointment Approved 🎉'
    : 'Appointment Rejected ❌';
  const message =
    status === 'approved'
      ? 'Congratulations! Your appointment has been approved.'
      : 'Sorry, your appointment has been rejected.';

  await resend.emails.send({
    from: 'noreply@yourdomain.com',
    to: email,
    subject,
    html: `<p>${message}</p>`,
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true }),
  };
}
