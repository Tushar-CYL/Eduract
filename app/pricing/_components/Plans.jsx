"use client";

import { useState } from "react";
import { SITE_URL } from "@/app/_utils";
import { loadStripe } from "@stripe/stripe-js";

const Plans = ({ plans }) => {
  const [selected, setSelected] = useState("month");
  const [isRedirecting, setIsRedirecting] = useState(false)
  const plan = plans.find((plan) => plan.interval === selected);

  const togglePlan = () => {
    const interval = selected === "month" ? "year" : "month";
    setSelected(interval);
  };

  const onCheckout = async () => {
    setIsRedirecting(true);
    const response = await fetch(`${SITE_URL}/api/checkout/${plan.id}`);
    const data = await response.json();
    const stripe = await loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
    await stripe.redirectToCheckout({sessionId: data.id});
    setIsRedirecting(false);
  }

  return (
    <div className="bg-salmon border-right">
      <div className="column-padding centered">
        <div className="callout-wrap">
          <div className="plan">
            <div className="plan-wrap">
              <div className="plan-content">
                <div className="plan-switch">
                  Monthly
                  <label className="switch">
                    <input
                      type="checkbox"
                      onChange={togglePlan}
                    />
                    <span className="slider" />
                  </label>
                  Yearly
                </div>
                <h2 className="plan-name">{plan.name}</h2>
                <div>
                  Just ₹{plan.price} / {plan.interval}
                </div>
                <div>
                  <button disabled={isRedirecting} className="large-button">
                    <div className="large-button-text" onClick={onCheckout}>{isRedirecting?"Loading...":"Buy Now"}</div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Plans;
