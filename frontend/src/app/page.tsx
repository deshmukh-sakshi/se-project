'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Building2, Package, TrendingUp, Truck, Shield, Phone, Mail, MapPin, ArrowRight, CheckCircle2, Star, Sparkles, Zap, ChevronRight, Award, Clock, Users } from 'lucide-react';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-navy-950 overflow-hidden">
      {/* ═══════════════ Navigation ═══════════════ */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrollY > 50 ? 'bg-navy-950/90 backdrop-blur-2xl shadow-lg shadow-black/20 border-b border-white/5' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/20 group-hover:shadow-primary-500/40 group-hover:scale-110 transition-all duration-300">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-white font-display">Deshmukh Traders</h1>
                <p className="text-2xs font-medium tracking-wider uppercase text-white/40">Building Materials</p>
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {['Features', 'Products', 'About', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300"
                >
                  {item}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <Link href="/login" className="hidden sm:block text-sm font-medium text-white/70 hover:text-white transition-all duration-300 px-4 py-2">
                Sign In
              </Link>
              <Link href="/register" className="group relative text-sm font-semibold text-white px-5 py-2.5 rounded-xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-accent-500 transition-all duration-300 group-hover:scale-105"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-primary-700 to-accent-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative flex items-center gap-2">
                  Get Started
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* ═══════════════ Hero Section ═══════════════ */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image src="/images/hero.png" alt="Construction site" fill className="object-cover opacity-30" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-navy-950/80 to-navy-950"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950 via-transparent to-navy-950/80"></div>
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary-400/30 rounded-full animate-float"></div>
          <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-accent-400/20 rounded-full animate-float-slow"></div>
          <div className="absolute top-2/3 left-1/2 w-1.5 h-1.5 bg-primary-300/20 rounded-full animate-float-delay"></div>
          <div className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-accent-300/15 rounded-full animate-float"></div>
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute top-40 right-10 w-96 h-96 bg-accent-500/5 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-primary-600/5 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto w-full">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 glass-card mb-8 animate-fade-in-down">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-400"></span>
              </span>
              <span className="text-sm font-medium text-accent-300">Trusted by 500+ Construction Businesses</span>
              <Sparkles className="w-4 h-4 text-accent-400" />
            </div>
            
            {/* Main Headline */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight font-display">
              <span className="inline-block text-white animate-fade-in-up">Premium Building</span>{' '}
              <span className="inline-block text-white animate-fade-in-up animation-delay-200">Materials,</span>
              <br />
              <span className="inline-block gradient-text animate-fade-in-up animation-delay-400 text-shimmer">
                Delivered Fast
              </span>
            </h1>
            
            <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in-up animation-delay-600">
              ISI certified cement, TMT steel bars, and construction essentials at market-competitive prices. Same-day delivery to your site.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-14 animate-fade-in-up animation-delay-800">
              <Link href="/register" className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-600 to-accent-500 text-white font-semibold rounded-xl shadow-xl shadow-primary-600/20 hover:shadow-2xl hover:shadow-primary-600/30 transition-all duration-300 overflow-hidden hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-r from-accent-500 to-primary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <span className="relative">Get Started Free</span>
                <ArrowRight className="relative w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              <a href="#contact" className="group inline-flex items-center justify-center gap-2 px-8 py-4 glass-card text-white font-semibold hover:bg-white/10 transition-all duration-300">
                <Phone className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                Contact Sales
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-slate-400 animate-fade-in-up animation-delay-1000">
              {[
                { icon: CheckCircle2, text: 'ISI Certified', color: 'text-emerald-400' },
                { icon: Zap, text: 'Same-Day Delivery', color: 'text-accent-400' },
                { icon: Star, text: '10+ Years Experience', color: 'text-primary-400' }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  <item.icon className={`w-5 h-5 ${item.color}`} />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/40 rounded-full mt-2 animate-scroll"></div>
          </div>
        </div>
      </section>

      {/* ═══════════════ Features Section ═══════════════ */}
      <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950 to-slate-900"></div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/30 to-transparent"></div>
        
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <ScrollReveal>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-500/10 text-primary-400 text-sm font-semibold border border-primary-500/20 mb-4">
                <Award className="w-4 h-4" /> Why Choose Us
              </span>
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 font-display">Why Choose Deshmukh Traders</h2>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">Everything you need for your construction projects, delivered with excellence</p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Package, title: 'Complete Range', desc: 'Cement, TMT bars, binding wire, and all construction essentials', gradient: 'from-blue-500 to-cyan-500', delay: 0 },
              { icon: TrendingUp, title: 'Best Prices', desc: 'Market-competitive rates with transparent pricing and bulk discounts', gradient: 'from-purple-500 to-pink-500', delay: 100 },
              { icon: Truck, title: 'Fast Delivery', desc: 'Same-day dispatch for in-stock items, directly to your site', gradient: 'from-accent-500 to-orange-500', delay: 200 },
              { icon: Shield, title: 'Quality Assured', desc: 'ISI certified products from trusted manufacturers', gradient: 'from-emerald-500 to-green-500', delay: 300 }
            ].map((feature, i) => (
              <ScrollReveal key={i} delay={feature.delay}>
                <FeatureCard {...feature} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ Products Section ═══════════════ */}
      <section id="products" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-navy-950"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-accent-500/5 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <ScrollReveal>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent-500/10 text-accent-400 text-sm font-semibold border border-accent-500/20 mb-4">
                <Package className="w-4 h-4" /> Our Products
              </span>
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 font-display">Our Product Range</h2>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">Premium quality materials from India&apos;s most trusted brands</p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Cement', desc: 'OPC 53, PPC, PSC from UltraTech, ACC, Ambuja', image: '/images/product-cement.png', brands: ['UltraTech', 'ACC', 'Ambuja'], delay: 0 },
              { title: 'TMT Steel Bars', desc: 'Fe-500D, Fe-550D from Tata, JSW, SAIL', image: '/images/product-steel.png', brands: ['Tata Tiscon', 'JSW', 'SAIL'], delay: 100 },
              { title: 'Construction Hardware', desc: 'Binding wire, nails, clamps, and fixtures', image: '/images/product-hardware.png', brands: ['Premium Quality', 'ISI Marked'], delay: 200 }
            ].map((product, i) => (
              <ScrollReveal key={i} delay={product.delay}>
                <ProductCard {...product} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ About Section ═══════════════ */}
      <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950 to-slate-900"></div>
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent-500/20 to-transparent"></div>

        <div className="relative max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <div>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-500/10 text-primary-400 text-sm font-semibold border border-primary-500/20 mb-6">
                  <Clock className="w-4 h-4" /> Our Story
                </span>
                <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 font-display">Building Trust Since 2014</h2>
                <p className="text-lg text-slate-400 mb-6 leading-relaxed">
                  Deshmukh Traders has been serving the construction industry for over a decade, providing premium quality building materials to contractors, builders, and construction companies.
                </p>
                <p className="text-lg text-slate-400 mb-10 leading-relaxed">
                  Our commitment to quality, competitive pricing, and reliable delivery has made us the preferred choice for 500+ construction businesses across the region.
                </p>
                
                <div className="grid grid-cols-3 gap-8">
                  {[
                    { number: '500+', label: 'Happy Clients' },
                    { number: '10+', label: 'Years Experience' },
                    { number: '50K+', label: 'Deliveries' }
                  ].map((stat, i) => (
                    <div key={i} className="text-center group cursor-pointer">
                      <div className="text-3xl font-bold gradient-text mb-1 group-hover:scale-110 transition-transform duration-300 font-display">{stat.number}</div>
                      <div className="text-sm text-slate-500">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-br from-primary-600/20 to-accent-500/20 rounded-3xl blur-2xl opacity-30 group-hover:opacity-50 transition-opacity duration-500"></div>
                <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/20">
                  <Image src="/images/about.png" alt="About Deshmukh Traders" width={600} height={500} className="w-full h-auto object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center shadow-lg">
                        <Building2 className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">Quality First</h3>
                        <p className="text-sm text-white/60">ISI certified & verified manufacturers</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══════════════ Contact Section ═══════════════ */}
      <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-navy-950"></div>
        
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <ScrollReveal>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-500/10 text-primary-400 text-sm font-semibold border border-primary-500/20 mb-4">
                <Phone className="w-4 h-4" /> Get in Touch
              </span>
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 font-display">Get In Touch</h2>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">Have questions? We&apos;re here to help you with your construction material needs</p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { icon: Phone, title: 'Phone', content: '+91 99999 99999', link: 'tel:+919999999999', delay: 0 },
              { icon: Mail, title: 'Email', content: 'info@deshmukh.com', link: 'mailto:info@deshmukh.com', delay: 100 },
              { icon: MapPin, title: 'Location', content: 'Maharashtra, India', link: '#', delay: 200 }
            ].map((contact, i) => (
              <ScrollReveal key={i} delay={contact.delay}>
                <ContactCard {...contact} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ CTA Section ═══════════════ */}
      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900 via-primary-800 to-navy-950"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(99,102,241,0.15),transparent_50%)]"></div>
        
        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-10 left-[20%] w-2 h-2 bg-accent-400/30 rounded-full animate-float"></div>
          <div className="absolute top-20 right-[30%] w-1.5 h-1.5 bg-primary-300/30 rounded-full animate-float-slow"></div>
          <div className="absolute bottom-10 left-[40%] w-2 h-2 bg-white/10 rounded-full animate-float-delay"></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 font-display">Ready to Get Started?</h2>
            <p className="text-xl text-primary-200/80 mb-10 max-w-2xl mx-auto">Join 500+ construction businesses who trust us for their material needs</p>
            <Link href="/register" className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-navy-950 font-bold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              Create Free Account
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════ Footer ═══════════════ */}
      <footer className="relative bg-navy-950 text-slate-400 py-14 px-4 sm:px-6 lg:px-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
            <div>
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center shadow-lg shadow-primary-500/20">
                  <Building2 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-bold font-display">Deshmukh Traders</h3>
                  <p className="text-2xs text-slate-500 font-medium tracking-wider uppercase">Building Materials</p>
                </div>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed">Your trusted partner for premium construction materials since 2014.</p>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Products</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#products" className="text-slate-500 hover:text-primary-400 transition-colors duration-300">Cement</a></li>
                <li><a href="#products" className="text-slate-500 hover:text-primary-400 transition-colors duration-300">TMT Steel Bars</a></li>
                <li><a href="#products" className="text-slate-500 hover:text-primary-400 transition-colors duration-300">Construction Hardware</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Company</h4>
              <ul className="space-y-3 text-sm">
                <li><a href="#about" className="text-slate-500 hover:text-primary-400 transition-colors duration-300">About Us</a></li>
                <li><a href="#contact" className="text-slate-500 hover:text-primary-400 transition-colors duration-300">Contact</a></li>
                <li><Link href="/login" className="text-slate-500 hover:text-primary-400 transition-colors duration-300">Sign In</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">Contact</h4>
              <ul className="space-y-3 text-sm text-slate-500">
                <li className="flex items-center gap-2"><Phone className="w-4 h-4 text-primary-500" /> +91 99999 99999</li>
                <li className="flex items-center gap-2"><Mail className="w-4 h-4 text-primary-500" /> info@deshmukh.com</li>
                <li className="flex items-center gap-2"><MapPin className="w-4 h-4 text-primary-500" /> Maharashtra, India</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/5 pt-8 text-center text-sm text-slate-600">
            <p>&copy; 2024 Deshmukh Traders. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// ═══════════════ Sub-components ═══════════════

function ScrollReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function FeatureCard({ icon: Icon, title, desc, gradient }: any) {
  return (
    <div className="group relative glass-card p-8 hover:bg-white/10 transition-all duration-500 hover:-translate-y-1">
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-500" style={{ backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))` }}></div>
      <div className={`relative w-14 h-14 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="relative text-xl font-bold text-white mb-3 group-hover:text-primary-300 transition-colors duration-300 font-display">{title}</h3>
      <p className="relative text-slate-400 leading-relaxed">{desc}</p>
    </div>
  );
}

function ProductCard({ title, desc, image, brands }: any) {
  return (
    <div className="group glass-card overflow-hidden hover:bg-white/10 transition-all duration-500 hover:-translate-y-2">
      <div className="relative h-52 overflow-hidden">
        <Image src={image} alt={title} fill className="object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-transparent"></div>
      </div>
      <div className="p-8">
        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-accent-300 transition-colors duration-300 font-display">{title}</h3>
        <p className="text-slate-400 mb-6">{desc}</p>
        <div className="flex flex-wrap gap-2">
          {brands.map((brand: string, i: number) => (
            <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 text-slate-400 group-hover:text-primary-300 group-hover:border-primary-500/30 text-xs font-medium rounded-full transition-all duration-300">
              {brand}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

function ContactCard({ icon: Icon, title, content, link }: any) {
  return (
    <a href={link} className="block glass-card p-8 text-center group hover:bg-white/10 hover:-translate-y-2 transition-all duration-500">
      <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-accent-500 rounded-xl flex items-center justify-center text-white mx-auto mb-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg shadow-primary-500/20">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-primary-300 transition-colors duration-300">{title}</h3>
      <p className="text-slate-400">{content}</p>
    </a>
  );
}
