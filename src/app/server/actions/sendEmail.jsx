import { EmailTemplate } from "@/app/[domain]/contact/emailTemplate";
import { Resend } from "resend";

const resend = new Resend(process.env.AUTH_RESEND_KEY);

export async function sendEmail(formData, email) {
  const rawFormData = Object.fromEntries(formData);

  const { name, email: userEmail, message } = rawFormData;

  if (!name || !email || !message) {
    return { success: false, message: "All fields are required" };
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
      return { success: false, message: "Failed to send email" };
    }

    return { success: true, data, message: "Email sent successfully" };
  } catch (error) {
    return { success: false, message: "Failed to send email" };
  }
}
