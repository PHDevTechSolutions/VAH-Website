import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import path from "path";
import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

/**
 * ✅ REQUIRED FOR NODEMAILER ON VERCEL
 */
export const runtime = "nodejs";

/**
 * ✅ VERCEL-SAFE LOGO PATH
 */
const LOGO_PATH = path.join(
  process.cwd(),
  "public",
  "images",
  "vah-logo-2.png"
);

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const {
      fullName,
      company,
      email,
      phone,
      subject,
      message,
      website = "Ecoshift Corporation", // ✅ silent identifier
    } = data;

    if (!fullName || !email || !phone || !subject) {
      return NextResponse.json(
        { error: "Please fill in all required fields." },
        { status: 400 }
      );
    }

    /**
     * ✅ STORE TO FIRESTORE (same pattern as quote forms)
     */
    await addDoc(collection(db, "inquiries"), {
      fullName,
      company: company || null,
      email,
      phone,
      subject,
      message: message || null,
      website,
      createdAt: serverTimestamp(),
      status: "new",
    });

    /**
     * ✅ EMAIL ENV CHECK
     */
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      throw new Error("Missing EMAIL_USER or EMAIL_PASS");
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    /**
     * ✅ EMAIL TEMPLATE
     */
    const EmailCard = (content: string) => `
      <html>
        <body style="margin:0;padding:40px;background:#f4f4f4;font-family:Arial">
          <div style="max-width:640px;margin:auto;background:#fff;padding:32px;border-radius:12px">
            <div style="text-align:center;margin-bottom:24px">
              <img src="cid:vah-logo" width="150" />
            </div>
            ${content}
            <hr style="margin:32px 0;border:none;border-top:1px solid #e5e5e5" />
            <p style="font-size:12px;color:#777;text-align:center">
              © 2025 Value Acquisitions Holdings Inc.
            </p>
          </div>
        </body>
      </html>
    `;

    /**
     * ✅ ADMIN EMAIL
     */
    await transporter.sendMail({
      from: `"Value Acquisitions Holdings Inc." <${process.env.EMAIL_USER}>`,
      to: "valueacquisitionsholdings@gmail.com",
      subject: `📩 [${website.toUpperCase()}] New Website Inquiry — ${fullName}`,
      attachments: [
        {
          filename: "vah-logo-2.png",
          path: LOGO_PATH,
          cid: "vah-logo",
        },
      ],
      html: EmailCard(`
        <h2>New Website Inquiry</h2>
        <p><strong>Website:</strong> ${website}</p>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Company:</strong> ${company || "N/A"}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p style="white-space:pre-line">${message || "N/A"}</p>
      `),
    });

    /**
     * ✅ AUTO-REPLY EMAIL
     */
    await transporter.sendMail({
      from: `"Value Acquisitions Holdings Inc." <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Thank you for contacting us",
      attachments: [
        {
          filename: "vah-logo-2.png",
          path: LOGO_PATH,
          cid: "vah-logo",
        },
      ],
      html: EmailCard(`
        <h2>Thank You for Contacting Us</h2>
        <p>
          Hi <strong>${fullName}</strong>,<br /><br />
          We have received your inquiry and our team will get back to you shortly.
        </p>
        <p>
          Best regards,<br />
          <strong>Value Acquisitions Holdings Inc.</strong>
        </p>
      `),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("CONTACT API ERROR:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}
