import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { name, company, phone, email, city, enquiryType, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.MAIL_USER,
    to: process.env.MAIL_TO,
    subject: "New Business Enquiry – Divasa Fresh",
    text: `
Name: ${name}
Company: ${company}
Phone: ${phone}
Email: ${email}
City: ${city}
Type: ${enquiryType}

Message:
${message}
`,
  };

  await transporter.sendMail(mailOptions);

  res.status(200).json({ message: "Enquiry sent successfully." });
}
