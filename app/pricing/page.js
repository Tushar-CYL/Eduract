import React from 'react'
import { stripe } from './_utils/stripe';
import Plans from './_components/Plans';
import Benefits from './_components/Benefits';

export async function getPlans() {
    let {data: prices} = await stripe.prices.list();
    prices = prices.slice(0,prices.length - 2);
    const plans = [];

    for (const price of prices) {
        const product = await stripe.products.retrieve(price.product);

        plans.push({
            name: product.name,
            id: price.id,
            price: price.unit_amount / 100,
            interval: price.recurring.interval
        })
    }

    return plans;
}

const Pricing = async () => {
const plans = await getPlans();

return (
    <div className='grid-halves h-screen-navbar'>
    <Plans plans={plans} />
    <Benefits />
    </div>
  )
}

export default Pricing