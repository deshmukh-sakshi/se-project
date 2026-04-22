'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import ProtectedRoute from '@/components/ProtectedRoute';
import { authService } from '@/lib/auth';
import {
  ShoppingCart, Package, FileText, LogOut, Building2, ArrowUpRight,
  Bell, Settings, Search, Heart, Clock, ChevronRight,
  Truck, Star, CalendarDays, Activity, HelpCircle, MessageSquare
} from 'lucide-react';

export default function CustomerDashboard() {
  const [user, setUser] = useState<any>(null);
  const [currentTime, setCurrentTime] = useState('');

  useEffect(() => {
    const userData = authService.getStoredUser();
    setUser(userData);

    const updateTime = () => {
      setCurrentTime(new Date().toLocaleTimeString('en-US', {
        hour: '2-digit', minute: '2-digit', hour12: true
      }));
    };
    updateTime();
    const timer = setInterval(updateTime, 60000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    authService.logout();
  };

  const greeting = (() => {
    const h = new Date().getHours();
    if (h < 12) return 'Good Morning';
    if (h < 17) return 'Good Afternoon';
    return 'Good Evening';
  })();

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#0c0f1a] text-white">
        {/* ── Sidebar ── */}
        <aside className="fixed top-0 left-0 bottom-0 w-64 bg-[#0f1225] border-r border-white/[0.04] z-40 hidden lg:flex flex-col">
          {/* Brand */}
          <div className="px-6 py-6 border-b border-white/[0.04]">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-lg shadow-amber-500/25 group-hover:shadow-amber-500/40 transition-shadow">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="block text-sm font-bold tracking-wide text-white">Deshmukh Traders</span>
                <span className="block text-[10px] text-slate-500 tracking-widest uppercase">Customer Portal</span>
              </div>
            </Link>
          </div>

          {/* Nav Links */}
          <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
            <SidebarLink icon={Activity} label="Overview" active />
            <SidebarLink icon={Search} label="Browse Materials" badge="Soon" />
            <SidebarLink icon={ShoppingCart} label="My Orders" badge="Soon" />
            <SidebarLink icon={FileText} label="Get Quote" badge="Soon" />
            <SidebarLink icon={Heart} label="Saved Items" badge="Soon" />
            <div className="pt-6 pb-2 px-3">
              <span className="text-[10px] font-semibold text-slate-600 uppercase tracking-widest">Support</span>
            </div>
            <SidebarLink icon={MessageSquare} label="Contact Support" />
            <SidebarLink icon={HelpCircle} label="Help Center" />
          </nav>

          {/* Sidebar Footer */}
          <div className="px-4 py-4 border-t border-white/[0.04]">
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 w-full px-3 py-2.5 text-sm text-slate-500 hover:text-red-400 hover:bg-red-500/5 rounded-lg transition-all duration-200"
            >
              <LogOut className="w-4 h-4" />
              Sign Out
            </button>
          </div>
        </aside>

        {/* ── Main Content ── */}
        <div className="lg:ml-64">
          {/* Top Bar */}
          <header className="sticky top-0 z-30 bg-[#0c0f1a]/80 backdrop-blur-2xl border-b border-white/[0.04]">
            <div className="px-6 lg:px-8 py-4 flex items-center justify-between">
              <div className="lg:hidden flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                  <Building2 className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-sm">My Portal</span>
              </div>

              <div className="hidden lg:flex items-center gap-3 text-sm text-slate-500">
                <CalendarDays className="w-4 h-4" />
                {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                <span className="text-slate-700">·</span>
                <span>{currentTime}</span>
              </div>

              <div className="flex items-center gap-3">
                <button className="relative p-2 text-slate-500 hover:text-white hover:bg-white/5 rounded-xl transition-all">
                  <Bell className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-3 pl-3 border-l border-white/[0.06]">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/20 flex items-center justify-center text-sm font-bold text-amber-400">
                    {user?.name?.charAt(0) || 'C'}
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-sm font-medium text-white leading-none">{user?.name || 'Customer'}</p>
                    <p className="text-xs text-slate-600 mt-0.5">Customer</p>
                  </div>
                </div>
                <button
                  onClick={handleLogout}
                  className="lg:hidden p-2 text-slate-500 hover:text-red-400 rounded-lg transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>
          </header>

          {/* Page Content */}
          <main className="px-6 lg:px-8 py-8 max-w-[1400px]">
            {/* Welcome Banner */}
            <div className="relative overflow-hidden rounded-2xl mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600"></div>
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIvPjwvc3ZnPg==')] opacity-60"></div>
              <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-2xl"></div>
              <div className="absolute bottom-0 left-1/4 w-60 h-60 bg-amber-400/10 rounded-full translate-y-1/2 blur-2xl"></div>
              <div className="relative px-8 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <p className="text-amber-100 text-sm font-medium mb-1">{greeting}, {user?.name || 'Customer'} 👋</p>
                  <h1 className="text-2xl sm:text-3xl font-bold text-white font-display">
                    Welcome to Your Portal
                  </h1>
                  <p className="text-amber-100/70 text-sm mt-2 max-w-md">
                    Browse materials, get instant quotes, and track your orders — all in one place.
                  </p>
                </div>
                <button className="flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl text-white text-sm font-medium backdrop-blur-sm transition-all duration-300 hover:scale-105 shrink-0">
                  <Search className="w-4 h-4" />
                  Browse Materials
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
              <StatCard icon={ShoppingCart} label="Active Orders" value="0" color="blue" />
              <StatCard icon={Package} label="Total Orders" value="0" color="emerald" />
              <StatCard icon={FileText} label="Pending Quotes" value="0" color="violet" />
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Quick Actions — 2 col */}
              <div className="xl:col-span-2 bg-[#111428] border border-white/[0.04] rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-white font-display">What would you like to do?</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <ActionCard
                    icon={Search}
                    title="Browse Materials"
                    desc="View available building materials and prices"
                    color="amber"
                    onClick={() => alert('Coming in Phase 6')}
                  />
                  <ActionCard
                    icon={ShoppingCart}
                    title="My Orders"
                    desc="Track your active and past orders"
                    color="blue"
                    onClick={() => alert('Coming in Phase 7')}
                  />
                  <ActionCard
                    icon={FileText}
                    title="Get Quote"
                    desc="Calculate material costs instantly"
                    color="emerald"
                    onClick={() => alert('Coming in Phase 6')}
                  />
                  <ActionCard
                    icon={MessageSquare}
                    title="Contact Support"
                    desc="Get help from our team"
                    color="violet"
                    onClick={() => alert('Coming in Phase 3')}
                  />
                </div>
              </div>

              {/* Why Choose Us – 1 col */}
              <div className="bg-[#111428] border border-white/[0.04] rounded-2xl p-6">
                <h2 className="text-lg font-bold text-white font-display mb-6">Why Choose Us</h2>
                <div className="space-y-5">
                  {[
                    { icon: Star, text: 'ISI Certified Products', sub: 'All materials meet quality standards', color: 'amber' },
                    { icon: Truck, text: 'Same-Day Delivery', sub: 'Fast dispatch on in-stock items', color: 'emerald' },
                    { icon: Clock, text: '10+ Years Experience', sub: 'Trusted by 500+ businesses', color: 'blue' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className={`mt-0.5 w-9 h-9 rounded-lg bg-${item.color}-500/10 border border-${item.color}-500/15 flex items-center justify-center shrink-0`}>
                        <item.icon className={`w-4 h-4 text-${item.color}-400`} />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{item.text}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{item.sub}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-5 border-t border-white/[0.04]">
                  <Link href="/#contact" className="flex items-center gap-2 text-sm text-amber-400 hover:text-amber-300 font-medium transition-colors">
                    Need help? Contact us
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Delivery Info Banner */}
            <div className="mt-6 bg-[#111428] border border-white/[0.04] rounded-2xl p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                    </span>
                    <span className="text-sm font-medium text-emerald-400">Open for Orders</span>
                  </div>
                  <span className="text-xs text-slate-700">·</span>
                  <span className="text-xs text-slate-600">Delivery available across Maharashtra</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <Truck className="w-4 h-4 text-slate-600" />
                  Same-day dispatch for orders before 2 PM
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}

/* ─── Sub-components ─── */

function SidebarLink({ icon: Icon, label, active, badge }: any) {
  return (
    <button className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
      active
        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/10'
        : 'text-slate-500 hover:text-slate-300 hover:bg-white/[0.03]'
    }`}>
      <Icon className="w-[18px] h-[18px]" />
      <span className="flex-1 text-left">{label}</span>
      {badge && (
        <span className="px-2 py-0.5 text-[10px] font-semibold rounded-md bg-white/[0.04] text-slate-600">
          {badge}
        </span>
      )}
    </button>
  );
}

function StatCard({ icon: Icon, label, value, color }: any) {
  const colorMap: Record<string, { bg: string; border: string; icon: string; glow: string }> = {
    blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/15', icon: 'text-blue-400', glow: 'shadow-blue-500/5' },
    emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/15', icon: 'text-emerald-400', glow: 'shadow-emerald-500/5' },
    violet: { bg: 'bg-violet-500/10', border: 'border-violet-500/15', icon: 'text-violet-400', glow: 'shadow-violet-500/5' },
  };
  const c = colorMap[color] || colorMap.blue;

  return (
    <div className={`group bg-[#111428] border border-white/[0.04] rounded-2xl p-5 hover:border-white/[0.08] transition-all duration-300 hover:-translate-y-0.5 shadow-lg ${c.glow}`}>
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 ${c.bg} border ${c.border} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
          <Icon className={`w-5 h-5 ${c.icon}`} />
        </div>
      </div>
      <p className="text-2xl font-bold text-white font-display mb-1">{value}</p>
      <p className="text-xs text-slate-500">{label}</p>
    </div>
  );
}

function ActionCard({ icon: Icon, title, desc, color, onClick }: any) {
  const colorMap: Record<string, { hover: string; icon: string }> = {
    amber: { hover: 'hover:border-amber-500/20', icon: 'text-amber-400 bg-amber-500/10 border-amber-500/15' },
    blue: { hover: 'hover:border-blue-500/20', icon: 'text-blue-400 bg-blue-500/10 border-blue-500/15' },
    emerald: { hover: 'hover:border-emerald-500/20', icon: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/15' },
    violet: { hover: 'hover:border-violet-500/20', icon: 'text-violet-400 bg-violet-500/10 border-violet-500/15' },
  };
  const c = colorMap[color] || colorMap.amber;

  return (
    <button
      onClick={onClick}
      className={`group text-left p-5 rounded-xl bg-[#0c0f1a] border border-white/[0.04] ${c.hover} transition-all duration-300 hover:-translate-y-0.5`}
    >
      <div className={`w-10 h-10 rounded-xl ${c.icon} border flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
        <Icon className="w-5 h-5" />
      </div>
      <h3 className="font-semibold text-white text-sm mb-1 flex items-center gap-1">
        {title}
        <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-slate-500" />
      </h3>
      <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
    </button>
  );
}
