import React from "react";

export default function TaxCafeLanding() {
  return (
    <div className="font-sans bg-white text-gray-900">
      {/* URGENT BANNER */}
      <div className="bg-green-700 text-white py-2 text-center text-sm font-semibold animate-pulse">
        <span className="mr-2">🔴</span>
        URGENT: New FIRS penalties are now in effect. Avoid fines up to
        ₦10,000,000.
      </div>

      {/* NAVBAR */}
      <header className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="text-green-600 w-8">
              <svg
                fill="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M11 19V9H7V19H11ZM12 19V9H17V11H13V13H16V15H13V19H12Z M4 21V5Q4 4.175 4.588 3.587Q5.175 3 6 3H18Q18.825 3 19.413 3.587Q20 4.175 20 5V16H18V5H6V21H4Z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900">TaxCafe Nigeria</h2>
          </div>

          <nav className="hidden md:flex gap-7 text-sm font-medium">
            <a href="#features" className="hover:text-green-600">
              Features
            </a>
            <a href="#pricing" className="hover:text-green-600">
              Pricing
            </a>
            <a href="#testimonials" className="hover:text-green-600">
              Testimonials
            </a>
            <a href="#footer" className="hover:text-green-600">
              Contact
            </a>
          </nav>

          <div className="flex items-center gap-4">
            <button className="text-sm font-semibold hover:text-green-600 hidden sm:block">
              Log In
            </button>
            <button className="px-5 py-2.5 bg-green-600 text-white rounded-lg text-sm font-bold hover:bg-green-700">
              Get Started Free
            </button>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="pt-20 pb-28 text-center px-4" id="hero">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
            Stop Worrying About Tax.{" "}
            <span className="text-green-600">Start Living.</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
            TaxCafe is your automated system to track income, find savings, and
            guarantee 100% tax compliance in Nigeria. Finally, you can focus on
            what you do best.
          </p>

          <div className="mt-8">
            <button className="bg-green-600 text-white px-8 py-4 rounded-lg font-bold flex items-center gap-3 mx-auto hover:bg-green-700">
              Automate My Taxes Now →
            </button>
          </div>

          <div className="flex flex-wrap justify-center gap-6 mt-12 text-sm font-medium text-gray-600">
            <span className="flex items-center gap-2">
              <span className="text-green-600">✔</span>FIRS Compliant
            </span>
            <span className="flex items-center gap-2">
              <span className="text-green-600">✔</span>Bank-Level Security
            </span>
            <span className="flex items-center gap-2">
              <span className="text-green-600">✔</span>Join 5,000+ Nigerians
            </span>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="py-20 bg-green-50">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-extrabold mb-3">
            All-in-One Tax Confidence
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-12">
            Everything you need to manage your taxes smartly in one place.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            {[
              { title: "Income Tracker", icon: "📊" },
              { title: "Deduction Hunter", icon: "🔍" },
              { title: "Bank Account Sync", icon: "🏦" },
              { title: "Weekly Tax Review", icon: "🗓" },
              { title: "Smart Dashboard", icon: "📋" },
              { title: "Fast Onboarding", icon: "🚀" },
            ].map((f, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl border p-6 shadow-sm"
              >
                <div className="text-3xl text-green-600 mb-3">{f.icon}</div>
                <h3 className="text-xl font-bold">{f.title}</h3>
                <p className="text-gray-600 mt-2">
                  Automate and optimize your taxes without stress.
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section id="pricing" className="py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-extrabold">
            Simple, Transparent Pricing
          </h2>
          <p className="text-gray-600 mt-3 max-w-xl mx-auto">
            No hidden fees. Cancel anytime.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {/* Starter */}
            <div className="border rounded-xl p-6">
              <h3 className="font-bold text-lg">Starter</h3>
              <p className="text-3xl font-extrabold mt-3">Free</p>
              <button className="mt-6 w-full py-3 rounded-lg border border-green-600 text-green-600 font-semibold hover:bg-green-50">
                Get Started
              </button>
            </div>

            {/* Pro */}
            <div className="border-2 border-green-600 bg-green-50 rounded-xl p-6 relative">
              <span className="absolute -top-3 bg-green-600 text-white px-3 py-1 text-xs rounded-full">
                Most Popular
              </span>
              <h3 className="font-bold text-lg">Professional</h3>
              <p className="text-3xl font-extrabold mt-3">₦5,000/mo</p>
              <button className="mt-6 w-full py-3 rounded-lg bg-green-600 text-white font-bold hover:bg-green-700">
                Choose Plan
              </button>
            </div>

            {/* Business */}
            <div className="border rounded-xl p-6">
              <h3 className="font-bold text-lg">Business</h3>
              <p className="text-3xl font-extrabold mt-3">₦15,000/mo</p>
              <button className="mt-6 w-full py-3 rounded-lg border border-green-600 text-green-600 font-semibold hover:bg-green-50">
                Choose Plan
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="footer" className="bg-green-600 text-white py-10 text-center">
        <p className="font-semibold">
          TaxCafe Nigeria — Stop worrying about tax. Start living.
        </p>
        <p className="text-sm mt-2 opacity-80">
          © 2025 TaxCafe. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
