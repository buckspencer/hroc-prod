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
export async function POST(req: NextRequest, res: NextResponse) {
  try {
    if (req.method !== 'POST') {
      throw new Error('Method Not Allowed');
    }

    // Assuming req.body is already parsed correctly (e.g., using middleware)
    const { name, email, message }: FormData = req.body;

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
    res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
}
