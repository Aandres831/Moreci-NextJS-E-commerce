import { NextRequest } from "next/server";
import {
  processAbandonedCarts,
  cleanupProcessedCarts,
} from "@/lib/cronService";
import { sendAbandonedCartEmail } from "@/lib/emailService";

export async function GET(request: NextRequest) {
  try {
    console.log("🕐 Ejecutando cron job de carritos abandonados");

    const cartsToProcess = await processAbandonedCarts();

    let processedCount = 0;
    let errorCount = 0;
    const processedEmails: string[] = [];

    for (const cart of cartsToProcess) {
      try {
        await sendAbandonedCartEmail(cart.userEmail, cart);

        processedEmails.push(cart.userEmail);
        processedCount++;

        console.log(`✅ Email enviado a: ${cart.userEmail}`);
      } catch (error) {
        console.error(`❌ Error enviando email a ${cart.userEmail}:`, error);
        errorCount++;
      }
    }

    if (processedEmails.length > 0) {
      await cleanupProcessedCarts(processedEmails);
    }

    return Response.json({
      success: true,
      message: `Procesados ${processedCount} carritos abandonados`,
      processed: processedCount,
      errors: errorCount,
      cleaned: processedEmails.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Error en cron job:", error);
    return Response.json(
      {
        success: false,
        error: "Error procesando cron jobs",
      },
      { status: 500 }
    );
  }
}
