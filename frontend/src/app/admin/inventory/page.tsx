'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ProtectedRoute from '@/components/ProtectedRoute';
import { authService } from '@/lib/auth';
import { api } from '@/lib/api';
import {
  Package, Plus, Search, Filter, Edit2, Trash2, AlertTriangle,
  X, Save, ArrowLeft, TrendingDown, Box, DollarSign, Layers,
  ChevronDown, RefreshCw, Building2, LayoutDashboard
} from 'lucide-react';

interface Product {
  id: string;
  brandName: string;
  category: string;
  unit: string;
  stockQuantity: number;
  basePrice: number;
  lowStockThreshold: number;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

const CATEGORIES = ['CEMENT', 'STEEL', 'AGGREGATE', 'OTHER'];
const UNITS = ['BAGS', 'TONS', 'CUBIC_METER', 'PIECES'];

export default function InventoryPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [showLowStock, setShowLowStock] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    brandName: '',
    category: 'CEMENT',
    unit: 'BAGS',
    stockQuantity: '',
    basePrice: '',
    lowStockThreshold: '10',
    description: ''
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    filterProducts();
  }, [products, searchQuery, selectedCategory, showLowStock]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await api.get('/products');
      setProducts(response.data.products || []);
    } catch (error: any) {
      console.error('Failed to fetch products:', error);
      alert(error.response?.data?.error || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const filterProducts = () => {
    let filtered = [...products];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(p =>
        p.brandName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory !== 'ALL') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    // Low stock filter
    if (showLowStock) {
      filtered = filtered.filter(p => p.stockQuantity <= p.lowStockThreshold);
    }

    setFilteredProducts(filtered);
  };

  const handleOpenModal = (product?: Product) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        brandName: product.brandName,
        category: product.category,
        unit: product.unit,
        stockQuantity: product.stockQuantity.toString(),
        basePrice: product.basePrice.toString(),
        lowStockThreshold: product.lowStockThreshold.toString(),
        description: product.description || ''
      });
    } else {
      setEditingProduct(null);
      setFormData({
        brandName: '',
        category: 'CEMENT',
        unit: 'BAGS',
        stockQuantity: '',
        basePrice: '',
        lowStockThreshold: '10',
        description: ''
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingProduct(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (editingProduct) {
        // Update existing product
        await api.put(`/products/${editingProduct.id}`, formData);
        alert('Product updated successfully!');
      } else {
        // Create new product
        await api.post('/products', formData);
        alert('Product created successfully!');
      }
      
      handleCloseModal();
      fetchProducts();
    } catch (error: any) {
      console.error('Failed to save product:', error);
      alert(error.response?.data?.error || 'Failed to save product');
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;
    
    try {
      await api.delete(`/products/${id}`);
      alert('Product deleted successfully!');
      fetchProducts();
    } catch (error: any) {
      console.error('Failed to delete product:', error);
      alert(error.response?.data?.error || 'Failed to delete product');
    }
  };

  const lowStockCount = products.filter(p => p.stockQuantity <= p.lowStockThreshold).length;

  return (
    <ProtectedRoute requireAdmin>
      <div className="min-h-screen bg-[#091625] text-white">
        {/* Top Navigation Bar */}
        <header className="sticky top-0 z-30 bg-[#091625]/80 backdrop-blur-2xl border-b border-white/[0.04]">
          <div className="px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              {/* Left: Back + Title */}
              <div className="flex items-center gap-4">
                <Link
                  href="/admin"
                  className="flex items-center gap-2 px-3 py-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="text-sm font-medium">Back</span>
                </Link>
                <div className="h-6 w-px bg-white/10"></div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500/20 to-cyan-500/20 border border-sky-500/20 flex items-center justify-center">
                    <Package className="w-5 h-5 text-sky-400" />
                  </div>
                  <div>
                    <h1 className="text-lg font-bold text-white">Inventory Management</h1>
                    <p className="text-xs text-slate-500">Manage your product catalog</p>
                  </div>
                </div>
              </div>

              {/* Right: Actions */}
              <div className="flex items-center gap-3">
                <button
                  onClick={fetchProducts}
                  className="flex items-center gap-2 px-4 py-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span className="hidden sm:inline text-sm">Refresh</span>
                </button>
                <button
                  onClick={() => handleOpenModal()}
                  className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-sky-500 to-cyan-600 hover:from-sky-600 hover:to-cyan-700 rounded-lg text-white text-sm font-medium transition-all duration-300 hover:scale-105 shadow-lg shadow-sky-500/25"
                >
                  <Plus className="w-4 h-4" />
                  Add Product
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="px-6 lg:px-8 py-8 max-w-[1600px] mx-auto">
          {/* Low Stock Alert */}
          {lowStockCount > 0 && (
            <div className="mb-6 bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-5 h-5 text-amber-400" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-amber-400 mb-1">Low Stock Alert</h3>
                  <p className="text-sm text-amber-200/70">
                    {lowStockCount} product{lowStockCount > 1 ? 's' : ''} running low on stock. Consider restocking soon.
                  </p>
                </div>
                <button
                  onClick={() => setShowLowStock(!showLowStock)}
                  className="px-3 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/30 rounded-lg text-amber-400 text-xs font-medium transition-all"
                >
                  {showLowStock ? 'Show All' : 'View Items'}
                </button>
              </div>
            </div>
          )}

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
            <StatCard
              icon={Box}
              label="Total Products"
              value={products.length.toString()}
              color="sky"
            />
            <StatCard
              icon={Layers}
              label="Categories"
              value={new Set(products.map(p => p.category)).size.toString()}
              color="emerald"
            />
            <StatCard
              icon={TrendingDown}
              label="Low Stock Items"
              value={lowStockCount.toString()}
              color="amber"
            />
            <StatCard
              icon={DollarSign}
              label="Total Inventory Value"
              value={`₹${products.reduce((sum, p) => sum + (p.stockQuantity * p.basePrice), 0).toLocaleString()}`}
              color="cyan"
            />
          </div>

          {/* Filters & Search */}
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
                  <option value="ALL">All Categories</option>
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500 pointer-events-none" />
              </div>

              {/* Low Stock Toggle */}
              <button
                onClick={() => setShowLowStock(!showLowStock)}
                className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  showLowStock
                    ? 'bg-amber-500/20 border border-amber-500/30 text-amber-400'
                    : 'bg-[#091625] border border-white/[0.06] text-slate-400 hover:text-white'
                }`}
              >
                Low Stock Only
              </button>
            </div>
          </div>

          {/* Products Table */}
          <div className="bg-[#0d1f35] border border-white/[0.04] rounded-2xl overflow-hidden">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <RefreshCw className="w-8 h-8 text-sky-400 animate-spin" />
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="w-16 h-16 rounded-2xl bg-slate-800/50 border border-white/[0.04] flex items-center justify-center mb-4">
                  <Package className="w-8 h-8 text-slate-600" />
                </div>
                <p className="text-slate-500 text-sm">No products found</p>
                <button
                  onClick={() => handleOpenModal()}
                  className="mt-4 text-sky-400 hover:text-sky-300 text-sm font-medium transition-colors"
                >
                  Add your first product
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/[0.04]">
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Product</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Category</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Stock</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Unit</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Price</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-right text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.04]">
                    {filteredProducts.map((product) => (
                      <tr key={product.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="px-6 py-4">
                          <div>
                            <p className="text-sm font-medium text-white">{product.brandName}</p>
                            {product.description && (
                              <p className="text-xs text-slate-500 mt-0.5 truncate max-w-xs">{product.description}</p>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-sky-500/10 text-sky-400 border border-sky-500/20">
                            {product.category}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm font-medium text-white">{product.stockQuantity}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm text-slate-400">{product.unit}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm font-medium text-white">₹{product.basePrice.toLocaleString()}</p>
                        </td>
                        <td className="px-6 py-4">
                          {product.stockQuantity <= product.lowStockThreshold ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
                              <AlertTriangle className="w-3 h-3" />
                              Low Stock
                            </span>
                          ) : (
                            <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                              In Stock
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleOpenModal(product)}
                              className="p-2 text-slate-400 hover:text-sky-400 hover:bg-sky-500/10 rounded-lg transition-all"
                              title="Edit"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(product.id, product.brandName)}
                              className="p-2 text-slate-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </main>

        {/* Add/Edit Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-[#0d1f35] border border-white/[0.08] rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="sticky top-0 bg-[#0d1f35] border-b border-white/[0.04] px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-500/30 flex items-center justify-center">
                    <Package className="w-5 h-5 text-sky-400" />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-white">
                      {editingProduct ? 'Edit Product' : 'Add New Product'}
                    </h2>
                    <p className="text-xs text-slate-500">
                      {editingProduct ? 'Update product details' : 'Fill in the product information'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleCloseModal}
                  className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body */}
              <form onSubmit={handleSubmit} className="p-6 space-y-5">
                {/* Brand Name */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Brand Name <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.brandName}
                    onChange={(e) => setFormData({ ...formData, brandName: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#091625] border border-white/[0.06] rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-sky-500/50 transition-colors"
                    placeholder="e.g., ACC Cement, Tata Steel"
                  />
                </div>

                {/* Category & Unit */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Category <span className="text-red-400">*</span>
                    </label>
                    <select
                      required
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[#091625] border border-white/[0.06] rounded-lg text-white focus:outline-none focus:border-sky-500/50 transition-colors"
                    >
                      {CATEGORIES.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Unit <span className="text-red-400">*</span>
                    </label>
                    <select
                      required
                      value={formData.unit}
                      onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[#091625] border border-white/[0.06] rounded-lg text-white focus:outline-none focus:border-sky-500/50 transition-colors"
                    >
                      {UNITS.map(unit => (
                        <option key={unit} value={unit}>{unit}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Stock & Price */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Stock Quantity <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      step="0.01"
                      value={formData.stockQuantity}
                      onChange={(e) => setFormData({ ...formData, stockQuantity: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[#091625] border border-white/[0.06] rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-sky-500/50 transition-colors"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Base Price (₹) <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="number"
                      required
                      min="0"
                      step="0.01"
                      value={formData.basePrice}
                      onChange={(e) => setFormData({ ...formData, basePrice: e.target.value })}
                      className="w-full px-4 py-2.5 bg-[#091625] border border-white/[0.06] rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-sky-500/50 transition-colors"
                      placeholder="0.00"
                    />
                  </div>
                </div>

                {/* Low Stock Threshold */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Low Stock Threshold
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.lowStockThreshold}
                    onChange={(e) => setFormData({ ...formData, lowStockThreshold: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#091625] border border-white/[0.06] rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-sky-500/50 transition-colors"
                    placeholder="10"
                  />
                  <p className="text-xs text-slate-500 mt-1.5">Alert when stock falls below this value</p>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2.5 bg-[#091625] border border-white/[0.06] rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-sky-500/50 transition-colors resize-none"
                    placeholder="Optional product description..."
                  />
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3 pt-4 border-t border-white/[0.04]">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="flex-1 px-4 py-2.5 bg-white/5 hover:bg-white/10 border border-white/[0.06] rounded-lg text-white text-sm font-medium transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-sky-500 to-cyan-600 hover:from-sky-600 hover:to-cyan-700 rounded-lg text-white text-sm font-medium transition-all duration-300 hover:scale-105 shadow-lg shadow-sky-500/25"
                  >
                    <Save className="w-4 h-4" />
                    {editingProduct ? 'Update Product' : 'Create Product'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}

/* ─── Sub-components ─── */

function StatCard({ icon: Icon, label, value, color }: any) {
  const colorMap: Record<string, { bg: string; border: string; icon: string }> = {
    sky: { bg: 'bg-sky-500/10', border: 'border-sky-500/15', icon: 'text-sky-400' },
    emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/15', icon: 'text-emerald-400' },
    cyan: { bg: 'bg-cyan-500/10', border: 'border-cyan-500/15', icon: 'text-cyan-400' },
    amber: { bg: 'bg-amber-500/10', border: 'border-amber-500/15', icon: 'text-amber-400' },
  };
  const c = colorMap[color] || colorMap.sky;

  return (
    <div className="bg-[#0d1f35] border border-white/[0.04] rounded-2xl p-5 hover:border-white/[0.08] transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 ${c.bg} border ${c.border} rounded-xl flex items-center justify-center`}>
          <Icon className={`w-5 h-5 ${c.icon}`} />
        </div>
      </div>
      <p className="text-2xl font-bold text-white font-display mb-1">{value}</p>
      <p className="text-xs text-slate-500">{label}</p>
    </div>
  );
}
