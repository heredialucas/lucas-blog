import { EmailTemplate } from "@/components/custom/emailTemplate";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  const { name, email, message } = await req.json();

  if (!name || !email || !message) {
    return Response.json(
      {
        error: "Name, email, and message are required",
      },
      { status: 400 }
    );
  }

  try {
    const { data, error } = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      reply_to: email,
      to: ["heredialucasfac22@gmail.com"],
      subject: `Contact from Portfolio - ${name}`,
      react: EmailTemplate({ name, email, message }),
    });

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
