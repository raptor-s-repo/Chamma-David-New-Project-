// sendTestEmail.js
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

async function sendTestEmail() {
  // Create a transporter using nodemailer with Hostinger SMTP configuration
  const transporter = nodemailer.createTransport({
    host: 'smtp.hostinger.com',
    port: 465,
    secure: true, 
    auth: {
      user: process.env.EMAIL_USER,
      pass:  process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from:process.env.EMAIL_USER,
    to: 'stanleyleojones@gmail.com',
    subject: 'Test Email',
    text: 'This is a test email sent from Node.js using nodemailer.'
  };

  try {
    // Send mail with defined transport object
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
}

// Call the function to send the test email
sendTestEmail();
