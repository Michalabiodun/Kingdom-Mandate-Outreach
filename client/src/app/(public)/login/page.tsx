"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";

export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const nameFromEmail = email.split("@")[0]?.replace(/[._-]+/g, " ").trim();
        const name = nameFromEmail ? nameFromEmail.replace(/\b\w/g, (char) => char.toUpperCase()) : "Leader";
        sessionStorage.setItem(
            "km-auth",
            JSON.stringify({
                name,
                email: email || "leader@kingdommandate.org",
                role: "Member",
            }),
        );
        sessionStorage.setItem("km-onboarding", "false");
        window.dispatchEvent(new Event("km-session"));
        router.push("/dashboard");
    };

    return (
        <div className="font-(family-name:--font-manrope) min-h-screen flex flex-col">
            <main className="flex-1 flex items-center justify-center p-6 bg-pattern relative overflow-hidden">
                {/* Animated Background Blur Blobs (Visual Decoration) */}
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-(--reg-primary)/10 rounded-full blur-[100px] pointer-events-none"></div>
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-400/10 rounded-full blur-[120px] pointer-events-none"></div>
                {/* Glassmorphic Modal */}
                <div className="glass-modal w-full max-w-[480px] rounded-xl p-8 md:p-12 relative z-10">
                    {/* Logo & Headline */}
                    <div className="text-center mb-8">
                        <h1 className="text-[#0e121b] text-3xl font-bold leading-tight tracking-tight">
                            Welcome Back
                        </h1>
                        <p className="text-[#4f6696] text-sm mt-2">
                            Access your spiritual leadership portal
                        </p>
                    </div>
                    {/* Login Form */}
                    <form className="space-y-5" onSubmit={handleSubmit}>
                        {/* Email Field */}
                        <div className="flex flex-col gap-2">
                            <label className="text-[#0e121b] text-sm font-bold ml-1">
                                Email Address
                            </label>
                            <div className="relative flex items-center">
                                <input
                                    className="glass-input w-full h-14 rounded-lg px-4 pr-12 text-[#0e121b] placeholder:text-[#4f6696] focus:ring-2 focus:ring-(--reg-primary)/50 focus:border-(--reg-primary) outline-none transition-all"
                                    placeholder="name@ministry.org"
                                    type="email"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                />
                                <div className="absolute right-4 text-[#4f6696]">
                                    <span className="material-symbols-outlined">mail</span>
                                </div>
                            </div>
                        </div>
                        {/* Password Field */}
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-between items-center ml-1">
                                <label className="text-[#0e121b] text-sm font-bold">
                                    Password
                                </label>
                                <button
                                    className="text-(--reg-primary) text-xs font-bold hover:underline"
                                    type="button"
                                >
                                    Forgot Password?
                                </button>
                            </div>
                            <div className="relative flex items-center">
                                <input
                                    className="glass-input w-full h-14 rounded-lg px-4 pr-12 text-[#0e121b] placeholder:text-[#4f6696] focus:ring-2 focus:ring-(--reg-primary)/50 focus:border-(--reg-primary) outline-none transition-all"
                                    placeholder="••••••••"
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(event) => setPassword(event.target.value)}
                                />
                                <button
                                    className="absolute right-4 text-[#4f6696] hover:text-(--reg-primary) transition-colors"
                                    type="button"
                                    onClick={() => setShowPassword((value) => !value)}
                                >
                                    <span className="material-symbols-outlined">
                                        {showPassword ? "visibility_off" : "visibility"}
                                    </span>
                                </button>
                            </div>
                        </div>
                        {/* Login Button */}
                        <button
                            className="glow-button w-full h-14 bg-(--reg-primary) text-white font-bold rounded-lg mt-4 hover:bg-(--reg-primary)/90 transition-all flex items-center justify-center gap-2 group"
                            type="submit"
                        >
                            Login to Portal
                        </button>
                    </form>
                    {/* Divider */}
                    <div className="flex items-center gap-4 my-8">
                        <div className="h-px flex-1 bg-white/40"></div>
                        <span className="text-xs font-bold text-[#4f6696] uppercase tracking-widest">
                            Or continue with
                        </span>
                        <div className="h-px flex-1 bg-white/40"></div>
                    </div>
                    {/* Social Logins */}
                    <div className="grid grid-cols-2 gap-4">
                        <button className="glass-tile flex items-center justify-center gap-3 h-14 rounded-lg">
                            <svg className="size-5 text-[#0e121b]" fill="currentColor" viewBox="0 0 24 24">
                            </svg>
                            <span className="text-sm font-bold text-[#0e121b]">Google</span>
                        </button>
                        <button className="glass-tile flex items-center justify-center gap-3 h-14 rounded-lg">
                            <span className="material-symbols-outlined text-[#0e121b] text-2xl">ios</span>
                            <span className="text-sm font-bold text-[#0e121b]">Apple</span>
                        </button>
                    </div>
                    <p className="mt-8 text-sm text-[#4f6696] font-medium text-center">
                        Don&#39;t have an account?{" "}
                        <Link
                            className="text-(--reg-primary) font-bold hover:underline"
                            href="/register"
                        >
                            Register
                        </Link>
                    </p>
                </div>
            </main>
        </div>
    );
}
