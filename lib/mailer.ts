import nodemailer from "nodemailer";

export async function sendLeadNotification(data: {
  name: string;
  email: string;
  phone: string;
  businessType: string;
  message: string;
}) {
  const host = process.env.EMAIL_SERVER;
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASSWORD;

  if (!host || !user || !pass) {
    return;
  }

  const transporter = nodemailer.createTransport({
    host,
    port: 587,
    secure: false,
    auth: { user, pass },
  });

  await transporter.sendMail({
    from: `MyBooking Leads <${user}>`,
    to: user,
    replyTo: data.email,
    subject: `New Lead: ${data.name} (${data.businessType})`,
    text: [
      `Name: ${data.name}`,
      `Email: ${data.email}`,
      `Phone: ${data.phone}`,
      `Business Type: ${data.businessType}`,
      "",
      data.message,
    ].join("\n"),
  });
}