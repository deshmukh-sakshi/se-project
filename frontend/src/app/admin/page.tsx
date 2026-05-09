'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ProtectedRoute from '@/components/ProtectedRoute';
import { authService } from '@/lib/auth';
import {
  LayoutDashboard, Package, ShoppingCart, Users, LogOut, Building2,
  TrendingUp, ArrowRight, ArrowUpRight, Bell, Settings, BarChart3,
  Boxes, Clock, ChevronRight, Wallet, Activity, CalendarDays
} from 'lucide-react';

export default function AdminDashboard() {
  const router = useRouter();
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
    <ProtectedRoute requireAdmin>
      <div className="min-h-screen bg-[#091625] text-white">
        {/* ── Sidebar ── */}
        <aside className="fixed top-0 left-0 bottom-0 w-64 bg-[#0b1a2e] border-r border-white/[0.04] z-40 hidden lg:flex flex-col">
          {/* Brand */}
          <div className="px-6 py-6 border-b border-white/[0.04]">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-sky-500/25 group-hover:shadow-sky-500/40 transition-shadow">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="block text-sm font-bold tracking-wide text-white">Deshmukh Traders</span>
                <span className="block text-[10px] text-slate-500 tracking-widest uppercase">Admin Panel</span>
              </div>
            </Link>
          </div>

          {/* Nav Links */}
          <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
            <SidebarLink icon={LayoutDashboard} label="Dashboard" href="/admin" active />
            <SidebarLink icon={Boxes} label="Inventory" href="/admin/inventory" />
            <SidebarLink icon={ShoppingCart} label="Orders" badge="Soon" />
            <SidebarLink icon={Users} label="Customers" badge="Soon" />
            <SidebarLink icon={BarChart3} label="Analytics" badge="Soon" />
            <SidebarLink icon={Wallet} label="Market Rates" badge="Soon" />
            <div className="pt-6 pb-2 px-3">
              <span className="text-[10px] font-semibold text-slate-600 uppercase tracking-widest">Settings</span>
            </div>
            <SidebarLink icon={Settings} label="Settings" />
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
          <header className="sticky top-0 z-30 bg-[#091625]/80 backdrop-blur-2xl border-b border-white/[0.04]">
            <div className="px-6 lg:px-8 py-4 flex items-center justify-between">
              {/* Mobile Brand */}
              <div className="lg:hidden flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-500 to-cyan-600 flex items-center justify-center">
                  <Building2 className="w-4 h-4 text-white" />
                </div>
                <span className="font-bold text-sm">Admin</span>
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
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-sky-500 rounded-full"></span>
                </button>
                <div className="flex items-center gap-3 pl-3 border-l border-white/[0.06]">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-500/20 to-cyan-500/20 border border-sky-500/20 flex items-center justify-center text-sm font-bold text-sky-400">
                    {user?.name?.charAt(0) || 'A'}
                  </div>
                  <div className="hidden sm:block">
                    <p className="text-sm font-medium text-white leading-none">{user?.name || 'Admin'}</p>
                    <p className="text-xs text-slate-600 mt-0.5">Administrator</p>
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
              <div className="absolute inset-0 bg-gradient-to-r from-sky-600 via-cyan-600 to-teal-600"></div>
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIvPjwvc3ZnPg==')] opacity-60"></div>
              <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3 blur-2xl"></div>
              <div className="absolute bottom-0 left-1/3 w-60 h-60 bg-sky-400/10 rounded-full translate-y-1/2 blur-2xl"></div>
              <div className="relative px-8 py-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <p className="text-sky-100 text-sm font-medium mb-1">{greeting}, {user?.name || 'Admin'} 👋</p>
                  <h1 className="text-2xl sm:text-3xl font-bold text-white font-display">
                    Your Business at a Glance
                  </h1>
                  <p className="text-sky-100/70 text-sm mt-2 max-w-md">
                    Monitor orders, manage inventory, and track your business growth all from one place.
                  </p>
                </div>
                <button className="flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl text-white text-sm font-medium backdrop-blur-sm transition-all duration-300 hover:scale-105 shrink-0">
                  <Activity className="w-4 h-4" />
                  View Reports
                </button>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8">
              <StatCard
                icon={ShoppingCart}
                label="Orders Today"
                value="0"
                change="+0%"
                changeType="neutral"
                color="sky"
              />
              <StatCard
                icon={Package}
                label="Total Products"
                value="0"
                change="—"
                changeType="neutral"
                color="emerald"
              />
              <StatCard
                icon={Users}
                label="Customers"
                value="0"
                change="—"
                changeType="neutral"
                color="cyan"
              />
              <StatCard
                icon={TrendingUp}
                label="Revenue"
                value="₹0"
                change="—"
                changeType="neutral"
                color="amber"
              />
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Quick Actions — 2 col wide */}
              <div className="xl:col-span-2 bg-[#0d1f35] border border-white/[0.04] rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-white font-display">Quick Actions</h2>
                  <span className="text-xs text-slate-600">Manage your store</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <ActionCard
                    icon={Boxes}
                    title="Manage Inventory"
                    desc="Add, edit or remove products"
                    color="sky"
                    onClick={() => router.push('/admin/inventory')}
                  />
                  <ActionCard
                    icon={ShoppingCart}
                    title="View Orders"
                    desc="Process pending orders"
                    color="emerald"
                    onClick={() => alert('Coming in Phase 7')}
                  />
                  <ActionCard
                    icon={BarChart3}
                    title="Market Rates"
                    desc="Update live pricing"
                    color="amber"
                    onClick={() => alert('Coming in Phase 5')}
                  />
                </div>
              </div>

              {/* Recent Activity — 1 col */}
              <div className="bg-[#0d1f35] border border-white/[0.04] rounded-2xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-white font-display">Recent Activity</h2>
                  <button className="text-xs text-sky-400 hover:text-sky-300 transition-colors">View All</button>
                </div>
                <div className="space-y-4">
                  {[
                    { text: 'System initialized', time: 'Just now', icon: Activity, color: 'emerald' },
                    { text: 'Authentication enabled', time: 'Today', icon: Settings, color: 'sky' },
                    { text: 'Admin account created', time: 'Today', icon: Users, color: 'cyan' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 group">
                      <div className={`mt-0.5 w-8 h-8 rounded-lg bg-${item.color}-500/10 border border-${item.color}-500/20 flex items-center justify-center shrink-0`}>
                        <item.icon className={`w-4 h-4 text-${item.color}-400`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-slate-300 truncate">{item.text}</p>
                        <p className="text-xs text-slate-600 mt-0.5">{item.time}</p>
                      </div>
                    </div>
                  ))}
                  <div className="pt-3 border-t border-white/[0.04]">
                    <p className="text-xs text-slate-600 text-center">More activity will appear as you use the system</p>
                  </div>
                </div>
              </div>
            </div>

            {/* System Status */}
            <div className="mt-6 bg-[#0d1f35] border border-white/[0.04] rounded-2xl p-6">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                  <span className="text-sm font-medium text-emerald-400">All Systems Operational</span>
                </div>
                <span className="text-xs text-slate-700">·</span>
                <span className="text-xs text-slate-600">Authentication Active</span>
                <span className="text-xs text-slate-700">·</span>
                <span className="text-xs text-slate-600">Database Connected</span>
              </div>
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
}

/* ─── Sub-components ─── */

function SidebarLink({ icon: Icon, label, active, badge, href }: any) {
  const content = (
    <>
      <Icon className="w-[18px] h-[18px]" />
      <span className="flex-1 text-left">{label}</span>
      {badge && (
        <span className="px-2 py-0.5 text-[10px] font-semibold rounded-md bg-white/[0.04] text-slate-600">
          {badge}
        </span>
      )}
    </>
  );

  const className = `flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
    active
      ? 'bg-sky-500/10 text-sky-400 border border-sky-500/10'
      : 'text-slate-500 hover:text-slate-300 hover:bg-white/[0.03]'
  }`;

  if (href && !badge) {
    return (
      <Link href={href} className={className}>
        {content}
      </Link>
    );
  }

  return (
    <button className={className} disabled={!!badge}>
      {content}
    </button>
  );
}

function StatCard({ icon: Icon, label, value, change, changeType, color }: any) {
  const colorMap: Record<string, { bg: string; border: string; icon: string; glow: string }> = {
    sky: { bg: 'bg-sky-500/10', border: 'border-sky-500/15', icon: 'text-sky-400', glow: 'shadow-sky-500/5' },
    emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/15', icon: 'text-emerald-400', glow: 'shadow-emerald-500/5' },
    cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/15', icon: 'text-cyan-400', glow: 'shadow-cyan-500/5' },
    amber: { bg: 'bg-amber-500/10', border: 'border-amber-500/15', icon: 'text-amber-400', glow: 'shadow-amber-500/5' },
  };
  const c = colorMap[color] || colorMap.sky;

  return (
    <div className={`group bg-[#0d1f35] border border-white/[0.04] rounded-2xl p-5 hover:border-white/[0.08] transition-all duration-300 hover:-translate-y-0.5 shadow-lg ${c.glow}`}>
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 ${c.bg} border ${c.border} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
          <Icon className={`w-5 h-5 ${c.icon}`} />
        </div>
        <span className="text-xs text-slate-600 font-medium">{change}</span>
      </div>
      <p className="text-2xl font-bold text-white font-display mb-1">{value}</p>
      <p className="text-xs text-slate-500">{label}</p>
    </div>
  );
}

function ActionCard({ icon: Icon, title, desc, color, onClick }: any) {
  const colorMap: Record<string, { hover: string; icon: string; border: string }> = {
    sky: { hover: 'hover:border-sky-500/20', icon: 'text-sky-400 bg-sky-500/10 border-sky-500/15', border: 'group-hover:border-sky-500/30' },
    emerald: { hover: 'hover:border-emerald-500/20', icon: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/15', border: 'group-hover:border-emerald-500/30' },
    amber: { hover: 'hover:border-amber-500/20', icon: 'text-amber-400 bg-amber-500/10 border-amber-500/15', border: 'group-hover:border-amber-500/30' },
  };
  const c = colorMap[color] || colorMap.sky;

  return (
    <button
      onClick={onClick}
      className={`group text-left p-5 rounded-xl bg-[#091625] border border-white/[0.04] ${c.hover} transition-all duration-300 hover:-translate-y-0.5`}
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
