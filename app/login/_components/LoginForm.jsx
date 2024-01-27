"use client";

import { supabase } from "@/supabase";
import { useState } from "react";

const LoginForm = ({setSubmitted}) => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (event) => {
    setIsLoading(true);
    event.preventDefault();
    const email = event.target.elements.email.value;
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: false,
        emailRedirectTo: window.location.origin,
      },
    });

    if (error) {
      setError(error.message);
    } else {
      setError("");
      setSubmitted(email);
    }
    setIsLoading(false);
  };

  return (
    <form
      onSubmit={onSubmit}
      className="content-grid home-hero"
    >
      {error && (
        <div
          className="danger"
          role="alert"
        >
          {error}
        </div>
      )}
      <h1>Welcome back</h1>
      <div className="email-input">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          autoComplete="email"
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
      >
        <div className="large-button-text">{isLoading?"Logging in...":"Login"}</div>
      </button>
    </form>
  );
};

export default LoginForm;
