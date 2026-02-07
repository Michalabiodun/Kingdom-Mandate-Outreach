"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { Facebook, Instagram, Linkedin, Send, Twitter, Youtube } from "lucide-react"

function Footerdemo() {


    return (
        <footer className="relative bg-background text-foreground transition-colors duration-300">
            <div className="container mx-auto px-4 py-12 md:px-6 lg:px-8">
                <div className="grid gap-x-8 gap-y-12 grid-cols-2 lg:grid-cols-4">
                    <div className="relative col-span-2 lg:col-span-1">
                        <h2 className="mb-4 text-3xl font-bold tracking-tight text-primary">Kingdom Mandate</h2>
                        <p className="mb-6 text-muted-foreground">
                            Raising Kingdom Leaders. Establishing God’s Mandate on Earth. Join our community of believers.
                        </p>
                        <form className="relative">
                            <Input
                                type="email"
                                placeholder="Join our Newsletter"
                                className="pr-12 backdrop-blur-sm"
                            />
                            <Button
                                type="submit"
                                size="icon"
                                className="absolute right-1 top-1 h-8 w-8 rounded-full bg-primary text-primary-foreground transition-transform hover:scale-105"
                            >
                                <Send className="h-4 w-4" />
                                <span className="sr-only">Subscribe</span>
                            </Button>
                        </form>
                        <div className="absolute -right-4 top-0 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />
                    </div>
                    <div className="col-span-1">
                        <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
                        <nav className="space-y-2 text-sm">
                            <a href="/" className="block transition-colors hover:text-primary">
                                Home
                            </a>
                            <a href="/about" className="block transition-colors hover:text-primary">
                                About Us
                            </a>
                            <a href="/events" className="block transition-colors hover:text-primary">
                                Events
                            </a>
                            <a href="/support" className="block transition-colors hover:text-primary">
                                Support
                            </a>
                            <a href="/contact" className="block transition-colors hover:text-primary">
                                Contact
                            </a>
                        </nav>
                    </div>
                    <div className="col-span-1">
                        <h3 className="mb-4 text-lg font-semibold">Contact Us</h3>
                        <address className="space-y-2 text-sm not-italic">
                            <p>Kingdom Mandate Outreach Center</p>
                            <p>Email: info@kingdommandate.org</p>
                            <p>Support our mission today.</p>
                        </address>
                    </div>
                    <div className="relative col-span-2 lg:col-span-1">
                        <h3 className="mb-4 text-lg font-semibold">Follow Us</h3>
                        <div className="mb-6 flex space-x-4">
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="outline" size="icon" className="rounded-full hover:bg-primary hover:text-white transition-colors">
                                            <Facebook className="h-4 w-4" />
                                            <span className="sr-only">Facebook</span>
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Follow us on Facebook</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="outline" size="icon" className="rounded-full hover:bg-primary hover:text-white transition-colors">
                                            <Twitter className="h-4 w-4" />
                                            <span className="sr-only">Twitter</span>
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Follow us on Twitter</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="outline" size="icon" className="rounded-full hover:bg-primary hover:text-white transition-colors">
                                            <Instagram className="h-4 w-4" />
                                            <span className="sr-only">Instagram</span>
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Follow us on Instagram</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="outline" size="icon" className="rounded-full hover:bg-primary hover:text-white transition-colors">
                                            <Youtube className="h-4 w-4" />
                                            <span className="sr-only">YouTube</span>
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Subscribe on YouTube</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </div>

                    </div>
                </div>
                <div className="mt-12 flex flex-col items-center justify-between gap-4 pt-8 text-center md:flex-row">
                    <p className="text-sm text-muted-foreground">
                        © {new Date().getFullYear()} Kingdom Mandate Outreach. All rights reserved.
                    </p>
                    <nav className="flex gap-4 text-sm">
                        <a href="#" className="transition-colors hover:text-primary">
                            Privacy Policy
                        </a>
                        <a href="#" className="transition-colors hover:text-primary">
                            Terms of Service
                        </a>
                    </nav>
                </div>
            </div>
        </footer>
    )
}

export { Footerdemo }
