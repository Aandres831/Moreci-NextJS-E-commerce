import nodemailer from 'nodemailer';

// Configurar transporter (ejemplo con Gmail)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD,
    },
});

export async function sendAbandonedCartEmail(userEmail: string, cartData: any) {
    const { items, userName } = cartData;
    const total = items.reduce((sum: number, item: any) => sum + (item.price * item.quantity), 0);
    
    const itemsHtml = items.map((item: any) => `
        <div style="border: 1px solid #ddd; padding: 15px; margin: 10px 0; border-radius: 8px; background: white;">
            <h3 style="margin: 0 0 10px 0; color: #333;">${item.name}</h3>
            <p style="margin: 5px 0; color: #666;">Precio: $${item.price}</p>
            <p style="margin: 5px 0; color: #666;">Cantidad: ${item.quantity}</p>
            <p style="margin: 5px 0; font-weight: bold; color: #10B981;">Subtotal: $${(item.price * item.quantity).toFixed(2)}</p>
        </div>
    `).join('');

    const mailOptions = {
        from: `Moreci Shop <${process.env.EMAIL_USER}>`,
        to: userEmail,
        subject: '🛒 ¿Olvidaste algo en tu carrito? - Moreci Shop',
        html: `
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset="utf-8">
                <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                    .header { background: #10B981; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
                    .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 8px 8px; }
                    .button { background: #10B981; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; }
                    .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 14px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="header">
                        <h1>Moreci Shop</h1>
                    </div>
                    <div class="content">
                        <h2>Hola ${userName},</h2>
                        <p>Vimos que tenías algunos productos increíbles en tu carrito y no queríamos que te los pierdas.</p>
                        
                        <h3>Tu carrito guardado:</h3>
                        ${itemsHtml}
                        
                        <div style="background: white; padding: 15px; border-radius: 8px; margin: 20px 0; border: 2px solid #10B981;">
                            <h3 style="margin: 0; color: #10B981;">Total: $${total.toFixed(2)}</h3>
                        </div>

                        <div style="text-align: center; margin: 30px 0;">
                            <a href="${process.env.NEXTAUTH_URL}" class="button">
                                Continuar con mi compra
                            </a>
                        </div>

                        <p style="color: #666;">
                            Este es un email automático. Si ya completaste tu compra, puedes ignorar este mensaje.
                        </p>
                    </div>
                    <div class="footer">
                        <p>Gracias por elegir Moreci Shop</p>
                        <p><small>Si tienes alguna pregunta, contáctanos en ${process.env.EMAIL_USER}</small></p>
                    </div>
                </div>
            </body>
            </html>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log(`✅ Email real enviado a: ${userEmail}`);
        return true;
    } catch (error) {
        console.error(`❌ Error enviando email real a ${userEmail}:`, error);
        throw error;
    }
}