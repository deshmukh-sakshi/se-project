'use client';

import { useState } from 'react';
import { api } from '@/lib/api';
import { Calculator, TrendingUp, Package } from 'lucide-react';

export default function TestPricingPage() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const testSingleItem = async () => {
    setLoading(true);
    try {
      const response = await api.post('/pricing/calculate', {
        basePrice: 350,
        quantity: 100,
        category: 'CEMENT',
        unit: 'BAGS',
        distance: 15
      });
      setResult({ type: 'single', data: response.data });
    } catch (error: any) {
      alert(error.response?.data?.error || 'Failed to calculate price');
    } finally {
      setLoading(false);
    }
  };

  const testMultiItem = async () => {
    setLoading(true);
    try {
      const response = await api.post('/pricing/calculate-order', {
        items: [
          {
            productId: '1',
            brandName: 'ACC Cement',
            basePrice: 350,
            quantity: 100,
            category: 'CEMENT',
            unit: 'BAGS'
          },
          {
            productId: '2',
            brandName: 'Tata Steel',
            basePrice: 55000,
            quantity: 2,
            category: 'STEEL',
            unit: 'TONS'
          }
        ],
        distance: 15
      });
      setResult({ type: 'multi', data: response.data });
    } catch (error: any) {
      alert(error.response?.data?.error || 'Failed to calculate order price');
    } finally {
      setLoading(false);
    }
  };

  const testMarketRates = async () => {
    setLoading(true);
    try {
      const response = await api.get('/market-rates/latest');
      setResult({ type: 'market', data: response.data });
    } catch (error: any) {
      alert(error.response?.data?.error || 'Failed to fetch market rates');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#091625] text-white p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Phase 5 Testing - Pricing & Market Rates</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <button
            onClick={testSingleItem}
            disabled={loading}
            className="p-6 bg-sky-500/10 border border-sky-500/20 rounded-xl hover:bg-sky-500/20 transition-all"
          >
            <Calculator className="w-8 h-8 text-sky-400 mb-2" />
            <h3 className="font-semibold mb-1">Test Single Item</h3>
            <p className="text-xs text-slate-400">100 bags cement, 15km</p>
          </button>

          <button
            onClick={testMultiItem}
            disabled={loading}
            className="p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-xl hover:bg-emerald-500/20 transition-all"
          >
            <Package className="w-8 h-8 text-emerald-400 mb-2" />
            <h3 className="font-semibold mb-1">Test Multi-Item</h3>
            <p className="text-xs text-slate-400">Cement + Steel order</p>
          </button>

          <button
            onClick={testMarketRates}
            disabled={loading}
            className="p-6 bg-amber-500/10 border border-amber-500/20 rounded-xl hover:bg-amber-500/20 transition-all"
          >
            <TrendingUp className="w-8 h-8 text-amber-400 mb-2" />
            <h3 className="font-semibold mb-1">Market Rates</h3>
            <p className="text-xs text-slate-400">View current rates</p>
          </button>
        </div>

        {loading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-sky-400"></div>
          </div>
        )}

        {result && !loading && (
          <div className="bg-[#0d1f35] border border-white/[0.04] rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4">Results</h2>
            <pre className="bg-[#091625] p-4 rounded-lg overflow-auto text-sm">
              {JSON.stringify(result.data, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}
