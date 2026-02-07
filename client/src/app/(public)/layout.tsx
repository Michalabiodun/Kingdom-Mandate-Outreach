"use client";

import { Header } from "@/components/ui/header";
import { Footerdemo } from "@/components/ui/footer-section";
import { useRouter } from "next/navigation";

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const router = useRouter();

    const navigation = [
        { label: "Home", href: "/", onClick: () => router.push("/") },
        { label: "About", href: "/about", onClick: () => router.push("/about") },
        { label: "Events", href: "/events", onClick: () => router.push("/events") },
        { label: "Support", href: "/support", onClick: () => router.push("/support") },
        { label: "Contact", href: "/contact", onClick: () => router.push("/contact") },
    ];

    const headerButtons = [
        { label: "Login", onClick: () => router.push("/login"), variant: "outline" as const },
        { label: "Join Us", onClick: () => router.push("/register"), variant: "solid" as const },
    ];

    return (
        <div className="flex flex-col min-h-screen">
            <Header
                navigation={navigation}
                headerButtons={headerButtons}
            />
            <main className="flex-1">
                {children}
            </main>
            <Footerdemo />
        </div>
    );
}
