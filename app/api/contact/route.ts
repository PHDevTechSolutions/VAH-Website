import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // Ensure all required fields are present
    const { fullName, company, email, phone, subject, message } = data;
    if (!fullName || !email || !phone || !subject) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    // Create Nodemailer transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send email
    await transporter.sendMail({
      from: `"Website Contact Form" <${process.env.EMAIL_USER}>`,
      to: "ariesjaceu@gmail.com",
      subject: `New Inquiry: ${subject}`,
      html: `
        <h2>New Website Inquiry</h2>
        <p><strong>Full Name:</strong> ${fullName}</p>
        <p><strong>Company:</strong> ${company || "N/A"}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong><br>${message || "N/A"}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("EMAIL ERROR:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}
