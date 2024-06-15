// Import necessary modules and libraries
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Define a TypeScript interface for your form data
interface FormData {
  name: string;
  email: string;
  message: string;
}

// Define your API handler function
export async function POST(req: NextRequest) {
  try {
    // Ensure that the request method is POST
    if (req.method !== 'POST') {
      return NextResponse.json({ error: 'Method Not Allowed' }, { status: 405 });
    }

    // Parse the request body
    const body = await req.json();
    const { name, email, message }: FormData = body;

    // Create a SMTP transporter
    const transporter = nodemailer.createTransport({
      host: 'smtp.example.com',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'your-email@example.com',
        pass: 'your-email-password',
      },
    });

    // Send mail with defined transport object
    const info = await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: 'recipient@example.com',
      subject: 'New Message from Contact Form',
      text: message,
    });

    console.log('Message sent: %s', info.messageId);
    return NextResponse.json({ message: 'Message sent successfully' });
  } catch (error: any) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
