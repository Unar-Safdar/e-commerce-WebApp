const nodemailer = require("nodemailer")

const mailSend = async (req, res) => {
    try {

        const { email, name, message } = req.body



        // Create a transporter using Ethereal test credentials.
        // For production, replace with your actual SMTP server details.
        const transporter = nodemailer.createTransport({
            service: "gmail",
            // host: "smtp.ethereal.email",
            // port: 465,
            // secure: true, // Use true for port 465, false for port 587
            auth: {
                user: process.env.EMAIL,
                pass: process.env.APP_PASS,
            },
        });


        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: "Your Form is Submited Success",

            html: `
  <div style="
    max-width:600px;
    margin:0 auto;
    padding:20px;
    font-family:Arial, sans-serif;
    background:#f9f9f9;
  ">
    <div style="
      background:#ffffff;
      padding:20px;
      border-radius:8px;
      box-shadow:0 0 10px rgba(0,0,0,0.1);
    ">
      <h2 style="color:#333;">Hello ${name} 👋</h2>

      <p style="color:#555; font-size:15px; line-height:1.6;">
        ${message}
      </p>

      <hr style="margin:20px 0; border:none; border-top:1px solid #eee;" />

      <p style="font-size:13px; color:#999;">
        This message was sent from your website contact form.
      </p>

      <p style="font-size:13px; color:#999;">
        © ${new Date().getFullYear()} Your Company. All rights reserved.
      </p>
    </div>
  </div>
`
        }

        await transporter.sendMail(mailOptions);

        

        res.status(200).json({
            success: true,
            message: "Email sent successfully",
        });



    } catch (err) {
        res.status(500).json
            (
                {
                    success: false,
                    message: "Email not sent",
                    error: err.message,
                }
            );

    }


}

module.exports = mailSend;


// const nodemailer = require("nodemailer");

// const mailSend = async (req, res) => {
//   try {
//     const { name, email, message } = req.body;

//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.EMAIL,
//         pass: process.env.APP_PASS,
//       },
//     });

//     // 1️⃣ Send issue to Admin
//     await transporter.sendMail({
//       to: process.env.ADMIN_EMAIL,       // Admin
//       from: email,                        // User ka email
//       subject: "New Client Issue Reported",
//       html: `
//         <h3>Client Name: ${name}</h3>
//         <p>Email: ${email}</p>
//         <p>Issue:</p>
//         <p>${message}</p>
//       `,
//     });

//     // 2️⃣ Send confirmation to User
//     await transporter.sendMail({
//       to: email,                          // User
//       from: process.env.ADMIN_EMAIL,      // Admin email
//       subject: "We received your message ✅",
//       html: `
//         <p>Hi ${name},</p>
//         <p>Thank you for contacting us. Your message has been received successfully and sent to our admin. We will get back to you soon.</p>
//       `,
//     });