import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

transporter.verify((error, success) => {
    if (error) {
        console.error("Error al conectar con Gmail:", error);
    } else {
        console.log("Servidor de correo listo");
    }
});

export const mailOptions = {
    from: process.env.EMAIL_USER,
};

console.log("PASS LENGTH:", process.env.EMAIL_PASS?.length);

