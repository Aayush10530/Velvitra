const nodemailer = require('nodemailer');

// Create reusable transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Send email
const sendEmail = async ({ email, subject, message }) => {
  try {
    const mailOptions = {
      from: `"Velvitra" <${process.env.EMAIL_USER}>`,
      to: email,
      subject,
      html: message
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Email sending failed:', error);
    throw new Error('Email sending failed');
  }
};

// Email templates
const emailTemplates = {
  welcome: (name) => ({
    subject: 'Welcome to Velvitra',
    message: `
      <h1>Welcome to Velvitra, ${name}!</h1>
      <p>Thank you for registering with us. We're excited to have you on board.</p>
      <p>Start exploring our amazing tours and create unforgettable memories.</p>
    `
  }),
  
  bookingConfirmation: (booking) => ({
    subject: 'Tour Booking Confirmation',
    message: `
      <h1>Booking Confirmation</h1>
      <p>Dear ${booking.user.name},</p>
      <p>Your booking for ${booking.tour.title} has been confirmed.</p>
      <p>Booking Details:</p>
      <ul>
        <li>Date: ${new Date(booking.bookingDate).toLocaleDateString()}</li>
        <li>Number of Adults: ${booking.numberOfPeople.adults}</li>
        <li>Number of Children: ${booking.numberOfPeople.children}</li>
        <li>Total Amount: $${booking.totalAmount}</li>
      </ul>
    `
  }),
  
  passwordReset: (resetUrl) => ({
    subject: 'Password Reset Request',
    message: `
      <h1>Password Reset</h1>
      <p>You requested a password reset. Click the link below to reset your password:</p>
      <a href="${resetUrl}">Reset Password</a>
      <p>This link will expire in 1 hour.</p>
    `
  }),
  
  emailVerification: (verificationUrl) => ({
    subject: 'Verify Your Email',
    message: `
      <h1>Email Verification</h1>
      <p>Please click the link below to verify your email address:</p>
      <a href="${verificationUrl}">Verify Email</a>
      <p>This link will expire in 24 hours.</p>
    `
  })
};

module.exports = {
  sendEmail,
  emailTemplates
}; 