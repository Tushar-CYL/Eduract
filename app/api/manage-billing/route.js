import { SITE_URL } from "@/app/_utils";
import { stripe } from "@/app/pricing/_utils/stripe";
import { supabase } from "@/supabase";
import { NextResponse } from "next/server";

export async function POST(req) {
  const { user_id } = await req.json();

  if (!user_id) {
    return NextResponse.json({ status: 401, message: "Unauthorized" });
  }

  const { data: profile } = await supabase
    .from("profile")
    .select("stripe_customer_id")
    .eq("user_id", user_id)
    .single();

  const session = await stripe.billingPortal.sessions.create({
    customer: profile.stripe_customer_id,
    return_url: SITE_URL,
  });

  return NextResponse.json({ url: session.url });
}
