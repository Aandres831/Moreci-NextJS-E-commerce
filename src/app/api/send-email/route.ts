import { NextResponse } from 'next/server';
import { transporter, mailOptions } from '@/lib/mailer';

export async function POST(req: Request) {
    try {
        const { to, subject, message } = await req.json();

        await transporter.sendMail({
        ...mailOptions,
        to,
        subject,
        text: message,
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error });
    }
}
