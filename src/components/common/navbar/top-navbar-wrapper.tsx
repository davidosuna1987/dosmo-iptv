"use client"

import { useEffect, useState, ReactNode } from "react";

export const TopNavbarWrapper = ({
    className,
    children,
}: Readonly<{
    className?: string
    children: ReactNode;
}>) => {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 0);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 w-full px-3 md:px-6 py-2 transition-colors duration-300 ${
            scrolled
                ? "bg-black/90 backdrop-blur-sm border-b border-white/25"
                : "bg-transparent border-transparent"
            } ${className ? className : ""}`}>
            {children}
        </nav>
    )
}