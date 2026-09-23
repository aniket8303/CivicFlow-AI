"use client";

import { useEffect, useState } from "react";

export default function DemoModeBanner() {
    const [isDemo, setIsDemo] = useState(false);

    useEffect(() => {
        // Initial check
        if (typeof window !== "undefined") {
            setIsDemo(localStorage.getItem("demo_mode") === "true");
        }

        const handleDemoChange = () => {
            setIsDemo(localStorage.getItem("demo_mode") === "true");
        };

        window.addEventListener("demo_mode_changed", handleDemoChange);
        return () => window.removeEventListener("demo_mode_changed", handleDemoChange);
    }, []);

    if (!isDemo) return null;

    return (
        <div className="bg-amber-500 text-white text-xs font-bold text-center py-1 uppercase tracking-widest sticky top-0 z-50">
            DEMO MODE &bull; Connected to sample CivicFlow data
        </div>
    );
}
