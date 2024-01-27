import { stripe } from "@/app/pricing/_utils/stripe";
import { supabase } from "@/supabase";
import { NextResponse } from "next/server";

export async function POST(req) {
    const signature = req.headers.get('stripe-signature');
    const signingSecret = process.env.STRIPE_SIGNING_SECRET;
    let event;

    try {
        const rawBody = await req.text();
        event = stripe.webhooks.constructEvent(rawBody, signature, signingSecret);
    } catch (error) {
        console.log('Webhook signature verification failed', error.message);
        return NextResponse.json({status: 400})
    }

    try {
        switch (event.type) {
            case "customer.subscription.updated":
                await updateSubscription(event)
                break;
            case "customer.subscription.deleted":
                await deleteSubscription(event)
                break;
        
            default:
                break;
        }
    } catch (error) {
        console.log(error.message)
    }
    return NextResponse.json({success: true})
}

async function updateSubscription(event) {
    const subscription = event.data.object;
    const stripe_customer_id = subscription.customer;
    const subscription_status = subscription.status;
    const price = subscription.items.data[0].price.id;

    const { data: profile } = await supabase.from('profile').select('*').eq('stripe_customer_id', stripe_customer_id).single;

    if (profile) {
        const updatedSubscription = {
            subscription_status,
            price
        }
        await supabase.from('profile').update(updatedSubscription).eq('stripe_customer_id', stripe_customer_id);
    } else {
        const customer = await stripe.customers.retrieve(stripe_customer_id)
        const name = customer.name;
        const email = customer.email;
        const newProfile = {
            name,email,stripe_customer_id,
            subscription_status,price
        }
        await supabase.auth.admin.createUser({
            email,email_confirm: true,
            user_metadata: newProfile
        })
    }
}

async function deleteSubscription(event) {
    const subscription = event.data.object;
    const stripe_customer_id = subscription.customer;
    const subscription_status = subscription.status;

    const deletedSubscription = {
        subscription_status,
        price: null
    }
    await supabase.from('profile').update(deletedSubscription).eq('stripe_customer_id', stripe_customer_id);
}