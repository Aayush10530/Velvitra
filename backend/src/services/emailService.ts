import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create reusable transporter object using the default SMTP transport
const createTransporter = () => {
    // Check if SMTP credentials exists
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
        return nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT) || 587,
            secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });
    }
    return null;
};

const transporter = createTransporter();

/**
 * Send an email notification for a new custom tour request
 */
export const sendCustomTourEmail = async (tourData: any) => {
    const adminEmail = 'aayushmishra01530@gmail.com';

    if (!transporter) {
        console.warn('⚠️ SMTP credentials not found. Email simulation:');
        console.log(`To: ${adminEmail}`);
        console.log(`Subject: New Custom Tour Request - ${tourData.name}`);
        console.log('Body:', JSON.stringify(tourData, null, 2));
        return false;
    }

    try {
        const info = await transporter.sendMail({
            from: process.env.SMTP_FROM || '"Velvitra Tours" <noreply@velvitra.com>',
            to: adminEmail,
            subject: `New Custom Tour Request: ${tourData.name}`,
            html: `
                <h2>New Custom Tour Request Received</h2>
                <p><strong>Customer:</strong> ${tourData.name} (${tourData.email})</p>
                <p><strong>Phone:</strong> ${tourData.countryCode} ${tourData.phone}</p>
                <p><strong>Country:</strong> ${tourData.country || 'N/A'}</p>
                <hr />
                <h3>Trip Details</h3>
                <ul>
                    <li><strong>Monuments:</strong> ${tourData.monuments.join(', ')}</li>
                    <li><strong>Themes:</strong> ${tourData.themes.join(', ')}</li>
                    <li><strong>Travel Date:</strong> ${tourData.travelDate ? new Date(tourData.travelDate).toLocaleDateString() : 'Not specified'}</li>
                    <li><strong>Travelers:</strong> ${tourData.adults} Adults, ${tourData.children} Children</li>
                    <li><strong>Vehicle:</strong> ${tourData.vehicle || 'Not specified'}</li>
                    <li><strong>Language:</strong> ${tourData.language || 'English'}</li>
                </ul>
                <p><strong>Special Requests:</strong> ${tourData.specialRequests || 'None'}</p>
            `,
        });

        console.log('Message sent: %s', info.messageId);
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        return false;
    }
};
