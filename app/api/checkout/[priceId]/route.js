import { SITE_URL } from "@/app/_utils";
import { stripe } from "@/app/pricing/_utils/stripe";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    const {priceId} = params;
    const session = await stripe.checkout.sessions.create({
        mode: 'subscription',
        payment_method_types: ['card'],
        line_items: [{ price: priceId, quantity: 1 }],
        success_url: `${SITE_URL}/success`,
        cancel_url: `${SITE_URL}/pricing`
    })
    return NextResponse.json({id: session.id})
}