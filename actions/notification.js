import nodemailer from 'nodemailer';

// Email configuration
const EMAIL_CONFIG = {
  service: 'gmail', // or your preferred email service
  user: process.env.EMAIL_USER, // Your email address
  pass: process.env.EMAIL_PASS, // Your email password or app password
  recipients: [
    process.env.ADMIN_EMAIL_1, // First recipient email
    process.env.ADMIN_EMAIL_2  // Second recipient email
  ]
};

// Function to send report notification email
export const sendReportNotification = async (patientData) => {
  try {
    // Create transporter with better configuration
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false, // Use STARTTLS
      auth: {
        user: EMAIL_CONFIG.user,
        pass: EMAIL_CONFIG.pass
      },
      tls: {
        rejectUnauthorized: false
      },
      connectionTimeout: 60000, // 60 seconds
      greetingTimeout: 30000,   // 30 seconds
      socketTimeout: 60000      // 60 seconds
    });

    // Email HTML template
    const emailHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; margin: 0; padding: 20px; background-color: #f4f4f4; }
          .container { max-width: 600px; margin: 0 auto; background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px; text-align: center; margin-bottom: 30px; }
          .header h1 { margin: 0; font-size: 24px; }
          .content { line-height: 1.6; }
          .patient-info { background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .info-row { display: flex; justify-content: space-between; margin-bottom: 10px; padding: 8px 0; border-bottom: 1px solid #e9ecef; }
          .info-label { font-weight: bold; color: #495057; }
          .info-value { color: #212529; }
          .total-price { background: linear-gradient(135deg, #28a745, #20c997); color: white; padding: 15px; border-radius: 8px; text-align: center; font-size: 20px; font-weight: bold; margin: 20px 0; }
          .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e9ecef; color: #6c757d; font-size: 14px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🏥 New Patient Report Added</h1>
            <p>A new patient report has been successfully created in the system</p>
          </div>
          
          <div class="content">
            <div class="patient-info">
              <h2 style="color: #495057; margin-top: 0;">Patient Information</h2>
              
              <div class="info-row">
                <span class="info-label">👤 Patient Name:</span>
                <span class="info-value">${patientData.patientName}</span>
              </div>
              
              <div class="info-row">
                <span class="info-label">📱 Mobile Number:</span>
                <span class="info-value">${patientData.mobile}</span>
              </div>
              
              <div class="info-row">
                <span class="info-label">🎂 Age:</span>
                <span class="info-value">${patientData.age} years</span>
              </div>
              
              <div class="info-row">
                <span class="info-label">⚥ Gender:</span>
                <span class="info-value">${patientData.gender}</span>
              </div>
              
              ${patientData.collectedBy ? `
              <div class="info-row">
                <span class="info-label">👨‍⚕️ Collected By:</span>
                <span class="info-value">${patientData.collectedBy}</span>
              </div>
              ` : ''}
              
              ${patientData.refBy ? `
              <div class="info-row">
                <span class="info-label">🩺 Referred By:</span>
                <span class="info-value">${patientData.refBy}</span>
              </div>
              ` : ''}
              
              ${patientData.address ? `
              <div class="info-row">
                <span class="info-label">🏠 Address:</span>
                <span class="info-value">${patientData.address}</span>
              </div>
              ` : ''}
            </div>

            ${patientData.tests && patientData.tests.length > 0 ? `
            <div class="patient-info">
              <h2 style="color: #495057; margin-top: 0;">🧪 Tests Ordered</h2>
              ${patientData.tests.map((test, index) => `
                <div class="info-row">
                  <span class="info-label">${index + 1}. ${test.testName}</span>
                  <span class="info-value">₹${test.price}</span>
                </div>
              `).join('')}
            </div>
            ` : ''}

            <div class="total-price">
              💰 Total Amount: ₹${patientData.totalPrice}
            </div>
            
            <p style="color: #495057; margin-top: 30px;">
              This is an automated notification sent when a new patient report is added to the system. 
              Please log in to the system for complete details and further actions.
            </p>
          </div>
          
          <div class="footer">
            <p>📧 This is an automated email notification</p>
            <p>🕒 Sent on: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Email options
    const mailOptions = {
      from: {
        name: 'Medical Report System',
        address: EMAIL_CONFIG.user
      },
      to: EMAIL_CONFIG.recipients,
      subject: `🏥 New Patient Report - ${patientData.patientName} (₹${patientData.totalPrice})`,
      html: emailHTML,
      // Plain text version as fallback
      text: `
        New Patient Report Added
        
        Patient Name: ${patientData.patientName}
        Mobile: ${patientData.mobile}
        Age: ${patientData.age}
        Gender: ${patientData.gender}
        ${patientData.collectedBy ? `Collected By: ${patientData.collectedBy}` : ''}
        ${patientData.refBy ? `Referred By: ${patientData.refBy}` : ''}
        ${patientData.address ? `Address: ${patientData.address}` : ''}
        
        Total Amount: ₹${patientData.totalPrice}
        
        Date: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
      `
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    
    console.log('✅ Report notification email sent successfully:', info.messageId);
    console.log('📧 Email sent to:', EMAIL_CONFIG.recipients.join(', '));
    
    return {
      success: true,
      message: 'Email notification sent successfully',
      messageId: info.messageId
    };

  } catch (error) {
    console.error('❌ Error sending report notification email:', error);
    
    // Don't throw error - we don't want email failure to stop report creation
    return {
      success: false,
      message: 'Failed to send email notification',
      error: error.message
    };
  }
};