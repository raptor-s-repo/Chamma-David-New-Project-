// utils/sendEmail.js
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

async function sendActivationEmail(email, activationCode) {
  // Create a SMTP transporter
  const transporter = nodemailer.createTransport({
    host: 'smtp.hostinger.com',
    port: 465,
    secure: true, // use SSL
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  // Activation link
  const activationLink = `${process.env.ACTIVATION_LINK_DOMAIN}/api/users/activate/${activationCode}`;


  // Email content
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Account Activation',
    text: `Please click the following link to activate your account: ${activationLink}`
  };

  try {
    // Send email
    await transporter.sendMail(mailOptions);
    console.log('Activation email sent successfully');
  } catch (error) {
    console.error('Error sending activation email:', error);
    throw error; // Throw error to handle in calling function
  }
}

module.exports = { sendActivationEmail };
