'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/lib/api';
import { authService } from '@/lib/auth';
import {
  ShoppingCart, Search, Filter, Package, TrendingUp, TrendingDown,
  Minus, Plus, X, ChevronDown, Building2, ArrowRight, Sparkles
} from 'lucide-react';

interface Product {
  id: string;
  brandName: string;
  category: string;
  unit: string;
  stockQuantity: number;
  basePrice: number;
  description?: string;
}

interface CartItem extends Product {
  quantity: number;
}

const CATEGORIES = ['ALL', 'CEMENT', 'STEEL', 'AGGREGATE', 'OTHER'];

export default function ProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [showCart, setShowCart] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = authService.getStoredUser();
    setUser(userData);
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, searchQuery, selectedCategory]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await api.get('/products');
      setProducts(response.data.products || []);
    } catch (error: any) {
      console.error('Failed to fetch products:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = [...products];

    if (searchQuery) {
      filtered = filtered.filter(p =>
        p.brandName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory !== 'ALL') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    setFilteredProducts(filtered);
  };

  const addToCart = (product: Product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart(cart.map(item => {
      if (item.id === productId) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const removeFromCart = (productId: string) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.basePrice * item.quantity), 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      CEMENT: 'sky',
      STEEL: 'emerald',
      AGGREGATE: 'amber',
      OTHER: 'cyan'
    };
    return colors[category] || 'slate';
  };

  return (
    <div className="min-h-screen bg-[#091625] text-white">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-[#091625]/80 backdrop-blur-2xl border-b border-white/[0.04]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-sky-500/25">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="block text-sm font-bold tracking-wide text-white">Deshmukh Traders</span>
                <span className="block text-[10px] text-slate-500 tracking-widest uppercase">Product Catalog</span>
              </div>
            </Link>

            {/* Actions */}
            <div className="flex items-center gap-3">
              {user ? (
                <>
                  <span className="hidden sm:block text-sm text-slate-400">
                    Welcome, {user.name}
                  </span>
                  <Link
                    href={user.role === 'ADMIN' ? '/admin' : '/customer'}
                    className="px-4 py-2 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                  >
                    Dashboard
                  </Link>
                </>
              ) : (
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm bg-sky-500/10 text-sky-400 hover:bg-sky-500/20 rounded-lg transition-all"
                >
                  Login
                </Link>
              )}
              
              <button
                onClick={() => setShowCart(true)}
                className="relative p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-sky-500 rounded-full text-xs flex items-center justify-center text-white font-bold">
                    {cartItemCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-2xl mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-sky-600 via-cyan-600 to-teal-600"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMSIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIvPjwvc3ZnPg==')] opacity-60"></div>
          <div className="relative px-8 py-12 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-medium text-white mb-4">
              <Sparkles className="w-3 h-3" />
              Quality Building Materials
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              Browse Our Products
            </h1>
            <p className="text-sky-100/70 text-sm max-w-2xl mx-auto">
              Premium quality cement, steel, aggregates and more for all your construction needs
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-[#0d1f35] border border-white/[0.04] rounded-2xl p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#091625] border border-white/[0.06] rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-sky-500/50 transition-colors"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-10 pr-10 py-2.5 bg-[#091625] border border-white/[0.06] rounded-lg text-white focus:outline-none focus:border-sky-500/50 transition-colors appearance-none cursor-pointer min-w-[180px]"
              >
                {CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat === 'ALL' ? 'All Categories' : cat}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-sky-400"></div>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <Package className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-500">No products found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => {
              const color = getCategoryColor(product.category);
              const inCart = cart.find(item => item.id === product.id);
              
              return (
                <div
                  key={product.id}
                  className="group bg-[#0d1f35] border border-white/[0.04] rounded-2xl p-6 hover:border-white/[0.08] transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Category Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-${color}-500/10 text-${color}-400 border border-${color}-500/20`}>
                      {product.category}
                    </span>
                    {product.stockQuantity <= 10 && (
                      <span className="text-xs text-amber-400">Low Stock</span>
                    )}
                  </div>

                  {/* Product Info */}
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-sky-400 transition-colors">
                    {product.brandName}
                  </h3>
                  {product.description && (
                    <p className="text-sm text-slate-500 mb-4 line-clamp-2">
                      {product.description}
                    </p>
                  )}

                  {/* Price & Stock */}
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-2xl font-bold text-white">₹{product.basePrice.toLocaleString()}</span>
                    <span className="text-sm text-slate-500">/ {product.unit}</span>
                  </div>

                  <div className="text-xs text-slate-600 mb-4">
                    Stock: {product.stockQuantity} {product.unit}
                  </div>

                  {/* Add to Cart */}
                  <button
                    onClick={() => addToCart(product)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-sky-500 to-cyan-600 hover:from-sky-600 hover:to-cyan-700 rounded-lg text-white text-sm font-medium transition-all duration-300 hover:scale-105 shadow-lg shadow-sky-500/25"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    {inCart ? `Added (${inCart.quantity})` : 'Add to Cart'}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Cart Sidebar */}
      {showCart && (
        <div className="fixed inset-0 z-50 flex items-center justify-end">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setShowCart(false)}
          ></div>
          
          <div className="relative w-full max-w-md h-full bg-[#0d1f35] border-l border-white/[0.08] flex flex-col">
            {/* Cart Header */}
            <div className="px-6 py-4 border-b border-white/[0.04] flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-white">Your Cart</h2>
                <p className="text-xs text-slate-500">{cartItemCount} items</p>
              </div>
              <button
                onClick={() => setShowCart(false)}
                className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                  <p className="text-slate-500 text-sm">Your cart is empty</p>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="bg-[#091625] border border-white/[0.04] rounded-xl p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-medium text-white text-sm mb-1">{item.brandName}</h3>
                        <p className="text-xs text-slate-500">{item.category}</p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-1 text-slate-500 hover:text-red-400 transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-7 h-7 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded transition-all"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-10 text-center text-sm font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-7 h-7 flex items-center justify-center bg-white/5 hover:bg-white/10 rounded transition-all"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="text-sm font-bold text-white">
                        ₹{(item.basePrice * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Cart Footer */}
            {cart.length > 0 && (
              <div className="px-6 py-4 border-t border-white/[0.04] space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Subtotal</span>
                  <span className="text-xl font-bold text-white">₹{cartTotal.toLocaleString()}</span>
                </div>
                <p className="text-xs text-slate-500">
                  * Final price will include bulk discounts, labor, transport, and GST
                </p>
                <button
                  onClick={() => {
                    if (!user) {
                      router.push('/login');
                    } else {
                      // TODO: Navigate to checkout
                      alert('Checkout coming in Phase 6!');
                    }
                  }}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-sky-500 to-cyan-600 hover:from-sky-600 hover:to-cyan-700 rounded-lg text-white font-medium transition-all duration-300 hover:scale-105 shadow-lg shadow-sky-500/25"
                >
                  Proceed to Checkout
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
