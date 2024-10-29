import { EmailTemplate } from "@/app/[domain]/contact/emailTemplate";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.AUTH_RESEND_KEY);

export async function POST(req) {
  const { name, email, userEmail, message } = await req.json();

  if (!name || !email || !message) {
    return NextResponse.json(
      {
        message: "Name, email, and message are required",
      },
      { status: 400 }
    );
  }

  try {
    const { data, error } = await resend.emails.send({
      from: "Blogui.me <support@blogui.me>",
      reply_to: email,
      to: [userEmail],
      subject: `Contact from Portfolio - ${name}`,
      react: EmailTemplate({ name, email, message }),
    });

    if (error) {
      return NextResponse.json({ error }, { status: 500 });
    }

    return NextResponse.json({ data, message: "Email sent successfully" });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to send email" },
      { status: 500 }
    );
  }
}
