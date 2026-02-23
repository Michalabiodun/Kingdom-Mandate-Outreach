"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import createGlobe, { COBEOptions } from "cobe"
import { useCallback, useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

export function GlobeFeatureSection() {
    return (
        <section className="relative w-full max-w-7xl mx-auto overflow-hidden rounded-3xl bg-neutral-50 border border-gray-200 shadow-xl px-6 py-16 md:px-16 md:py-24 my-24">
            <div className="flex flex-col-reverse items-center justify-between gap-10 md:flex-row">
                <div className="z-10 max-w-xl text-left">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                        Partner With Our <span className="text-[#0044CC]">Global Mission</span>{" "}
                        <br />
                        <span className="text-gray-500 text-2xl font-normal mt-4 block">
                            Join a community of believers dedicated to raising Kingdom leaders and establishing God's mandate in every sphere of influence across the globe.
                        </span>
                    </h2>
                    <div className="mt-8 flex flex-col sm:flex-row items-center gap-4">
                        <Button
                            onClick={() => window.location.href = "/contact"}
                            className="w-full sm:w-auto inline-flex items-center gap-2 rounded-full bg-[#0044CC] hover:bg-[#0033aa] px-8 py-6 text-lg font-semibold text-white transition-all hover:scale-105 shadow-lg"
                        >
                            Become a Partner <ArrowRight className="h-5 w-5" />
                        </Button>
                        <Button
                            onClick={() => window.location.href = "/support"}
                            className="w-full sm:w-auto inline-flex items-center gap-2 rounded-full bg-white border border-[#0044CC] text-[#0044CC] hover:bg-gray-50 px-8 py-6 text-lg font-semibold transition-all hover:scale-105 shadow-md"
                        >
                            Support Our Work
                        </Button>
                    </div>
                </div>
                <div className="relative h-[300px] w-full max-w-xl md:h-[400px]">
                    <Globe className="absolute -bottom-20 -right-20 md:-right-40 scale-125 md:scale-150" />
                </div>
            </div>
        </section>
    );
}

const GLOBE_CONFIG: COBEOptions = {
    width: 800,
    height: 800,
    onRender: () => { },
    devicePixelRatio: 2,
    phi: 0,
    theta: 0.3,
    dark: 0,
    diffuse: 0.4,
    mapSamples: 16000,
    mapBrightness: 1.2,
    baseColor: [1, 1, 1],
    markerColor: [0 / 255, 68 / 255, 204 / 255], // Brand Blue #0044CC
    glowColor: [1, 1, 1],
    markers: [
        { location: [6.5244, 3.3792], size: 0.1 }, // Lagos, Nigeria
        { location: [9.0820, 8.6753], size: 0.07 }, // Nigeria Center
        { location: [40.7128, -74.006], size: 0.08 }, // New York
        { location: [51.5074, -0.1278], size: 0.07 }, // London
        { location: [-33.8688, 151.2093], size: 0.06 }, // Sydney
        { location: [1.3521, 103.8198], size: 0.06 }, // Singapore
        { location: [35.6762, 139.6503], size: 0.06 }, // Tokyo
        { location: [-26.2041, 28.0473], size: 0.07 }, // Johannesburg
        { location: [55.7558, 37.6173], size: 0.06 }, // Moscow
        { location: [19.4326, -99.1332], size: 0.07 }, // Mexico City
    ],
}

export function Globe({
    className,
    config = GLOBE_CONFIG,
}: {
    className?: string
    config?: COBEOptions
}) {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const pointerInteracting = useRef<number | null>(null)
    const pointerInteractionMovement = useRef(0)
    const phiRef = useRef(0)
    const widthRef = useRef(0)
    const [r, setR] = useState(0)

    const updatePointerInteraction = (value: number | null) => {
        pointerInteracting.current = value
        if (canvasRef.current) {
            canvasRef.current.style.cursor = value ? "grabbing" : "grab"
        }
    }

    const updateMovement = (clientX: number) => {
        if (pointerInteracting.current !== null) {
            const delta = clientX - pointerInteracting.current
            pointerInteractionMovement.current = delta
            setR(delta / 200)
        }
    }

    const onRender = useCallback(
        (state: Record<string, unknown> & { phi: number; width: number; height: number }) => {
            if (!pointerInteracting.current) phiRef.current += 0.005
            state.phi = phiRef.current + r
            state.width = widthRef.current * 2
            state.height = widthRef.current * 2
        },
        [r],
    )

    const onResize = useCallback(() => {
        if (canvasRef.current) {
            widthRef.current = canvasRef.current.offsetWidth
        }
    }, [])

    useEffect(() => {
        window.addEventListener("resize", onResize)
        onResize()

        if (!canvasRef.current) return () => {
            window.removeEventListener("resize", onResize)
        }

        const globe = createGlobe(canvasRef.current, {
            ...config,
            width: widthRef.current * 2,
            height: widthRef.current * 2,
            onRender,
        })

        setTimeout(() => {
            if (canvasRef.current) canvasRef.current.style.opacity = "1";
        })
        return () => {
            window.removeEventListener("resize", onResize)
            globe.destroy()
        }
    }, [config, onRender, onResize])

    return (
        <div
            className={cn(
                "absolute inset-0 mx-auto aspect-[1/1] w-full max-w-[600px]",
                className,
            )}
        >
            <canvas
                className={cn(
                    "size-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size]",
                )}
                ref={canvasRef}
                onPointerDown={(e) =>
                    updatePointerInteraction(
                        e.clientX - pointerInteractionMovement.current,
                    )
                }
                onPointerUp={() => updatePointerInteraction(null)}
                onPointerOut={() => updatePointerInteraction(null)}
                onMouseMove={(e) => updateMovement(e.clientX)}
                onTouchMove={(e) =>
                    e.touches[0] && updateMovement(e.touches[0].clientX)
                }
            />
        </div>
    )
}
