"use client";

import { useState, useEffect } from "react";

export interface Testimonial {
  id: string;
  title: string;
  fullName: string;
  email: string;
  story: string;
  isAnonymous: boolean;
  createdAt: string;
  approved: boolean;
}

export interface UseTestimonialsReturn {
  testimonials: Testimonial[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useTestimonials(): UseTestimonialsReturn {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTestimonials = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      
      const apiBaseUrl = process.env.NEXT_PUBLIC_SERVER_URL ?? "http://localhost:3000";
      const response = await fetch(`${apiBaseUrl}/api/testimonies?approved=true&limit=10`);
      
      if (!response.ok) {
        throw new Error("Failed to fetch testimonials");
      }
      
      const data = await response.json();
      setTestimonials((data as { testimonials: Testimonial[] }).testimonials || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  return {
    testimonials,
    loading,
    error,
    refetch: fetchTestimonials,
  };
}
