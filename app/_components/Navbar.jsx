"use client";

import Link from "next/link";
import Logo from "./Logo";
import { supabase } from "@/supabase";
import { useEffect, useState } from "react";
import { SITE_URL } from "../_utils";

export default function Navbar() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const getData = async () => {
      const { data, error } = await supabase.auth.getSession();

      setSession(data.session);
    };

    getData();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    setSession(null);
  }

  const onManageBilling = async ()=>{
    const response = await fetch(`${SITE_URL}/api/manage-billing`, {
      body: JSON.stringify({
        user_id: session.user.id
      }),
      method: 'POST',
    });
    const data = await response.json();
    if (data) {
      window.location.href = data.url;
    }
  }

  return (
    <div className="nav-container border-b-2 border-black">
      <Link href={"/"}>
        <Logo />
      </Link>
      {session ? (
        <div className="nav-menu">
          <Link
            href={"/products"}
            className="Link nav-link white"
          >
            <div>Products</div>
          </Link>
          <a onClick={onManageBilling} className="nav-link border-left white">
            <div>Billing</div>
          </a>
          <div className="nav-link black" onClick={signOut}>
            <div>Sign out</div>
          </div>
        </div>
      ) : (
        <div className="nav-menu">
          <Link
            href={"/login"}
            className="Link nav-link white"
          >
            <div>Login</div>
          </Link>
          <Link
            href={"/pricing"}
            className="nav-link black"
          >
            <div>Pricing</div>
          </Link>
        </div>
      )}
    </div>
  );
}
