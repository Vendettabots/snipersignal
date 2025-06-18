import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // Verify environment variables
    if (!process.env.NOWPAYMENTS_API_KEY || !process.env.NEXT_PUBLIC_SITE_URL) {
      throw new Error("Server configuration is incomplete");
    }

    const { productName, amount } = await req.json();

    // Validate amount
    const numericAmount = Number(amount);
    if (isNaN(numericAmount)) {
      throw new Error("Invalid amount format");
    }

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;
    const payload = {
      price_amount: numericAmount.toFixed(2),
      price_currency: "usd",
      pay_currency: "usdt",
      ipn_callback_url: `${baseUrl}/api/nowpayments-webhook`,
      order_id: `order_${Date.now()}`,
      order_description: productName,
      success_url: `${baseUrl}/success`,
      cancel_url: `${baseUrl}/cancel`,
      is_fixed_rate: true,
      is_fee_paid_by_user: true
    };

    console.log("Sending payload:", payload);

    const res = await fetch("https://api.nowpayments.io/v1/invoice", {
      method: "POST",
      headers: {
        "x-api-key": process.env.NOWPAYMENTS_API_KEY,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const data = await res.json();
    
    if (!res.ok) {
      console.error("API Error Response:", data);
      throw new Error(data.message || `Payment failed with status ${res.status}`);
    }

    return NextResponse.json(data);

  } catch (error: any) {
    console.error("Full payment error:", error);
    return NextResponse.json(
      { 
        error: error.message || "Payment processing failed",
        suggestion: "Please check your server configuration and try again"
      },
      { status: 500 }
    );
  }
}