'use client';

import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Package,
  TrendingUp,
  Truck,
  Shield,
  Star,
  ChevronRight,
  Hammer,
  CircleDot,
  Phone,
  Mail,
  MapPin,
  Send,
  Users,
  Award,
  CheckCircle2,
  Quote,
  Wrench,
  Zap,
  BarChart3,
  Sparkles,
  ArrowUpRight,
  Clock,
  FileText,
  ShoppingCart,
  BadgeCheck,
} from 'lucide-react';

/* ─────────────── Scroll-Reveal ─────────────── */
function Reveal({ children, className = '', delay = 0 }: {
  children: React.ReactNode; className?: string; delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVis(true); }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className={`transition-all duration-700 ease-out ${vis ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}>{children}</div>
  );
}

/* ─────────────── Animated Counter ─────────────── */
function useCountUp(target: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting && !started) setStarted(true); }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [started]);
  useEffect(() => {
    if (!started) return;
    let cur = 0; const step = target / (duration / 16);
    const t = setInterval(() => { cur += step; if (cur >= target) { setCount(target); clearInterval(t); } else setCount(Math.floor(cur)); }, 16);
    return () => clearInterval(t);
  }, [started, target, duration]);
  return { count, ref };
}

/* ─────────────── Particles Canvas ─────────────── */
function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let animId: number;
    let w = 0, h = 0;
    const particles: { x: number; y: number; vx: number; vy: number; r: number; o: number }[] = [];
    const resize = () => { w = canvas.width = canvas.offsetWidth; h = canvas.height = canvas.offsetHeight; };
    resize(); window.addEventListener('resize', resize);
    const count = Math.min(80, Math.floor(w * h / 12000));
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * w, y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
        r: Math.random() * 1.5 + 0.5, o: Math.random() * 0.4 + 0.1,
      });
    }
    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = w; if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h; if (p.y > h) p.y = 0;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(165, 180, 252, ${p.o})`; ctx.fill();
      });
      // Draw lines between nearby particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath(); ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(165, 180, 252, ${0.06 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5; ctx.stroke();
          }
        }
      }
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

/* ═══════════════════════════════════════════════════════
   1. HERO — Immersive Dark with Particles + Rate Ticker
   ═══════════════════════════════════════════════════════ */
function HeroSection() {
  return (
    <section id="hero" className="relative min-h-[100vh] flex items-center overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #050510 0%, #0c0c24 20%, #111133 45%, #0a0a20 70%, #050510 100%)' }}>
      <ParticleField />

      {/* Ambient Glows */}
      <div className="absolute w-[700px] h-[700px] rounded-full blur-[150px] opacity-[0.12]"
        style={{ background: 'radial-gradient(circle, #6366f1, transparent 70%)', top: '-10%', left: '5%' }} />
      <div className="absolute w-[500px] h-[500px] rounded-full blur-[120px] opacity-[0.08]"
        style={{ background: 'radial-gradient(circle, #f59e0b, transparent 70%)', bottom: '0%', right: '5%' }} />

      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.08) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />

      <div className="relative container-tight py-28 lg:py-36 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* ── Left Content ── */}
          <div className="lg:col-span-7 xl:col-span-6">
            <div className="animate-fade-in-down mb-8">
              <span className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full 
                               bg-white/[0.04] backdrop-blur-sm border border-white/[0.06]
                               text-white/60 text-sm">
                <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 text-xs font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Live
                </span>
                500+ Contractors Trust Us
              </span>
            </div>

            <h1 className="animate-fade-in-up font-display font-black tracking-tight 
                           text-[2.75rem] sm:text-[3.5rem] lg:text-[4rem] xl:text-[4.75rem] 
                           leading-[1.05] mb-7">
              <span className="text-white">Build </span>
              <span className="relative">
                <span className="bg-clip-text text-transparent"
                  style={{ backgroundImage: 'linear-gradient(135deg, #818cf8 0%, #6366f1 30%, #a78bfa 70%, #818cf8 100%)' }}>
                  Stronger.
                </span>
              </span>
              <br />
              <span className="text-white">Build </span>
              <span className="bg-clip-text text-transparent"
                style={{ backgroundImage: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%)' }}>
                Smarter.
              </span>
            </h1>

            <p className="animate-fade-in-up animate-delay-200 text-base sm:text-lg text-slate-400 
                          max-w-lg leading-relaxed mb-10">
              Premium cement, TMT steel bars, and all construction essentials —
              market-competitive prices, same-day delivery, zero hassle.
            </p>

            <div className="animate-fade-in-up animate-delay-300 flex flex-wrap gap-4">
              <a href="#categories"
                className="group relative inline-flex items-center gap-2.5 px-7 py-4 rounded-2xl 
                           font-bold text-sm overflow-hidden transition-all duration-300
                           shadow-xl shadow-primary-600/20 hover:shadow-2xl hover:shadow-primary-600/30">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-500" />
                <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-primary-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative text-white">Browse Catalog</span>
                <ArrowRight className="relative w-4 h-4 text-white transition-transform group-hover:translate-x-1" />
              </a>
              <a href="#contact"
                className="group inline-flex items-center gap-2.5 px-7 py-4 rounded-2xl 
                           text-white/70 font-semibold text-sm border border-white/[0.08]
                           hover:bg-white/[0.05] hover:border-white/[0.15] hover:text-white
                           transition-all duration-300">
                <Phone className="w-4 h-4" />
                Get a Quote
              </a>
            </div>

            {/* Inline Stats with animated border */}
            <div className="animate-fade-in-up animate-delay-500 mt-16 flex items-center gap-0">
              {[
                { value: '500+', label: 'Clients' },
                { value: '10yr+', label: 'Experience' },
                { value: '50K+', label: 'Deliveries' },
              ].map((s, i) => (
                <div key={s.label} className={`px-6 py-3 ${i > 0 ? 'border-l border-white/[0.06]' : ''}`}>
                  <div className="text-xl font-black text-white font-display">{s.value}</div>
                  <div className="text-[10px] text-slate-500 font-semibold uppercase tracking-[0.2em]">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right — Live Rates Dashboard ── */}
          <div className="lg:col-span-5 xl:col-span-6 hidden lg:block animate-fade-in animate-delay-400">
            <div className="relative max-w-md ml-auto">
              {/* Outer glow */}
              <div className="absolute -inset-6 bg-gradient-to-br from-primary-500/10 via-transparent to-accent-500/5 rounded-3xl blur-2xl opacity-60" />

              {/* Card */}
              <div className="relative rounded-2xl overflow-hidden border border-white/[0.06]"
                style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%)', backdropFilter: 'blur(20px)' }}>

                {/* Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.05]">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-primary-500/20 flex items-center justify-center">
                      <BarChart3 className="w-3.5 h-3.5 text-primary-400" />
                    </div>
                    <span className="text-sm font-semibold text-white/90">Market Dashboard</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] text-emerald-400/80 font-semibold uppercase tracking-wider">Live</span>
                  </div>
                </div>

                {/* Material Rows */}
                <div className="divide-y divide-white/[0.04]">
                  {[
                    { name: 'UltraTech OPC 53 Grade', price: '₹380', unit: '/bag', change: '+2.1%', up: true, badge: 'Cement' },
                    { name: 'Tata Tiscon Fe-500D', price: '₹62,500', unit: '/MT', change: '-0.8%', up: false, badge: 'Steel' },
                    { name: 'ACC Gold PPC', price: '₹365', unit: '/bag', change: '+1.5%', up: true, badge: 'Cement' },
                    { name: 'JSW NeoSteel 8mm', price: '₹64,200', unit: '/MT', change: '+0.3%', up: true, badge: 'Steel' },
                    { name: 'Ambuja Plus Cement', price: '₹370', unit: '/bag', change: '+0.9%', up: true, badge: 'Cement' },
                  ].map((item) => (
                    <div key={item.name} className="flex items-center justify-between px-6 py-3.5 group hover:bg-white/[0.02] transition-colors">
                      <div className="flex-1 min-w-0 mr-4">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${item.badge === 'Cement' ? 'bg-blue-500/10 text-blue-400' : 'bg-amber-500/10 text-amber-400'
                            }`}>{item.badge}</span>
                        </div>
                        <p className="text-[13px] text-white/80 font-medium truncate group-hover:text-white transition-colors">
                          {item.name}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <span className="text-sm font-bold text-white">{item.price}</span>
                          <span className="text-[10px] text-slate-500">{item.unit}</span>
                        </div>
                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded-md min-w-[52px] text-center ${item.up ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'
                          }`}>{item.change}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="px-6 py-3 border-t border-white/[0.04]">
                  <a href="#categories" className="flex items-center justify-center gap-2 w-full py-2 rounded-lg 
                                    bg-white/[0.04] hover:bg-white/[0.07] border border-white/[0.04] hover:border-white/[0.08]
                                    text-[11px] text-slate-400 hover:text-white font-semibold uppercase tracking-wider
                                    transition-all duration-200">
                    View All Products
                    <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom wave transition */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0,80 C360,120 720,40 1080,80 C1260,100 1380,90 1440,80 L1440,120 L0,120 Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   BRAND MARQUEE — Trusted Partners Strip
   ═══════════════════════════════════════════════════════ */
function BrandMarquee() {
  const brands = ['UltraTech', 'ACC', 'Ambuja', 'Tata Tiscon', 'JSW Steel', 'SAIL', 'Dalmia', 'Shree Cement', 'Birla A1'];
  return (
    <section className="py-8 bg-white border-b border-slate-100 overflow-hidden">
      <div className="container-tight mb-4">
        <p className="text-center text-[11px] text-slate-400 font-semibold uppercase tracking-[0.25em]">
          Authorized Dealer of Leading Brands
        </p>
      </div>
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />
        <div className="flex animate-[marquee_30s_linear_infinite]">
          {[...brands, ...brands, ...brands].map((b, i) => (
            <div key={`${b}-${i}`} className="flex items-center gap-3 mx-8 shrink-0">
              <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center">
                <span className="text-xs font-black text-slate-400">{b.charAt(0)}</span>
              </div>
              <span className="text-sm font-semibold text-slate-400 whitespace-nowrap">{b}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   2. FEATURES — Asymmetric Bento Grid
   ═══════════════════════════════════════════════════════ */
function FeaturesSection() {
  return (
    <section id="features" className="py-24 lg:py-32 bg-white relative overflow-hidden">
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-primary-50/40 blur-3xl" />

      <div className="relative container-tight">
        <Reveal>
          <div className="text-center mb-16">
            <span className="section-label mb-4 inline-flex">
              <Sparkles className="w-4 h-4" />
              Why Choose Us
            </span>
            <h2 className="section-heading mt-4">
              Built for{' '}
              <span className="gradient-text">Serious Builders</span>
            </h2>
            <p className="section-subheading mx-auto mt-4">
              Everything about our service is designed to save you time, money, and headaches.
            </p>
          </div>
        </Reveal>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          {/* Large card */}
          <Reveal className="md:col-span-4">
            <div className="group relative h-full min-h-[220px] rounded-2xl overflow-hidden border border-slate-100
                            bg-gradient-to-br from-primary-600 to-indigo-800 p-8 flex flex-col justify-end
                            hover:shadow-2xl hover:shadow-primary-500/20 transition-all duration-500">
              <div className="absolute top-6 right-6 w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm 
                              flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                <Package className="w-8 h-8 text-white/80" />
              </div>
              <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/[0.03] to-transparent" />
              <h3 className="text-2xl font-bold font-display text-white mb-2">Complete Material Range</h3>
              <p className="text-sm text-white/60 leading-relaxed max-w-md">
                Cement, TMT bars, binding wire, nails, and all construction hardware —
                everything you need from a single trusted source.
              </p>
            </div>
          </Reveal>

          {/* Pricing card */}
          <Reveal delay={100} className="md:col-span-2">
            <div className="group h-full min-h-[220px] rounded-2xl border border-slate-100 bg-white p-7
                            hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-500 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-accent-400 to-amber-500 
                              scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-accent-400 to-amber-500 
                              flex items-center justify-center mb-5 shadow-lg shadow-accent-400/20
                              group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-base font-bold text-slate-900 font-display mb-2">Market-Linked Pricing</h3>
              <p className="text-sm text-slate-500 leading-relaxed">Daily-updated rates with transparent bulk discounts.</p>
            </div>
          </Reveal>

          {/* Row 2 */}
          <Reveal delay={150} className="md:col-span-2">
            <div className="group h-full min-h-[200px] rounded-2xl border border-slate-100 bg-white p-7
                            hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-500 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-400 to-teal-500 
                              scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 
                              flex items-center justify-center mb-5 shadow-lg shadow-emerald-400/20
                              group-hover:scale-110 transition-transform duration-300">
                <Truck className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-base font-bold text-slate-900 font-display mb-2">Same-Day Delivery</h3>
              <p className="text-sm text-slate-500 leading-relaxed">Dispatched within hours, directly to your site.</p>
            </div>
          </Reveal>

          <Reveal delay={200} className="md:col-span-2">
            <div className="group h-full min-h-[200px] rounded-2xl border border-slate-100 bg-white p-7
                            hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-500 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-400 to-cyan-500 
                              scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-400 to-cyan-500 
                              flex items-center justify-center mb-5 shadow-lg shadow-blue-400/20
                              group-hover:scale-110 transition-transform duration-300">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-base font-bold text-slate-900 font-display mb-2">ISI Certified</h3>
              <p className="text-sm text-slate-500 leading-relaxed">Every item sourced from verified manufacturers.</p>
            </div>
          </Reveal>

          <Reveal delay={250} className="md:col-span-2">
            <div className="group h-full min-h-[200px] rounded-2xl border border-slate-100 bg-white p-7
                            hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 transition-all duration-500 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-violet-400 to-purple-500 
                              scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-400 to-purple-500 
                              flex items-center justify-center mb-5 shadow-lg shadow-violet-400/20
                              group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-base font-bold text-slate-900 font-display mb-2">Instant Quotes</h3>
              <p className="text-sm text-slate-500 leading-relaxed">Real-time estimates with GST and transport included.</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   3. HOW IT WORKS — Process Timeline
   ═══════════════════════════════════════════════════════ */
const steps = [
  { icon: ShoppingCart, title: 'Browse & Select', desc: 'Explore our catalog with live pricing and stock availability.', num: '01' },
  { icon: FileText, title: 'Get Instant Quote', desc: 'Our pricing engine calculates costs including GST, transport & discounts.', num: '02' },
  { icon: BadgeCheck, title: 'Confirm Order', desc: 'Place your order online or via phone. Flexible payment options available.', num: '03' },
  { icon: Truck, title: 'Fast Delivery', desc: 'Same-day dispatch for in-stock items, delivered right to your site.', num: '04' },
];

function ProcessSection() {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #f8fafc 0%, #f1f5f9 50%, #f8fafc 100%)' }}>
      <div className="container-tight">
        <Reveal>
          <div className="text-center mb-16">
            <span className="section-label mb-4 inline-flex">
              <Clock className="w-4 h-4" />
              How It Works
            </span>
            <h2 className="section-heading mt-4">
              From Browse to{' '}
              <span className="gradient-text">Doorstep in 4 Steps</span>
            </h2>
            <p className="section-subheading mx-auto mt-4">
              We&apos;ve streamlined the entire procurement process so you can focus on building.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
          {/* Connecting line (desktop only) */}
          <div className="hidden md:block absolute top-[52px] left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-primary-200 via-primary-300 to-primary-200" />

          {steps.map((s, i) => (
            <Reveal key={s.num} delay={i * 120}>
              <div className="relative text-center group">
                {/* Step circle */}
                <div className="relative mx-auto w-[72px] h-[72px] mb-6">
                  <div className="absolute inset-0 rounded-2xl bg-white border-2 border-slate-100 
                                  group-hover:border-primary-200 group-hover:shadow-xl group-hover:shadow-primary-100/50
                                  transition-all duration-500 rotate-45" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <s.icon className="w-6 h-6 text-primary-600 group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  {/* Step number */}
                  <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-primary-600 text-white 
                                  text-[10px] font-bold flex items-center justify-center shadow-md shadow-primary-600/30">
                    {s.num}
                  </div>
                </div>
                <h3 className="text-base font-bold text-slate-900 font-display mb-1.5">{s.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed max-w-[200px] mx-auto">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   4. PRODUCT CATEGORIES
   ═══════════════════════════════════════════════════════ */
const categories = [
  {
    name: 'Cement',
    desc: 'OPC 53, PPC, PSC — UltraTech, ACC, Ambuja & more',
    icon: CircleDot,
    gradient: 'from-slate-800 via-slate-700 to-slate-900',
  },
  {
    name: 'TMT Steel Bars',
    desc: 'Fe-500D, Fe-550D — Tata, JSW, SAIL grade bars',
    icon: Hammer,
    gradient: 'from-indigo-700 via-primary-600 to-indigo-800',
  },
  {
    name: 'Binding Wire & Nails',
    desc: 'GI wire, MS binding wire, and all gauge nails',
    icon: Wrench,
    gradient: 'from-amber-600 via-amber-500 to-orange-700',
  },
  {
    name: 'Construction Hardware',
    desc: 'Clamps, bolts, fixtures & essential site accessories',
    icon: Zap,
    gradient: 'from-emerald-700 via-emerald-600 to-teal-800',
  },
];

function CategoriesSection() {
  return (
    <section id="categories" className="py-24 lg:py-32 bg-white relative overflow-hidden">
      <div className="container-tight">
        <Reveal>
          <div className="text-center mb-16">
            <span className="section-label mb-4 inline-flex">
              <Package className="w-4 h-4" />
              Product Range
            </span>
            <h2 className="section-heading mt-4">
              Materials That{' '}
              <span className="gradient-text">Build Confidence</span>
            </h2>
            <p className="section-subheading mx-auto mt-4">
              Every product is sourced from certified manufacturers —
              ISI marked, strength tested, and competitively priced.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((cat, i) => (
            <Reveal key={cat.name} delay={i * 100}>
              <div className="group relative rounded-2xl overflow-hidden cursor-pointer h-[280px]
                              transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                <div className={`absolute inset-0 bg-gradient-to-br ${cat.gradient} 
                                transition-all duration-700 group-hover:scale-[1.05]`} />

                {/* Diagonal accent line */}
                <div className="absolute top-0 right-0 w-px h-full bg-white/[0.06] rotate-12 translate-x-10" />
                <div className="absolute top-0 right-0 w-px h-full bg-white/[0.04] rotate-12 translate-x-20" />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent 
                                opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative h-full flex flex-col justify-between p-7">
                  <div className="w-14 h-14 rounded-2xl bg-white/[0.08] backdrop-blur-sm 
                                  flex items-center justify-center border border-white/[0.06]
                                  group-hover:scale-110 group-hover:bg-white/[0.12] transition-all duration-300">
                    <cat.icon className="w-7 h-7 text-white/90" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white font-display mb-1.5">{cat.name}</h3>
                    <p className="text-sm text-white/40 mb-3 leading-relaxed">{cat.desc}</p>
                    <div className="flex items-center gap-1.5 text-sm text-white/60 font-semibold 
                                    translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 
                                    transition-all duration-300">
                      Explore Range <ChevronRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   5. ABOUT / STATS
   ═══════════════════════════════════════════════════════ */
function AboutSection() {
  const s1 = useCountUp(500); const s2 = useCountUp(10);
  const s3 = useCountUp(50); const s4 = useCountUp(98);
  const stats = [
    { ...s1, suffix: '+', label: 'Clients', icon: Users, color: 'from-primary-500 to-primary-600' },
    { ...s2, suffix: '+', label: 'Years', icon: Award, color: 'from-accent-500 to-amber-600' },
    { ...s3, suffix: 'K+', label: 'Orders', icon: Package, color: 'from-emerald-500 to-teal-600' },
    { ...s4, suffix: '%', label: 'Satisfaction', icon: Star, color: 'from-violet-500 to-purple-600' },
  ];

  const reasons = [
    'Direct partnerships with top cement & steel manufacturers',
    'Transparent, market-linked pricing updated daily',
    'Dedicated account manager for bulk orders',
    'Same-day delivery within city limits',
    'Flexible credit terms for regular customers',
    'Digital inventory tracking & order history',
  ];

  return (
    <section id="about" className="py-24 lg:py-32 relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #f8fafc 0%, #f1f5f9 50%, #f8fafc 100%)' }}>
      <div className="container-tight">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Stats */}
          <Reveal>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((s, i) => (
                <div key={s.label} ref={s.ref}
                  className="group relative rounded-2xl bg-white border border-slate-100 p-6 text-center
                             overflow-hidden hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 
                             transition-all duration-500">
                  {/* Animated border top */}
                  <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${s.color}
                                  scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`} />
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${s.color} 
                                  flex items-center justify-center mx-auto mb-3 shadow-md
                                  group-hover:scale-110 transition-transform duration-300`}>
                    <s.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="text-3xl font-black font-display text-slate-900">
                    {s.count}<span className="text-primary-500">{s.suffix}</span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Copy */}
          <Reveal delay={200}>
            <div>
              <span className="section-label mb-4 inline-flex"><Shield className="w-4 h-4" /> About Us</span>
              <h2 className="section-heading mt-4 text-balance">
                A Decade of{' '}
                <span className="gradient-text">Trusted Partnership</span>
              </h2>
              <p className="text-slate-500 leading-relaxed mt-4 mb-8">
                From a local building materials shop to a leading B2B supplier — Deshmukh Traders
                serves hundreds of contractors, builders, and construction firms across the region.
              </p>
              <ul className="space-y-3.5">
                {reasons.map((r) => (
                  <li key={r} className="flex items-start gap-3 group">
                    <div className="w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center mt-0.5 shrink-0 
                                    group-hover:bg-emerald-100 transition-colors">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                    </div>
                    <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">{r}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-10">
                <a href="#contact" className="group relative inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl 
                             font-bold text-sm overflow-hidden shadow-lg shadow-primary-500/20 
                             hover:shadow-xl hover:shadow-primary-500/30 transition-shadow duration-300">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-500" />
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-primary-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <span className="relative text-white">Partner With Us</span>
                  <ArrowRight className="relative w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform" />
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   6. TESTIMONIALS
   ═══════════════════════════════════════════════════════ */
const testimonials = [
  { name: 'Rajesh Patil', role: 'Civil Contractor, Pune', quote: 'Deshmukh Traders has been our go-to supplier for 3 years. Their pricing is always fair, and delivery never misses the deadline.', rating: 5 },
  { name: 'Sunil Jadhav', role: 'Builder, Nashik', quote: 'The quality of steel bars and cement is consistently top-notch. Great customer service and transparent billing.', rating: 5 },
  { name: 'Priya Deshmukh', role: 'Interior Designer, Mumbai', quote: 'I recommend Deshmukh Traders to all my clients. Their material quality speaks for itself, and the ordering process is seamless.', rating: 5 },
];

function TestimonialsSection() {
  return (
    <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
      <div className="container-tight">
        <Reveal>
          <div className="text-center mb-16">
            <span className="section-label mb-4 inline-flex"><Star className="w-4 h-4" /> Testimonials</span>
            <h2 className="section-heading mt-4">
              Trusted by{' '}
              <span className="gradient-text">Industry Professionals</span>
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 120}>
              <div className="group relative h-full rounded-2xl bg-white border border-slate-100 
                              overflow-hidden hover:shadow-xl hover:shadow-slate-200/50 hover:-translate-y-1 
                              transition-all duration-500">
                <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-primary-500 via-accent-400 to-primary-500 
                                scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />
                <div className="p-7 flex flex-col h-full">
                  <div className="flex gap-0.5 mb-5">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="w-4 h-4 text-accent-400 fill-accent-400" />
                    ))}
                  </div>
                  <div className="relative flex-1 mb-6">
                    <Quote className="absolute -top-1 -left-1 w-8 h-8 text-primary-100/50" />
                    <p className="relative text-sm text-slate-600 leading-relaxed pl-5 italic">&ldquo;{t.quote}&rdquo;</p>
                  </div>
                  <div className="flex items-center gap-3 pt-5 border-t border-slate-50">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-primary-700 
                                    flex items-center justify-center text-white font-bold text-sm shadow-md shadow-primary-500/20">
                      {t.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-slate-900">{t.name}</div>
                      <div className="text-xs text-slate-400">{t.role}</div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   7. CONTACT / CTA
   ═══════════════════════════════════════════════════════ */
function ContactSection() {
  const [formData, setFormData] = useState({ name: '', phone: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault(); setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ name: '', phone: '', message: '' });
  }, []);

  return (
    <section id="contact" className="relative py-24 lg:py-32 overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #f8fafc 0%, #f1f5f9 50%, #f8fafc 100%)' }}>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-50/30 rounded-full blur-3xl -translate-y-1/3 translate-x-1/4" />

      <div className="relative container-tight">
        <Reveal>
          <div className="text-center mb-16">
            <span className="section-label mb-4 inline-flex"><Send className="w-4 h-4" /> Get In Touch</span>
            <h2 className="section-heading mt-4">
              Let&apos;s{' '}
              <span className="gradient-text">Build Together</span>
            </h2>
            <p className="section-subheading mx-auto mt-4">
              Reach out for quotes, bulk inquiries, or partnership opportunities.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-14 max-w-6xl mx-auto">
          <Reveal className="lg:col-span-3">
            <div className="rounded-2xl bg-white border border-slate-100 shadow-soft p-8">
              <h3 className="text-lg font-bold text-slate-900 font-display mb-6">Send a message</h3>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name</label>
                    <input type="text" required value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your name"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 
                                 text-sm text-slate-900 placeholder:text-slate-400
                                 focus:border-primary-400 focus:ring-4 focus:ring-primary-50 
                                 focus:bg-white transition-all outline-none" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Phone Number</label>
                    <input type="tel" required value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 
                                 text-sm text-slate-900 placeholder:text-slate-400
                                 focus:border-primary-400 focus:ring-4 focus:ring-primary-50 
                                 focus:bg-white transition-all outline-none" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Your Message</label>
                  <textarea required rows={4} value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your requirements..."
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 
                               text-sm text-slate-900 placeholder:text-slate-400 resize-none
                               focus:border-primary-400 focus:ring-4 focus:ring-primary-50 
                               focus:bg-white transition-all outline-none" />
                </div>
                <button type="submit"
                  className="group relative inline-flex items-center justify-center gap-2 w-full sm:w-auto 
                             px-8 py-3.5 rounded-xl font-bold text-sm overflow-hidden 
                             shadow-lg shadow-primary-500/20 hover:shadow-xl hover:shadow-primary-500/30 transition-shadow duration-300">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-500" />
                  <div className="absolute inset-0 bg-gradient-to-r from-primary-500 to-primary-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  {submitted
                    ? <span className="relative flex items-center gap-2 text-white"><CheckCircle2 className="w-5 h-5" /> Sent!</span>
                    : <span className="relative flex items-center gap-2 text-white">Send Message <ArrowRight className="w-4 h-4" /></span>
                  }
                </button>
              </form>
            </div>
          </Reveal>

          <Reveal delay={200} className="lg:col-span-2">
            <div className="space-y-5">
              {[
                { icon: Phone, title: 'Phone', detail: '+91 98765 43210', sub: 'Mon–Sat, 8 AM – 8 PM', href: 'tel:+919876543210', color: 'text-primary-600 bg-primary-50' },
                { icon: Mail, title: 'Email', detail: 'info@deshmukhtraders.com', sub: 'Replies within 2 hours', href: 'mailto:info@deshmukhtraders.com', color: 'text-accent-600 bg-accent-50' },
                { icon: MapPin, title: 'Location', detail: 'Near City Center, Main Road', sub: 'Maharashtra · Walk-ins welcome', href: '#', color: 'text-emerald-600 bg-emerald-50' },
              ].map((c) => (
                <a key={c.title} href={c.href}
                  className="group flex items-start gap-4 rounded-2xl bg-white border border-slate-100 p-5 
                             hover:shadow-lg hover:shadow-slate-200/50 hover:border-slate-200 hover:-translate-y-0.5 transition-all duration-300">
                  <div className={`w-11 h-11 rounded-xl ${c.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                    <c.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 mb-0.5">{c.title}</h4>
                    <p className="text-sm text-slate-500 group-hover:text-primary-600 transition-colors">{c.detail}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{c.sub}</p>
                  </div>
                </a>
              ))}

              {/* Bulk CTA */}
              <div className="relative rounded-2xl overflow-hidden p-6 text-white">
                <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 50%, #0f172a 100%)' }} />
                <div className="absolute inset-0 opacity-30"
                  style={{ backgroundImage: `radial-gradient(at 30% 30%, rgba(99,102,241,0.3) 0px, transparent 50%), radial-gradient(at 80% 70%, rgba(245,158,11,0.15) 0px, transparent 50%)` }} />
                <div className="relative">
                  <h4 className="font-bold font-display text-lg mb-2">Need Bulk Pricing?</h4>
                  <p className="text-sm text-white/50 leading-relaxed mb-4">Orders above ₹1 lakh qualify for special trade discounts.</p>
                  <a href="tel:+919876543210"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-white 
                               bg-white/10 rounded-xl px-5 py-2.5 border border-white/10
                               hover:bg-white/20 hover:border-white/20 transition-all">
                    <Phone className="w-4 h-4" /> Call for Trade Pricing
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════
   PAGE ASSEMBLY
   ═══════════════════════════════════════════════════════ */
export default function Home() {
  return (
    <>
      <HeroSection />
      <BrandMarquee />
      <FeaturesSection />
      <ProcessSection />
      <CategoriesSection />
      <AboutSection />
      <TestimonialsSection />
      <ContactSection />
    </>
  );
}
