import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'
import User from '@/src/models/User'
import connectDB from '@/src/lib/mongodb'
import nodemailer from 'nodemailer'

export async function POST(req: Request) {
    try {
        const { name, email, password } = await req.json()

        await connectDB()

        const userExists = await User.findOne({ email })
        if (userExists) {
        return NextResponse.json({ error: 'User already exists' }, { status: 400 })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await User.create({ name, email, password: hashedPassword })

        // Configurar transporte de correo
        const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
        })

        // HTML del correo con datos dinámicos
        const htmlContent = `
        <!DOCTYPE html>
            <html lang="en">
            <head>
            <meta charset="UTF-8" />
            <title>Welcome to Moreci Shop</title>
            <style>
                body {
                font-family: 'Poppins', sans-serif;
                background: linear-gradient(135deg, #004d40, #00bfa5);
                color: #fff;
                margin: 0;
                padding: 0;
                text-align: center;
                }
                .container {
                max-width: 600px;
                margin: 40px auto;
                background: #ffffff0e;
                backdrop-filter: blur(10px);
                border-radius: 20px;
                padding: 40px 30px;
                box-shadow: 0 0 20px rgba(0, 255, 100, 0.3);
                }
                .logo {
                font-size: 40px;
                font-weight: 800;
                color: #b9ffb0;
                letter-spacing: 2px;
                text-shadow: 0 0 10px #00ff99, 0 0 20px #00ff99;
                }
                h2 {
                color: #d2ffd2;
                font-size: 28px;
                margin-top: 20px;
                }
                p {
                font-size: 16px;
                color: #caffca;
                line-height: 1.6;
                }
                .credentials {
                background: rgba(0, 0, 0, 0.2);
                border: 1px solid #00ff99;
                border-radius: 12px;
                padding: 20px;
                margin: 30px 0;
                }
                .credentials p {
                color: #e0ffe0;
                margin: 5px 0;
                font-weight: 600;
                }
                .button {
                display: inline-block;
                background: #00ff99;
                color: #003322;
                text-decoration: none;
                padding: 12px 30px;
                border-radius: 50px;
                font-weight: 700;
                letter-spacing: 1px;
                transition: all 0.3s ease;
                }
                .button:hover {
                background: #b9ffb0;
                transform: scale(1.05);
                }
                footer {
                margin-top: 40px;
                font-size: 13px;
                color: #aaffaa;
                }
            </style>
            </head>
            <body>
            <div class="container">
                <div class="logo">MORECI SHOP</div>
                <h2>Welcome to the family!</h2>
                <p>
                Your account has been successfully created.  
                At Moreci Shop, we believe every purchase should be an epic experience.
                </p>
                <div class="credentials">
                <p><strong>Email:</strong> ${email}</p>
                </div>
                <a href="https://moreci-shop.vercel.app/login" class="button">
                Log In
                </a>
                <footer>
                © 2025 Moreci Shop · All rights reserved · Medellín
                </footer>
            </div>
            </body>
            </html>

        `

        await transporter.sendMail({
        from: `"Moreci Shop" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: ' Bienvenido a Moreci Shop',
        html: htmlContent,
        })

        return NextResponse.json({
        message: 'User created and welcome email sent successfully',
        user: newUser,
        })
    } catch (error) {
        console.error(error)
        return NextResponse.json({ error: 'Error creating user' }, { status: 500 })
    }
}


