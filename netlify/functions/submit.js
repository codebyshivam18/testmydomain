import { Resend } from 'resend';

export async function handler(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const { name, email, message } = JSON.parse(event.body);
  const resend = new Resend(process.env.RESEND_API_KEY);

  // Save appointment (temporary in Netlify functions — for real use, connect DB or Google Sheet)
  // For now, use Netlify Forms or a JSON file in persistent DB (Fauna / Supabase)

  // Send confirmation mail to user
  await resend.emails.send({
    from: 'testmydomain@resend.dev',
    to: email,
    subject: 'Appointment Received',
    html: `<p>Hi ${name}, your appointment request has been received!</p>`,
  });

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true, message: 'Appointment submitted!' }),
  };
}

