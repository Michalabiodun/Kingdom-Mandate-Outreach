"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";

export default function Register() {
    const router = useRouter();
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const apiBaseUrl = process.env.NEXT_PUBLIC_SERVER_URL ?? "http://localhost:3000";

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setErrorMessage("");
        if (!fullName || !email || !password || !confirmPassword) {
            setErrorMessage("All fields are required.");
            return;
        }
        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match.");
            return;
        }
        setIsSubmitting(true);
        try {
            const response = await fetch(`${apiBaseUrl}/api/auth/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ fullName, email, password }),
            });
            const payload = (await response.json()) as {
                message?: string;
                token?: string;
                user?: { name: string; email: string; role: string };
            };
            if (!response.ok || !payload.user || !payload.token) {
                throw new Error(payload.message || "Registration failed.");
            }
            sessionStorage.setItem("km-auth", JSON.stringify(payload.user));
            sessionStorage.setItem("km-token", payload.token);
            sessionStorage.setItem("km-onboarding", "true");
            sessionStorage.setItem(
                "km-preferences",
                JSON.stringify({ focus: "Leadership", track: "Foundation" }),
            );
            window.dispatchEvent(new Event("km-session"));
            router.push("/dashboard");
        } catch (error) {
            const message =
                error instanceof Error ? error.message : "Registration failed.";
            setErrorMessage(message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="font-(family-name:--font-manrope) min-h-screen flex items-center justify-center p-4">
            {/* Modal Container */}
            <div className="glass-modal w-full max-w-[540px] rounded-xl shadow-2xl overflow-hidden flex flex-col items-center py-10 px-8">
                {/* Logo/Icon Section */}
                <div className="mb-6 flex flex-col items-center">

                    <h2 className="text-[#0e121b] text-3xl font-bold tracking-tight text-center">
                        Join Kingdom Mandate
                    </h2>
                    <p className="text-[#4f6696] text-sm font-medium mt-2 text-center">
                        Empowering your spiritual leadership journey.
                    </p>
                </div>

                {/* Form Section */}
                <form className="w-full space-y-5" onSubmit={handleSubmit}>
                    {/* Full Name */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[#0e121b] text-sm font-bold ml-1">
                            Full Name
                        </label>
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#4f6696] text-xl">
                                person
                            </span>
                            <input
                                className="glass-input w-full h-14 pl-12 pr-4 rounded-lg text-[#0e121b] placeholder:text-[#4f6696] focus:ring-2 focus:ring-(--reg-primary)/50 focus:border-(--reg-primary) outline-none transition-all"
                                placeholder="Enter your full name"
                                type="text"
                                required
                                value={fullName}
                                onChange={(event) => setFullName(event.target.value)}
                            />
                        </div>
                    </div>
                    {/* Email Address */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[#0e121b] text-sm font-bold ml-1">
                            Email Address
                        </label>
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#4f6696] text-xl">
                                mail
                            </span>
                            <input
                                className="glass-input w-full h-14 pl-12 pr-4 rounded-lg text-[#0e121b] placeholder:text-[#4f6696] focus:ring-2 focus:ring-(--reg-primary)/50 focus:border-(--reg-primary) outline-none transition-all"
                                placeholder="name@example.com"
                                type="email"
                                required
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </div>
                    </div>
                    {/* Password */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[#0e121b] text-sm font-bold ml-1">
                            Password
                        </label>
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#4f6696] text-xl">
                                lock
                            </span>
                            <input
                                className="glass-input w-full h-14 pl-12 pr-12 rounded-lg text-[#0e121b] placeholder:text-[#4f6696] focus:ring-2 focus:ring-(--reg-primary)/50 focus:border-(--reg-primary) outline-none transition-all"
                                placeholder="Create a strong password"
                                type={showPassword ? "text" : "password"}
                                required
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                            />
                            <button
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#4f6696] hover:text-(--reg-primary) transition-colors"
                                type="button"
                                onClick={() => setShowPassword((value) => !value)}
                            >
                                <span className="material-symbols-outlined text-xl">
                                    {showPassword ? "visibility_off" : "visibility"}
                                </span>
                            </button>
                        </div>
                    </div>
                    {/* Confirm Password */}
                    <div className="flex flex-col gap-2">
                        <label className="text-[#0e121b] text-sm font-bold ml-1">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#4f6696] text-xl">
                                lock
                            </span>
                            <input
                                className="glass-input w-full h-14 pl-12 pr-12 rounded-lg text-[#0e121b] placeholder:text-[#4f6696] focus:ring-2 focus:ring-(--reg-primary)/50 focus:border-(--reg-primary) outline-none transition-all"
                                placeholder="Re-enter your password"
                                type={showConfirmPassword ? "text" : "password"}
                                required
                                value={confirmPassword}
                                onChange={(event) => setConfirmPassword(event.target.value)}
                            />
                            <button
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#4f6696] hover:text-(--reg-primary) transition-colors"
                                type="button"
                                onClick={() => setShowConfirmPassword((value) => !value)}
                            >
                                <span className="material-symbols-outlined text-xl">
                                    {showConfirmPassword ? "visibility_off" : "visibility"}
                                </span>
                            </button>
                        </div>
                    </div>
                    {/* Action Button */}
                    <button
                        className="glow-button w-full h-14 bg-(--reg-primary) text-white font-bold rounded-lg mt-4 hover:bg-(--reg-primary)/90 transition-all flex items-center justify-center gap-2 group"
                        type="submit"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Creating..." : "Create Account"}
                        <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">
                            arrow_forward
                        </span>
                    </button>
                    {errorMessage ? (
                        <p className="text-xs text-[#ef4444] text-center">{errorMessage}</p>
                    ) : null}
                </form>

                {/* Login Redirect */}
                <p className="mt-8 text-sm text-[#4f6696] font-medium">
                    Already have an account?{" "}
                    <Link
                        className="text-(--reg-primary) font-bold hover:underline"
                        href="/login"
                    >
                        Login
                    </Link>
                </p>

                {/* Divider */}
                <div className="flex items-center w-full my-8 gap-4 px-4">
                    <div className="h-px bg-white/40 grow"></div>
                    <span className="text-xs font-bold text-[#4f6696] uppercase tracking-widest">
                        Or sign up with
                    </span>
                    <div className="h-px bg-white/40 grow"></div>
                </div>

                {/* Social Icons */}
                <div className="flex gap-4 w-full px-4">
                    <button className="glass-tile flex-1 h-14 rounded-lg flex items-center justify-center gap-2">
                        <Image
                            alt=""
                            className="w-5 h-5"
                            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBZCeIDQ52TaZahHCpCOe_nu_3LKPo841nxdtbC0SIozIe4NgSEMr9tH7X_uypOY0S59g7_1JeWz6ZfLfmkH5Y9hIILHVB-h4RAbAQnsfzObEgVMOCPGGfGh-SwikCs_ZH9L_MTXkIXai0PaWs2RrIF-6osQLgCiTwp_TMZBi7VqpskH7hVcqtgk_Vq_UytbThmgRCvaA3_kHX4GH4PuXXhE1VJ-JC882N2JqFBATf_7jYZRoWv6ZUFfvBgQhwWXJ66xBPET3DuEzyT"
                            width={20}
                            height={20}
                            sizes="20px"
                        />
                        <span className="text-sm font-bold text-[#0e121b]">Google</span>
                    </button>
                    <button className="glass-tile flex-1 h-14 rounded-lg flex items-center justify-center gap-2">
                        <span className="material-symbols-outlined text-[#0e121b] text-2xl">
                            ios
                        </span>
                        <span className="text-sm font-bold text-[#0e121b]">Apple</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
