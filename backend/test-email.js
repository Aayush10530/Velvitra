require('dotenv').config();
const nodemailer = require('nodemailer');

const testEmail = async () => {
    console.log('Testing email configuration...');
    console.log('User:', process.env.EMAIL_USER);
    console.log('Host:', process.env.EMAIL_HOST);

    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: process.env.EMAIL_SECURE === 'true',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    try {
        const info = await transporter.sendMail({
            from: `"Velvitra Test" <${process.env.EMAIL_USER}>`,
            to: process.env.EMAIL_USER, // Send to self
            subject: "Test Email from Velvitra",
            text: "If you receive this, your email configuration is working correctly!",
            html: "<b>If you receive this, your email configuration is working correctly!</b>"
        });

        console.log('Message sent: %s', info.messageId);
        console.log('Email configuration is VALID ✅');
    } catch (error) {
        console.error('Error sending email:', error);
        console.log('Email configuration is INVALID ❌');
    }
};

testEmail();
