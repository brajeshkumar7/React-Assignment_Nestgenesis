"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { login } from "@/lib/api/auth";
import { useAuth } from "@/lib/auth/auth";
import Button from "@/components/ui/Button";

export default function LoginForm() {
  const [username, setUsername] = useState("emilys");
  const [password, setPassword] = useState("emilyspass");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const { setSession } = useAuth();
  const router = useRouter();
  const search = useSearchParams();

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (busy) return;
    setBusy(true); setError("");
    try {
      const user = await login(username.trim(), password);
      setSession(user);
      const next = search.get("next");
      router.replace(next?.startsWith("/") ? next : "/products");
    } catch (e) { setError(e instanceof Error ? e.message : "Unable to sign in. Please try again."); }
    finally { setBusy(false); }
  }

  return <form className="login-form" onSubmit={submit}>
    <label>Username<input value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="username" required /></label>
    <label>Password<input value={password} onChange={(e) => setPassword(e.target.value)} type="password" autoComplete="current-password" required /></label>
    {error && <div className="form-error" role="alert">{error}</div>}
    <Button className="login-submit" type="submit" disabled={busy}>{busy ? "Signing in…" : "Sign in to workspace"}</Button>
    <p className="login-hint">Demo access is prefilled. Use <b>emilys</b> / <b>emilyspass</b>.</p>
  </form>;
}
