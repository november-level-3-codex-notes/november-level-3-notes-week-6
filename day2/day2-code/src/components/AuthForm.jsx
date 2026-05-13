import React, { useState } from "react";
import { supabase } from "../utils/supabase";
import "./AuthForm.css";

function AuthForm({ setCurrentUser, currentUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function clearForm() {
    setEmail("");
    setPassword("");
  }

  async function signup() {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    if (data.session) {
      setCurrentUser(data.user);
    }
  }

  async function signin() {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    setCurrentUser(data.user);
  }

  async function logout() {
    await supabase.auth.signOut();
    setCurrentUser(null);
    clearForm();
  }

  return (
    <div className="auth-container">
      {!currentUser && (
        <>
          {" "}
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button onClick={signup}>Signup</button>
          <button onClick={signin}>Signin</button>
        </>
      )}

      {currentUser && <button onClick={logout}>Logout</button>}
    </div>
  );
}

export default AuthForm;
