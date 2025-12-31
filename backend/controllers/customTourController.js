const { sendEmail, emailTemplates } = require('../utils/email');

const createCustomTourRequest = async (req, res) => {
  try {
    const { monument, travelers, language, date, vehicle, name, email, phone, countryCode, specialRequests } = req.body;

    // Format date for email
    const formattedDate = date ? new Date(date).toDateString() : 'Not specified';
    const selectedMonuments = monument.length > 0 ? monument.join(", ") : 'Not specified';

    // 1. Send email to client
    const clientSubject = 'Your Custom Tour Request Confirmation';
    const clientMessage = `
      <h1>Thank You for Your Custom Tour Request, ${name}!</h1>
      <p>We have received your request and our travel specialists will get back to you within 24 hours to discuss your personalized itinerary.</p>
      <h2>Your Request Details:</h2>
      <ul>
        <li><strong>Monuments:</strong> ${selectedMonuments}</li>
        <li><strong>Number of Travelers:</strong> ${travelers}</li>
        <li><strong>Preferred Guide Language:</strong> ${language}</li>
        <li><strong>Travel Date:</strong> ${formattedDate}</li>
        <li><strong>Vehicle Preference:</strong> ${vehicle}</li>
        <li><strong>Special Requests:</strong> ${specialRequests || 'N/A'}</li>
      </ul>
      <p>We look forward to crafting an unforgettable experience for you!</p>
      <p>Best regards,<br/>Velvitra Team</p>
    `;

    await sendEmail({
      email: email,
      subject: clientSubject,
      message: clientMessage,
    });

    // 2. Send email to agency
    const agencyEmail = process.env.AGENCY_EMAIL || 'your_agency_email@example.com'; // Replace with your agency email
    const agencySubject = 'New Custom Tour Request Received';
    const agencyMessage = `
      <h1>New Custom Tour Request Received!</h1>
      <p>A new custom tour request has been submitted with the following details:</p>
      <ul>
        <li><strong>Client Name:</strong> ${name}</li>
        <li><strong>Client Email:</strong> ${email}</li>
        <li><strong>Client Phone:</strong> ${countryCode} ${phone}</li>
        <li><strong>Monuments:</strong> ${selectedMonuments}</li>
        <li><strong>Number of Travelers:</strong> ${travelers}</li>
        <li><strong>Preferred Guide Language:</strong> ${language}</li>
        <li><strong>Travel Date:</strong> ${formattedDate}</li>
        <li><strong>Vehicle Preference:</strong> ${vehicle}</li>
        <li><strong>Special Requests:</strong> ${specialRequests || 'N/A'}</li>
      </ul>
      <p>Please review and contact the client promptly.</p>
    `;

    await sendEmail({
      email: agencyEmail,
      subject: agencySubject,
      message: agencyMessage,
    });

    res.status(200).json({
      success: true,
      message: 'Custom tour request submitted successfully. Check your email for confirmation!',
    });
  } catch (error) {
    console.error('Error submitting custom tour request:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to submit custom tour request',
      error: error.message,
    });
  }
};

module.exports = {
  createCustomTourRequest,
}; 