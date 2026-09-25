"use client";

import { Suspense } from "react";
import LoginForm from "@/components/auth/LoginForm";
import Loading from "@/components/ui/Loading";

export default function LoginPage() {
  return <main className="login-page"><section className="login-visual"><div className="login-brand">atelier<span>.</span></div><div className="visual-copy"><span className="eyebrow light">THE COMMERCE WORKSPACE</span><h1>Make room for<br /><em>great products.</em></h1><p>A calmer way to curate, manage, and grow your catalog.</p></div><div className="visual-footer"><span>PRODUCTS, THOUGHTFULLY MANAGED</span><span>01 / 04</span></div><div className="visual-art"><div className="art-disc" /><div className="art-card art-card-one" /><div className="art-card art-card-two" /><div className="art-line" /></div></section><section className="login-panel"><div className="login-panel-content"><div className="mobile-login-brand">atelier<span>.</span></div><div className="login-heading"><span className="eyebrow">WELCOME BACK</span><h2>Sign in to Atelier</h2><p>Enter your details to access your workspace.</p></div><Suspense fallback={<Loading label="Loading sign in" />}><LoginForm /></Suspense><div className="login-legal">By continuing, you agree to our <a href="#">Terms</a> and <a href="#">Privacy Policy</a>.</div></div><div className="login-panel-footer">© 2025 Atelier Commerce</div></section></main>;
}
