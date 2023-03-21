import nodemailer from "nodemailer";

export default async (req, res) => {
  const { name, email, msg } = req.body;
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_ACCT,
      pass: process.env.MAIL_PASS,
    },
  });
  try {
    const emailRes = await transporter.sendMail({
      from: email,
      to: process.env.MAIL_ACCT,
      subject: `Contact form submission from ${name}`,
      html: `<p>Sent from ${email}</p><p>${msg}</p>`,
    });
  } catch (err) {
    console.log(err);
  }
  res.status(200).json(req.body);
};
