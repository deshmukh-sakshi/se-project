'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Building2, Package, TrendingUp, Truck, Shield, Phone, Mail, MapPin, ArrowRight, CheckCircle2, Star, Sparkles, Zap } from 'lucide-react';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrollY > 50 ? 'bg-white/90 backdrop-blur-xl shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-all duration-300 group">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl flex items-center justify-center shadow-lg shadow-primary-600/20 group-hover:shadow-primary-600/40 group-hover:scale-110 transition-all duration-300">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">Deshmukh Traders</h1>
                <p className="text-xs text-gray-500 -mt-0.5">Building Materials</p>
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-8">
              {['Features', 'Products', 'About', 'Contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-all duration-300 relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-600 to-primary-700 group-hover:w-full transition-all duration-300"></span>
                </a>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <Link href="/login" className="text-sm font-medium text-gray-700 hover:text-gray-900 transition-all duration-300 px-4 py-2">
                Sign In
              </Link>
              <Link href="/register" className="group relative text-sm font-semibold text-white px-5 py-2.5 rounded-lg overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-primary-700 transition-transform duration-300 group-hover:scale-105"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-primary-700 to-primary-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="relative flex items-center gap-2">
                  Get Started
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section with Animated Background */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-primary-50/30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary-200/30 rounded-full blur-3xl animate-blob"></div>
          <div className="absolute top-40 right-10 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/2 w-80 h-80 bg-pink-200/20 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        <div className="relative max-w-7xl mx-auto w-full">
          <div className="text-center max-w-4xl mx-auto">
            {/* Badge with animation */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-primary-100 rounded-full mb-6 shadow-lg animate-fade-in-down">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-600 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-600"></span>
              </span>
              <span className="text-sm font-medium text-primary-700">Trusted by 500+ Construction Businesses</span>
              <Sparkles className="w-4 h-4 text-primary-600" />
            </div>
            
            {/* Main Headline with stagger animation */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              <span className="inline-block animate-fade-in-up">Premium Building</span>{' '}
              <span className="inline-block animate-fade-in-up animation-delay-200">Materials,</span>
              <br />
              <span className="inline-block bg-gradient-to-r from-primary-600 via-primary-700 to-purple-600 bg-clip-text text-transparent animate-fade-in-up animation-delay-400 animate-gradient">
                Delivered Fast
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-in-up animation-delay-600">
              ISI certified cement, TMT steel bars, and construction essentials at market-competitive prices. Same-day delivery to your site.
            </p>

            {/* CTA Buttons with hover effects */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in-up animation-delay-800">
              <Link href="/register" className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold rounded-xl shadow-xl shadow-primary-600/30 hover:shadow-2xl hover:shadow-primary-600/40 transition-all duration-300 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-700 to-primary-800 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                <span className="relative">Get Started Free</span>
                <ArrowRight className="relative w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
              <a href="#contact" className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-gray-200 text-gray-700 font-semibold rounded-xl hover:border-primary-300 hover:bg-primary-50 transition-all duration-300 shadow-lg hover:shadow-xl">
                <Phone className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                Contact Sales
              </a>
            </div>

            {/* Trust Indicators with stagger */}
            <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-gray-600 animate-fade-in-up animation-delay-1000">
              {[
                { icon: CheckCircle2, text: 'ISI Certified' },
                { icon: Zap, text: 'Same-Day Delivery' },
                { icon: Star, text: '10+ Years Experience' }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 animate-fade-in-up" style={{ animationDelay: `${1000 + i * 100}ms` }}>
                  <item.icon className="w-5 h-5 text-green-600" />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-scroll"></div>
          </div>
        </div>
      </section>

      {/* Features Section with scroll animations */}
      <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 bg-white relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <ScrollReveal>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose Deshmukh Traders</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">Everything you need for your construction projects, delivered with excellence</p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Package, title: 'Complete Range', desc: 'Cement, TMT bars, binding wire, and all construction essentials', gradient: 'from-blue-500 to-cyan-500', delay: 0 },
              { icon: TrendingUp, title: 'Best Prices', desc: 'Market-competitive rates with transparent pricing and bulk discounts', gradient: 'from-purple-500 to-pink-500', delay: 100 },
              { icon: Truck, title: 'Fast Delivery', desc: 'Same-day dispatch for in-stock items, directly to your site', gradient: 'from-orange-500 to-red-500', delay: 200 },
              { icon: Shield, title: 'Quality Assured', desc: 'ISI certified products from trusted manufacturers', gradient: 'from-green-500 to-emerald-500', delay: 300 }
            ].map((feature, i) => (
              <ScrollReveal key={i} delay={feature.delay}>
                <FeatureCard {...feature} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section with hover effects */}
      <section id="products" className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100/50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-16">
            <ScrollReveal>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Product Range</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">Premium quality materials from India's most trusted brands</p>
            </ScrollReveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: 'Cement', desc: 'OPC 53, PPC, PSC from UltraTech, ACC, Ambuja', emoji: '🏗️', brands: ['UltraTech', 'ACC', 'Ambuja'], delay: 0 },
              { title: 'TMT Steel Bars', desc: 'Fe-500D, Fe-550D from Tata, JSW, SAIL', emoji: '🔩', brands: ['Tata Tiscon', 'JSW', 'SAIL'], delay: 100 },
              { title: 'Construction Hardware', desc: 'Binding wire, nails, clamps, and fixtures', emoji: '🔧', brands: ['Premium Quality', 'ISI Marked'], delay: 200 }
            ].map((product, i) => (
              <ScrollReveal key={i} delay={product.delay}>
                <ProductCard {...product} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* About Section with parallax effect */}
      <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <ScrollReveal>
              <div>
                <h2 className="text-4xl font-bold text-gray-900 mb-6">Building Trust Since 2014</h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  Deshmukh Traders has been serving the construction industry for over a decade, providing premium quality building materials to contractors, builders, and construction companies.
                </p>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  Our commitment to quality, competitive pricing, and reliable delivery has made us the preferred choice for 500+ construction businesses across the region.
                </p>
                
                <div className="grid grid-cols-3 gap-8">
                  {[
                    { number: '500+', label: 'Happy Clients' },
                    { number: '10+', label: 'Years Experience' },
                    { number: '50K+', label: 'Deliveries' }
                  ].map((stat, i) => (
                    <div key={i} className="text-center group cursor-pointer">
                      <div className="text-3xl font-bold text-gray-900 mb-1 group-hover:scale-110 transition-transform duration-300">{stat.number}</div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-600 to-primary-700 rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500"></div>
                <div className="relative aspect-square rounded-2xl bg-gradient-to-br from-primary-100 to-primary-50 p-8 flex items-center justify-center transform group-hover:scale-105 transition-transform duration-500">
                  <div className="text-center">
                    <div className="w-32 h-32 bg-gradient-to-br from-primary-600 to-primary-700 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-primary-600/30 group-hover:rotate-6 transition-transform duration-500">
                      <Building2 className="w-16 h-16 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Quality First</h3>
                    <p className="text-gray-600">Every product is ISI certified and sourced from verified manufacturers</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <ScrollReveal>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">Get In Touch</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">Have questions? We're here to help you with your construction material needs</p>
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

      {/* CTA Section with gradient animation */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-600 via-primary-700 to-purple-600 animate-gradient"></div>
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
        
        <div className="relative max-w-4xl mx-auto text-center">
          <ScrollReveal>
            <h2 className="text-4xl font-bold text-white mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-primary-100 mb-8">Join 500+ construction businesses who trust us for their material needs</p>
            <Link href="/register" className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-primary-700 font-semibold rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              Create Free Account
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-bold">Deshmukh Traders</h3>
                  <p className="text-xs text-gray-500">Building Materials</p>
                </div>
              </div>
              <p className="text-sm">Your trusted partner for premium construction materials since 2014.</p>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Products</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors duration-300">Cement</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300">TMT Steel Bars</a></li>
                <li><a href="#" className="hover:text-white transition-colors duration-300">Construction Hardware</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#about" className="hover:text-white transition-colors duration-300">About Us</a></li>
                <li><a href="#contact" className="hover:text-white transition-colors duration-300">Contact</a></li>
                <li><a href="/login" className="hover:text-white transition-colors duration-300">Sign In</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm">
                <li>+91 99999 99999</li>
                <li>info@deshmukh.com</li>
                <li>Maharashtra, India</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; 2024 Deshmukh Traders. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Scroll Reveal Component
function ScrollReveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function FeatureCard({ icon: Icon, title, desc, gradient }: any) {
  return (
    <div className="group relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-transparent overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity duration-500" style={{ backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))` }}></div>
      <div className={`relative w-14 h-14 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="relative text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-700 transition-colors duration-300">{title}</h3>
      <p className="relative text-gray-600 leading-relaxed">{desc}</p>
    </div>
  );
}

function ProductCard({ title, desc, emoji, brands }: any) {
  return (
    <div className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:-translate-y-2 overflow-hidden relative">
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-100 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      <div className="relative text-6xl mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">{emoji}</div>
      <h3 className="relative text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary-700 transition-colors duration-300">{title}</h3>
      <p className="relative text-gray-600 mb-6">{desc}</p>
      <div className="relative flex flex-wrap gap-2">
        {brands.map((brand: string, i: number) => (
          <span key={i} className="px-3 py-1 bg-gray-100 group-hover:bg-primary-50 text-gray-700 group-hover:text-primary-700 text-xs font-medium rounded-full transition-all duration-300">
            {brand}
          </span>
        ))}
      </div>
    </div>
  );
}

function ContactCard({ icon: Icon, title, content, link }: any) {
  return (
    <a href={link} className="block bg-white rounded-2xl p-8 shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 text-center group hover:-translate-y-2">
      <div className="w-14 h-14 bg-gradient-to-br from-primary-600 to-primary-700 rounded-xl flex items-center justify-center text-white mx-auto mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg shadow-primary-600/30">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary-700 transition-colors duration-300">{title}</h3>
      <p className="text-gray-600">{content}</p>
    </a>
  );
}
