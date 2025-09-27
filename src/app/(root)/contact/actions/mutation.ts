"use server";

import { render } from "@react-email/components";
import nodemailer from "nodemailer";

import ContactFormSubmission from "../email/contact-template";
import { contactSchema } from "../schema/contact-schema";

export type ContactActionResult = { success: boolean; error?: string };

export async function sendContactEmail(values: unknown): Promise<ContactActionResult> {


  // Validate data
  const {success, data} = contactSchema.safeParse(values);

  if (!success) {
    return { success: false, error: "Invalid form data" };
  }

  // Configure transporter
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const emailHtml = await render(ContactFormSubmission({data}) );

  // Compose email
  const mailOptions = {
    from: `${data.name} <${process.env.EMAIL_USER}>`,
    replyTo: data?.email,
    to: process.env.CONTACT_RECEIVER_EMAIL,
    subject:  "New Contact Form Submission",
    html: emailHtml,
  };

  try {
    await transporter.sendMail(mailOptions);

    return { success: true };
  } catch (_error) {
    return { success: false, error: "Failed to send email" };
  }
}
