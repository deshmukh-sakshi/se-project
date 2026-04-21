'use client';

import Link from 'next/link';
import { Building2, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium text-gray-700 hover:text-primary-600 transition">
              Home
            </Link>
            <Link href="/#services" className="text-sm font-medium text-gray-700 hover:text-primary-600 transition">
              Services
            </Link>
            <Link href="/#about" className="text-sm font-medium text-gray-700 hover:text-primary-600 transition">
              About
            </Link>
            <Link href="/#contact" className="text-sm font-medium text-gray-700 hover:text-primary-600 transition">
              Contact
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-medium text-gray-700 hover:text-primary-600 transition px-4 py-2"
            >
              Login
            </Link>
            <Link
              href="/register"
              className="text-sm font-semibold text-white bg-primary-600 hover:bg-primary-700 transition px-5 py-2 rounded-lg shadow-sm"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-3">
              <Link
                href="/"
                className="text-sm font-medium text-gray-700 hover:text-primary-600 transition px-4 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/#services"
                className="text-sm font-medium text-gray-700 hover:text-primary-600 transition px-4 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Services
              </Link>
              <Link
                href="/#about"
                className="text-sm font-medium text-gray-700 hover:text-primary-600 transition px-4 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/#contact"
                className="text-sm font-medium text-gray-700 hover:text-primary-600 transition px-4 py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <div className="border-t border-gray-200 pt-3 mt-3">
                <Link
                  href="/login"
                  className="block text-sm font-medium text-gray-700 hover:text-primary-600 transition px-4 py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="block text-sm font-semibold text-white bg-primary-600 hover:bg-primary-700 transition px-4 py-2 rounded-lg mt-2 mx-4 text-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
