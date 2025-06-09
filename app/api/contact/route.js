import nodemailer from 'nodemailer';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { name, email, subject, message } = await request.json();

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    // Create transporter (configure with your email service)
    // For Gmail, you'll need to use an App Password
    const transporter = nodemailer.createTransport({
      service: 'gmail', // You can change this to your preferred email service
      auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS, // Your app password
      },
    });

    // Alternative configuration for other email services
    // const transporter = nodemailer.createTransporter({
    //   host: 'smtp.your-email-provider.com',
    //   port: 587,
    //   secure: false,
    //   auth: {
    //     user: process.env.EMAIL_USER,
    //     pass: process.env.EMAIL_PASS,
    //   },
    // });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'imrantyagi201@gmail.com',
      subject: `Contact Form: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 20px 20px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">Global Labs</h1>
            <p style="color: #e2e8f0; margin: 10px 0 0 0; font-size: 16px;">New Contact Form Submission</p>
          </div>
          
          <div style="background: white; padding: 40px; border-radius: 0 0 20px 20px; box-shadow: 0 10px 25px rgba(0,0,0,0.1);">
            <div style="margin-bottom: 30px;">
              <h2 style="color: #1e293b; margin: 0 0 20px 0; font-size: 22px; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px;">Contact Information</h2>
              
              <div style="margin-bottom: 20px;">
                <strong style="color: #475569; display: inline-block; width: 80px;">Name:</strong>
                <span style="color: #1e293b; font-size: 16px;">${name}</span>
              </div>
              
              <div style="margin-bottom: 20px;">
                <strong style="color: #475569; display: inline-block; width: 80px;">Email:</strong>
                <a href="mailto:${email}" style="color: #3b82f6; text-decoration: none; font-size: 16px;">${email}</a>
              </div>
              
              <div style="margin-bottom: 20px;">
                <strong style="color: #475569; display: inline-block; width: 80px;">Subject:</strong>
                <span style="color: #1e293b; font-size: 16px;">${subject}</span>
              </div>
            </div>
            
            <div>
              <h3 style="color: #1e293b; margin: 0 0 15px 0; font-size: 18px; border-bottom: 2px solid #e2e8f0; padding-bottom: 8px;">Message</h3>
              <div style="background: #f8fafc; padding: 20px; border-radius: 12px; border-left: 4px solid #3b82f6;">
                <p style="color: #374151; line-height: 1.6; margin: 0; font-size: 16px; white-space: pre-wrap;">${message}</p>
              </div>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; text-align: center;">
              <p style="color: #6b7280; font-size: 14px; margin: 0;">
                This email was sent from the Global Labs contact form
              </p>
              <p style="color: #9ca3af; font-size: 12px; margin: 5px 0 0 0;">
                ${new Date().toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            </div>
          </div>
        </div>
      `,
      // Plain text version for email clients that don't support HTML
      text: `
        New Contact Form Submission - Global Labs
        
        Name: ${name}
        Email: ${email}
        Subject: ${subject}
        
        Message:
        ${message}
        
        Sent on: ${new Date().toLocaleString()}
      `,
    };

    // Auto-reply to the sender
    const autoReplyOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thank you for contacting Global Labs',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8fafc;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 20px 20px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px; font-weight: bold;">Global Labs</h1>
            <p style="color: #e2e8f0; margin: 10px 0 0 0; font-size: 16px;">Thank you for reaching out!</p>
          </div>
          
          <div style="background: white; padding: 40px; border-radius: 0 0 20px 20px; box-shadow: 0 10px 25px rgba(0,0,0,0.1);">
            <h2 style="color: #1e293b; margin: 0 0 20px 0; font-size: 22px;">Hi ${name}!</h2>
            
            <p style="color: #374151; line-height: 1.6; font-size: 16px; margin-bottom: 20px;">
              Thank you for contacting Global Labs. We have received your message and will get back to you as soon as possible.
            </p>
            
            <div style="background: #f0f9ff; padding: 20px; border-radius: 12px; border-left: 4px solid #3b82f6; margin: 20px 0;">
              <p style="color: #1e40af; margin: 0; font-weight: 600;">Your message summary:</p>
              <p style="color: #1e293b; margin: 10px 0 0 0;"><strong>Subject:</strong> ${subject}</p>
            </div>
            
            <p style="color: #374151; line-height: 1.6; font-size: 16px; margin: 20px 0;">
              We typically respond within 24 hours during business days. If your inquiry is urgent, please don't hesitate to reach out to us directly.
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="mailto:imrantyagi201@gmail.com" style="display: inline-block; background: linear-gradient(135deg, #3b82f6, #8b5cf6); color: white; padding: 12px 24px; border-radius: 12px; text-decoration: none; font-weight: 600;">
                Contact Us Directly
              </a>
            </div>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; text-align: center;">
              <p style="color: #6b7280; font-size: 14px; margin: 0;">
                Best regards,<br>
                The Global Labs Team
              </p>
            </div>
          </div>
        </div>
      `,
      text: `
        Hi ${name}!
        
        Thank you for contacting Global Labs. We have received your message and will get back to you as soon as possible.
        
        Your message summary:
        Subject: ${subject}
        
        We typically respond within 24 hours during business days. If your inquiry is urgent, please don't hesitate to reach out to us directly at imrantyagi201@gmail.com.
        
        Best regards,
        The Global Labs Team
      `,
    };

    // Send both emails
    await transporter.sendMail(mailOptions);
    await transporter.sendMail(autoReplyOptions);

    return NextResponse.json(
      { success: 'Email sent successfully' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email. Please try again later.' },
      { status: 500 }
    );
  }
}