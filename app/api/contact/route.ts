import { NextResponse } from "next/server";

interface ContactRequestBody {
  name: string;
  email: string;
  subject?: string;
  track?: string;
  message: string;
}

export async function POST(req: Request) {
  try {
    const body: ContactRequestBody = await req.json();
    const { name, email, subject, track, message } = body;

    // Validation
    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid name." },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { success: false, error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length < 5) {
      return NextResponse.json(
        { success: false, error: "Message must contain at least 5 characters." },
        { status: 400 }
      );
    }

    // Log contact payload for observability
    const timestamp = new Date().toISOString();
    console.log(`[Contact Submission - ${timestamp}] from ${name} <${email}>`);
    console.log(`[Track]: ${track || "General"} | [Subject]: ${subject || "None"}`);
    console.log(`[Message]: ${message}`);

    // If a webhook or mail provider key exists in the environment, dispatch it
    if (process.env.DISCORD_WEBHOOK_URL) {
      try {
        await fetch(process.env.DISCORD_WEBHOOK_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            content: `📬 **New Portfolio Contact Submission**\n**From:** ${name} (${email})\n**Track:** ${track || "General"}\n**Subject:** ${subject || "N/A"}\n**Message:**\n${message}`,
          }),
        });
      } catch (webhookErr) {
        console.error("Failed to forward message to Discord webhook:", webhookErr);
      }
    }

    return NextResponse.json(
      {
        success: true,
        message: "Your message has been received successfully. We will be in touch shortly!",
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("Contact API error:", err);
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred while processing your request.",
      },
      { status: 500 }
    );
  }
}
