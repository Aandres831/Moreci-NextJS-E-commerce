import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER, // tu correo Gmail
        pass: process.env.EMAIL_PASS, // tu contraseña de aplicación
    },
});

export const mailOptions = {
    from: process.env.EMAIL_USER,
};
