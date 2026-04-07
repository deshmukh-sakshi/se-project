'use client';

import Link from 'next/link';
import { Building2 } from 'lucide-react';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 shadow-sm z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
            <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">Deshmukh Traders</h1>
              <p className="text-xs text-gray-500 -mt-0.5">Building Materials</p>
            </div>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium text-gray-700 hover:text-primary-600 transition">
              Home
            </Link>
            <Link href="/#services" className="text-sm font-medium text-gray-700 hover:text-primary-600 transition">
              Services
            </Link>
            <Link href="/#products" className="text-sm font-medium text-gray-700 hover:text-primary-600 transition">
              Products
            </Link>
            <Link href="/#about" className="text-sm font-medium text-gray-700 hover:text-primary-600 transition">
              About
            </Link>
            <Link href="/#contact" className="text-sm font-medium text-gray-700 hover:text-primary-600 transition">
              Contact
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-medium text-gray-700 hover:text-primary-600 transition px-4 py-2"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="text-sm font-semibold text-white bg-primary-600 hover:bg-primary-700 transition px-5 py-2 rounded-lg"
            >
              Get Quote
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
