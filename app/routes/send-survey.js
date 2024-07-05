import { json } from "@remix-run/node";
import nodemailer from "nodemailer";

const EMAIL_USER = 'freshclicknow@gmail.com';
const EMAIL_PASS = 'FreshLife32843*';

export const action = async ({ request }) => {
  if (request.method !== 'POST') {
    return json({ error: 'Method Not Allowed' }, { status: 405 });
  }

  const { orderId, customerEmail } = await request.json();

  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS
    }
  });

  const surveyLink = `https://zep-scule.myshopify.com/survey?orderId=${orderId}`;

  const mailOptions = {
    from: EMAIL_USER,
    to: customerEmail,
    subject: 'Please complete our survey',
    html: `<p>Click the link below to complete the survey:</p><a href="${surveyLink}">Complete Survey</a>`
  };

  try {
    await transporter.sendMail(mailOptions);
    return json({ success: true, message: 'Survey sent' });
  } catch (error) {
    console.error(error);
    return json({ success: false, message: 'Error sending survey' }, { status: 500 });
  }
};
