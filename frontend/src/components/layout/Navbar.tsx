'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, Building2, ArrowRight } from 'lucide-react';

const navLinks = [
    { label: 'Home', href: '#hero' },
    { label: 'Services', href: '#features' },
    { label: 'Products', href: '#categories' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    return (
        <>
            {/* ── Navbar ── */}
            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                        ? 'bg-white/80 backdrop-blur-xl border-b border-slate-200/60 shadow-sm'
                        : 'bg-transparent'
                    }`}
            >
                <div className="container-tight">
                    <div className="flex items-center justify-between h-16 lg:h-20">
                        {/* ── Brand ── */}
                        <Link href="/" className="flex items-center gap-2.5 group">
                            <div className={`flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-300 ${isScrolled
                                    ? 'bg-primary-600 shadow-md shadow-primary-500/20'
                                    : 'bg-white/10 backdrop-blur-sm border border-white/20'
                                }`}>
                                <Building2 className={`w-5 h-5 transition-colors ${isScrolled ? 'text-white' : 'text-white'
                                    }`} />
                            </div>
                            <div className="flex flex-col">
                                <span className={`text-lg font-bold font-display leading-tight transition-colors ${isScrolled ? 'text-slate-900' : 'text-white'
                                    }`}>
                                    Deshmukh Traders
                                </span>
                                <span className={`text-2xs font-medium tracking-wider uppercase transition-colors ${isScrolled ? 'text-slate-400' : 'text-white/50'
                                    }`}>
                                    Building Materials
                                </span>
                            </div>
                        </Link>

                        {/* ── Desktop Nav Links ── */}
                        <div className="hidden lg:flex items-center gap-1">
                            {navLinks.map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isScrolled
                                            ? 'text-slate-600 hover:text-primary-600 hover:bg-primary-50'
                                            : 'text-white/70 hover:text-white hover:bg-white/10'
                                        }`}
                                >
                                    {link.label}
                                </a>
                            ))}
                        </div>

                        {/* ── Desktop CTAs ── */}
                        <div className="hidden lg:flex items-center gap-3">
                            <Link
                                href="/login"
                                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${isScrolled
                                        ? 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                                        : 'text-white/80 hover:text-white hover:bg-white/10'
                                    }`}
                            >
                                Login
                            </Link>
                            <a
                                href="#contact"
                                className={`group inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 ${isScrolled
                                        ? 'bg-primary-600 text-white shadow-md hover:bg-primary-700 hover:shadow-lg hover:shadow-primary-500/25'
                                        : 'bg-white text-primary-700 shadow-lg hover:bg-white/90 hover:shadow-xl'
                                    }`}
                            >
                                Get Quote
                                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                            </a>
                        </div>

                        {/* ── Mobile Hamburger ── */}
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className={`lg:hidden p-2 rounded-lg transition-colors ${isScrolled
                                    ? 'text-slate-600 hover:bg-slate-100'
                                    : 'text-white hover:bg-white/10'
                                }`}
                            aria-label="Toggle menu"
                        >
                            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* ── Mobile Menu Overlay ── */}
            {isOpen && (
                <div className="fixed inset-0 z-40 lg:hidden">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-fade-in"
                        onClick={() => setIsOpen(false)}
                    />
                    {/* Drawer */}
                    <div className="absolute top-0 right-0 w-80 max-w-[85vw] h-full bg-white shadow-2xl animate-slide-in-right">
                        <div className="flex flex-col h-full">
                            {/* Drawer Header */}
                            <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100">
                                <div className="flex items-center gap-2.5">
                                    <div className="w-8 h-8 rounded-lg bg-primary-600 flex items-center justify-center">
                                        <Building2 className="w-4 h-4 text-white" />
                                    </div>
                                    <span className="font-bold font-display text-slate-900">
                                        Deshmukh Traders
                                    </span>
                                </div>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Drawer Links */}
                            <div className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                                {navLinks.map((link, i) => (
                                    <a
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className="flex items-center px-4 py-3.5 rounded-xl text-slate-700 font-medium 
                               hover:bg-primary-50 hover:text-primary-700 transition-colors"
                                        style={{ animationDelay: `${i * 50}ms` }}
                                    >
                                        {link.label}
                                    </a>
                                ))}
                            </div>

                            {/* Drawer CTAs */}
                            <div className="px-6 py-6 border-t border-slate-100 space-y-3">
                                <Link
                                    href="/login"
                                    className="btn-secondary w-full justify-center"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Login
                                </Link>
                                <a
                                    href="#contact"
                                    className="btn-primary w-full justify-center"
                                    onClick={() => setIsOpen(false)}
                                >
                                    Get a Quote
                                    <ArrowRight className="w-4 h-4" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
