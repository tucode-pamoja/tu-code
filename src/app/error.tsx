"use client";

import { useEffect } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div className="flex h-screen w-full flex-col items-center justify-center bg-[#050508] p-6 text-center text-white">
            <div className="mb-6 rounded-full bg-red-500/10 p-6 ring-1 ring-red-500/20 backdrop-blur-sm">
                <AlertTriangle className="h-12 w-12 text-red-500" />
            </div>

            <h2 className="mb-4 text-3xl font-bold tracking-tight">
                Something went wrong
            </h2>

            <p className="mb-8 max-w-md text-white/50 leading-relaxed">
                We encountered an unexpected error. Our team has been notified.
                <br />
                <span className="text-xs font-mono opacity-50 mt-2 block">
                    Error: {error.message || "Unknown Error"}
                </span>
            </p>

            <button
                onClick={reset}
                className="group inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-bold text-black transition-all hover:bg-white/90 shadow-lg hover:shadow-white/20"
            >
                <RotateCcw className="h-4 w-4 transition-transform group-hover:rotate-180" />
                Try again
            </button>
        </div>
    );
}
