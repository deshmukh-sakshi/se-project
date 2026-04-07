export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold text-slate-900 mb-4">
            Deshmukh Traders
          </h1>
          <p className="text-xl text-slate-600 mb-8">
            Building Materials Management System
          </p>
          
          <div className="flex gap-4 justify-center mb-12">
            <a
              href="/login"
              className="px-8 py-3 bg-primary-600 text-white rounded-lg shadow-lg hover:bg-primary-700 transition font-semibold"
            >
              Sign In
            </a>
            <a
              href="/register"
              className="px-8 py-3 bg-white text-primary-600 border-2 border-primary-600 rounded-lg hover:bg-primary-50 transition font-semibold"
            >
              Sign Up
            </a>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 text-left">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">✅ Phase 2 Complete</h2>
            <div className="space-y-3 text-gray-700">
              <p>✓ Backend authentication with JWT</p>
              <p>✓ Login with phone or email</p>
              <p>✓ User registration</p>
              <p>✓ Protected routes</p>
              <p>✓ Admin & Customer dashboards</p>
            </div>
            
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm font-semibold text-blue-900 mb-2">Test Credentials:</p>
              <p className="text-sm text-blue-800">Admin: 9999999999 / admin123</p>
              <p className="text-sm text-blue-800">Customer: 8888888888 / customer123</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
