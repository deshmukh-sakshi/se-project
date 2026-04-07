'use client';

import { useEffect, useState } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { authService } from '@/lib/auth';
import { ShoppingCart, Package, FileText, LogOut } from 'lucide-react';

export default function CustomerDashboard() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = authService.getStoredUser();
    setUser(userData);
  }, []);

  const handleLogout = () => {
    authService.logout();
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        {/* Header - Fixed */}
        <header className="fixed top-0 left-0 right-0 bg-white shadow-sm border-b border-gray-200 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div className="flex-1 min-w-0">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900 truncate">Customer Portal</h1>
                <p className="text-xs sm:text-sm text-gray-600 mt-0.5 truncate">Welcome, {user?.name}</p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition whitespace-nowrap flex-shrink-0"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </header>

        {/* Main Content - Add padding-top to account for fixed header */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatCard
              icon={<ShoppingCart className="w-6 h-6" />}
              title="Active Orders"
              value="0"
              color="bg-blue-500"
            />
            <StatCard
              icon={<Package className="w-6 h-6" />}
              title="Total Orders"
              value="0"
              color="bg-green-500"
            />
            <StatCard
              icon={<FileText className="w-6 h-6" />}
              title="Pending Quotes"
              value="0"
              color="bg-purple-500"
            />
          </div>

          {/* Actions */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">What would you like to do?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ActionButton
                title="Browse Materials"
                description="View available building materials"
                onClick={() => alert('Coming in Phase 6')}
              />
              <ActionButton
                title="My Orders"
                description="Track your order history"
                onClick={() => alert('Coming in Phase 7')}
              />
              <ActionButton
                title="Get Quote"
                description="Calculate material costs"
                onClick={() => alert('Coming in Phase 6')}
              />
              <ActionButton
                title="Contact Support"
                description="Get help from our team"
                onClick={() => alert('Coming in Phase 3')}
              />
            </div>
          </div>

          {/* Phase Status */}
          <div className="mt-8 bg-primary-50 border border-primary-200 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-primary-900 mb-2">
              ✅ Welcome to Your Portal
            </h3>
            <p className="text-primary-700 text-sm">
              Browse materials, get quotes, and track orders - all in one place.
            </p>
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}

function StatCard({ icon, title, value, color }: any) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`${color} p-3 rounded-lg text-white`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

function ActionButton({ title, description, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className="text-left p-4 border-2 border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition"
    >
      <h3 className="font-semibold text-gray-900 mb-1">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </button>
  );
}
