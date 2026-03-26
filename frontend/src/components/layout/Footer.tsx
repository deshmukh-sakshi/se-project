import Link from 'next/link';
import {
    Building2,
    Phone,
    Mail,
    MapPin,
    ArrowUpRight,
    Heart,
} from 'lucide-react';

const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '#categories' },
    { label: 'About Us', href: '#about' },
    { label: 'Contact', href: '#contact' },
];

const productLinks = [
    { label: 'Cement', href: '#categories' },
    { label: 'TMT Steel Bars', href: '#categories' },
    { label: 'Binding Wire & Nails', href: '#categories' },
    { label: 'Construction Hardware', href: '#categories' },
];

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative bg-slate-950 text-slate-300 overflow-hidden">
            {/* ── Decorative Top Border ── */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500 to-transparent" />

            {/* ── Background Glow ── */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary-600/5 rounded-full blur-3xl pointer-events-none" />

            {/* ── Main Content ── */}
            <div className="relative container-tight pt-16 pb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
                    {/* ── Brand Column ── */}
                    <div className="lg:col-span-1">
                        <Link href="/" className="flex items-center gap-2.5 mb-5 group">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 flex items-center justify-center 
                              shadow-lg shadow-primary-500/20 group-hover:shadow-primary-500/40 transition-shadow">
                                <Building2 className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <span className="block text-lg font-bold font-display text-white">
                                    Deshmukh Traders
                                </span>
                                <span className="block text-2xs font-medium tracking-wider uppercase text-slate-500">
                                    Building Materials
                                </span>
                            </div>
                        </Link>
                        <p className="text-sm text-slate-400 leading-relaxed mb-6 max-w-xs">
                            Your trusted partner for premium cement, steel, and
                            construction essentials. Quality products and reliable
                            delivery since 2014.
                        </p>

                        {/* Status badge */}
                        <div className="flex items-center gap-2">
                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full 
                               bg-emerald-500/10 text-emerald-400 text-xs font-semibold border border-emerald-500/20">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-soft" />
                                Open for Orders
                            </span>
                        </div>
                    </div>

                    {/* ── Quick Links ── */}
                    <div>
                        <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-5">
                            Quick Links
                        </h4>
                        <ul className="space-y-3">
                            {quickLinks.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="group inline-flex items-center gap-1.5 text-sm text-slate-400 
                               hover:text-primary-400 transition-colors"
                                    >
                                        {link.label}
                                        <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 translate-x-0.5 
                                             group-hover:opacity-100 group-hover:translate-y-0 
                                             group-hover:translate-x-0 transition-all" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* ── Products ── */}
                    <div>
                        <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-5">
                            Products
                        </h4>
                        <ul className="space-y-3">
                            {productLinks.map((link) => (
                                <li key={link.label}>
                                    <Link
                                        href={link.href}
                                        className="group inline-flex items-center gap-1.5 text-sm text-slate-400 
                               hover:text-primary-400 transition-colors"
                                    >
                                        {link.label}
                                        <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-0.5 translate-x-0.5 
                                             group-hover:opacity-100 group-hover:translate-y-0 
                                             group-hover:translate-x-0 transition-all" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* ── Contact Info ── */}
                    <div>
                        <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-5">
                            Contact Us
                        </h4>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-4 h-4 text-primary-400 mt-0.5 shrink-0" />
                                <span className="text-sm text-slate-400 leading-relaxed">
                                    Near City Center, Main Road,<br />
                                    Maharashtra, India
                                </span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone className="w-4 h-4 text-primary-400 shrink-0" />
                                <a
                                    href="tel:+919876543210"
                                    className="text-sm text-slate-400 hover:text-primary-400 transition-colors"
                                >
                                    +91 98765 43210
                                </a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail className="w-4 h-4 text-primary-400 shrink-0" />
                                <a
                                    href="mailto:info@deshmukhtraders.com"
                                    className="text-sm text-slate-400 hover:text-primary-400 transition-colors"
                                >
                                    info@deshmukhtraders.com
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* ── Divider ── */}
                <div className="mt-14 pt-8 border-t border-slate-800/60">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-xs text-slate-500">
                            © {currentYear} Deshmukh Traders. All rights reserved.
                        </p>
                        <p className="flex items-center gap-1 text-xs text-slate-600">
                            Powered by
                            <span className="font-semibold text-slate-400">BMMS</span>
                            — built with
                            <Heart className="w-3 h-3 text-red-400 fill-red-400" />
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
