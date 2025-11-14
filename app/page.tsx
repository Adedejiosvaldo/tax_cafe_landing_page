import Link from "next/link";
import { CountdownTimer } from "./components/CountdownTimer";
import Image from "next/image";
export default function Home() {
  // Set the target date for the countdown (e.g., 28 days from now, or a specific filing deadline)
  // You can adjust this date to match your actual filing deadline
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 28); // 28 days from now
  targetDate.setHours(23, 59, 59, 999); // End of day

  return (
    <div className="relative flex min-h-screen w-full flex-col group/design-root">
      <div className="sticky top-0 z-50">
        <div className="bg-red-600 text-white py-2 text-center text-sm font-semibold animate-pulse">
          <span className="mr-2">🔴</span> URGENT: New FIRS penalties are now in
          effect. Avoid fines up to ₦10,000,000.
        </div>
        <header className="bg-white border-b border-border-light shadow-sm sticky top-0 z-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-20 items-center justify-between">
              <Link
                href="/"
                className="flex items-center gap-3 hover:opacity-80 transition-opacity"
              >
                <div className="relative w-12 h-12">
                  <Image
                    src="/tclogo.png"
                    alt="TaxCafe Logo"
                    fill
                    className="object-contain"
                  />
                </div>
                <div>
                  <h2 className="text-gray-900 text-xl font-bold">
                    TaxCafe Nigeria
                  </h2>
                  <p className="text-xs text-text-light-body hidden sm:block">
                    Stop Worrying About Tax
                  </p>
                </div>
              </Link>
              <nav className="hidden md:flex items-center gap-8">
                <Link
                  className="text-gray-600 hover:text-primary text-sm font-medium transition-colors relative group"
                  href="/tax-ai"
                >
                  Tax AI
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
                </Link>
                <Link
                  className="text-gray-600 hover:text-primary text-sm font-medium transition-colors relative group"
                  href="/tax-calculator"
                >
                  Tax Calculator
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
                </Link>
                <Link
                  className="text-gray-600 hover:text-primary text-sm font-medium transition-colors relative group"
                  href="#footer"
                >
                  Contact
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
                </Link>
              </nav>
              <div className="flex items-center gap-4">
                <Link
                  className="hidden sm:block text-gray-600 hover:text-primary text-sm font-semibold transition-colors px-3 py-2 rounded-lg hover:bg-gray-50"
                  href="#"
                >
                  Log In
                </Link>
                <Link
                  className="px-5 py-2.5 rounded-lg text-sm font-bold text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary shadow-lg transition-all hover:shadow-xl"
                  href="#"
                >
                  Get Started Free
                </Link>
              </div>
            </div>
          </div>
        </header>
      </div>

      <main className="flex-grow">
        <section className="w-full pt-16 pb-24 sm:pt-24 sm:pb-32" id="hero">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tighter text-gray-900">
                Stop Worrying About Tax.{" "}
                <span className="text-primary mt-2 block">Start Living.</span>
              </h1>
              <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-text-light-body">
                TaxCafe is your automated system to track income, find savings,
                and guarantee 100% tax compliance in Nigeria. Finally, you can
                focus on what you do best.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  className="w-full sm:w-auto flex items-center justify-center px-8 py-4 border border-transparent rounded-lg shadow-sm text-base font-bold text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                  href="#"
                >
                  Automate My Taxes Now
                  <span className="material-symbols-outlined ml-2 text-xl">
                    arrow_forward
                  </span>
                </Link>
              </div>
              <div className="mt-12 flex flex-wrap justify-center items-center gap-x-8 gap-y-4">
                <div className="flex items-center gap-2 text-sm text-text-light-body font-medium">
                  <span className="material-symbols-outlined text-green-500 text-base">
                    verified
                  </span>{" "}
                  FIRS Compliant
                </div>
                <div className="flex items-center gap-2 text-sm text-text-light-body font-medium">
                  <span className="material-symbols-outlined text-green-500 text-base">
                    verified
                  </span>{" "}
                  Bank-Level Security
                </div>
                <div className="flex items-center gap-2 text-sm text-text-light-body font-medium">
                  <span className="material-symbols-outlined text-green-500 text-base">
                    verified
                  </span>{" "}
                  Join 5,000+ Nigerians
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 sm:py-32 bg-white" id="problem">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="text-center lg:text-left">
                <p className="font-semibold text-red-600 uppercase tracking-wider">
                  The Real Cost of Non-Compliance
                </p>
                <h2 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
                  Penalties Are Not a &quot;Maybe&quot;
                </h2>
                <p className="mt-4 max-w-xl mx-auto lg:mx-0 text-lg text-text-light-body">
                  The Federal Inland Revenue Service (FIRS) has intensified its
                  enforcement. Simple mistakes now lead to crippling fines,
                  interest charges, and even legal action. Ignoring your taxes
                  is the most expensive business decision you can make.
                </p>
                <div className="mt-8 p-6 bg-red-50 border border-red-200 rounded-lg">
                  <p className="text-sm font-semibold text-red-700">
                    Next Filing Deadline:
                  </p>
                  <CountdownTimer targetDate={targetDate} />
                </div>
              </div>
              <div className="flex justify-center  items-center">
                <div className="relative w-full max-w-md p-6 bg-background-light rounded-xl shadow-2xl border border-border-light">
                  <span className="absolute -top-5 -left-5 size-12 flex items-center justify-center bg-red-600 text-white rounded-full shadow-lg">
                    <span className="material-symbols-outlined text-2xl">
                      warning
                    </span>
                  </span>
                  <h3 className="text-xl font-bold text-gray-900">
                    Example: FIRS Late Filing Penalty
                  </h3>
                  <div className="mt-4 space-y-3 text-sm text-text-light-body">
                    <p>
                      <strong className="text-gray-800">
                        Initial Penalty:
                      </strong>{" "}
                      ₦50,000 for companies, ₦25,000 for individuals in the
                      first month.
                    </p>
                    <p>
                      <strong className="text-gray-800">
                        Additional Penalty:
                      </strong>{" "}
                      ₦25,000 / ₦10,000 for each month the failure continues.
                    </p>
                    <p>
                      <strong className="text-gray-800">Interest:</strong>{" "}
                      Charged at the prevailing commercial rate on the principal
                      tax due.
                    </p>
                    <p className="mt-4 pt-3 border-t border-border-light font-semibold text-red-600">
                      This can quickly escalate into millions of Naira. TaxCafe
                      prevents this for a tiny fraction of the cost.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 sm:py-32" id="solution">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="relative flex justify-center">
                <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl -z-10"></div>
                <Image
                  alt="TaxCafe App on a Phone"
                  className="max-w-xs md:max-w-sm rounded-3xl shadow-2xl transform lg:rotate-[-5deg]"
                  width={500}
                  height={500}
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBKKTWxbZ3Jd0ERFospVM63q3F_H-HzbWLOd322T9oXxOCazkSKiQt1hm-ZC9osP10lnmzXW0UCDEsFgqifN4NVoZfs_7QzraZkq3oQZZ580aa3nlIk7AoKa9BBzlrdZEk4cR4Y_XGmZZ_qX9vxBbAoPGDhXLHWWwX4Tg3DR8C0eDLXkBsLJ4L-MnisILyHC7hPlel49tU2k8IRk0Z0VSFLiU98KEhetwZQ8nhOGWkRdp1RGm8jTeMpLHXXe2xlhjJgNHucOiDeSaAh"
                />
              </div>
              <div>
                <p className="font-semibold text-primary uppercase tracking-wider">
                  The Solution is Automation
                </p>
                <h2 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
                  Tax Compliance on Autopilot in 3 Simple Steps
                </h2>
                <p className="mt-4 text-lg text-text-light-body">
                  We&apos;ve built a system that does the heavy lifting for you.
                  Get set up in minutes and experience true financial peace of
                  mind.
                </p>
                <ul className="mt-10 space-y-8">
                  <li className="flex items-start gap-4">
                    <div className="flex-shrink-0 size-10 flex items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-lg">
                      1
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">
                        Connect Your Accounts
                      </h3>
                      <p className="mt-1 text-text-light-body">
                        Securely link your bank accounts. TaxCafe automatically
                        imports and categorizes all your income and expenses in
                        real-time.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="flex-shrink-0 size-10 flex items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-lg">
                      2
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">
                        Review Your Dashboard
                      </h3>
                      <p className="mt-1 text-text-light-body">
                        Watch as our AI, &quot;The Deduction Hunter,&quot; finds
                        every possible tax saving. Your Tax Confidence Dashboard
                        shows your exact position 24/7.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <div className="flex-shrink-0 size-10 flex items-center justify-center rounded-full bg-primary/10 text-primary font-bold text-lg">
                      3
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">
                        File with Confidence
                      </h3>
                      <p className="mt-1 text-text-light-body">
                        When it&apos;s time to file, your reports are ready.
                        File yourself in minutes or invite your accountant. Zero
                        stress, zero penalties. Guaranteed.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 sm:py-32 bg-white" id="audience">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-primary font-semibold uppercase tracking-wider">
                Built for You
              </p>
              <h2 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Who Needs TaxCafe?
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-text-light-body">
                If you earn an income in Nigeria, you need a smart way to manage
                your tax obligations. We&apos;re perfect for:
              </p>
            </div>
            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="text-center p-8 border border-border-light rounded-xl bg-background-light shadow-sm">
                <div className="flex-shrink-0 size-12 flex items-center justify-center rounded-lg bg-primary/10 text-primary mx-auto">
                  <span className="material-symbols-outlined">brush</span>
                </div>
                <h3 className="mt-5 text-xl font-bold">
                  Freelancers & Creatives
                </h3>
                <p className="mt-2 text-text-light-body">
                  Manage multiple income streams, track project expenses, and
                  never overpay on your taxes again.
                </p>
              </div>
              <div className="text-center p-8 border border-border-light rounded-xl bg-background-light shadow-sm">
                <div className="flex-shrink-0 size-12 flex items-center justify-center rounded-lg bg-primary/10 text-primary mx-auto">
                  <span className="material-symbols-outlined">storefront</span>
                </div>
                <h3 className="mt-5 text-xl font-bold">
                  Small Business Owners
                </h3>
                <p className="mt-2 text-text-light-body">
                  Get a clear view of your business&apos;s tax health, ensure
                  compliance, and unlock savings to reinvest in your growth.
                </p>
              </div>
              <div className="text-center p-8 border border-border-light rounded-xl bg-background-light shadow-sm">
                <div className="flex-shrink-0 size-12 flex items-center justify-center rounded-lg bg-primary/10 text-primary mx-auto">
                  <span className="material-symbols-outlined">computer</span>
                </div>
                <h3 className="mt-5 text-xl font-bold">
                  Salaried Professionals
                </h3>
                <p className="mt-2 text-text-light-body">
                  Even with PAYE, you might have side-hustles or expenses you
                  can claim. Optimize your total tax position effortlessly.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 sm:py-32" id="features">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-primary font-semibold uppercase tracking-wider">
                Everything you need
              </p>
              <h2 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
                All-in-One Tax Confidence
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-text-light-body">
                Our powerful features are designed to give you complete control
                and peace of mind over your finances and tax obligations.
              </p>
            </div>
            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col gap-4 p-6 border border-border-light rounded-xl bg-white">
                <div className="flex-shrink-0 size-10 flex items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <span className="material-symbols-outlined">
                    rocket_launch
                  </span>
                </div>
                <h3 className="text-xl font-bold">Smart Onboarding Flow</h3>
                <p className="text-text-light-body">
                  Get set up in minutes. Our intuitive onboarding guides you
                  through every step, making it easy to start your journey to
                  tax confidence.
                </p>
              </div>
              <div className="flex flex-col gap-4 p-6 border border-border-light rounded-xl bg-white">
                <div className="flex-shrink-0 size-10 flex items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <span className="material-symbols-outlined">
                    account_balance
                  </span>
                </div>
                <h3 className="text-xl font-bold">Account Connection Hub</h3>
                <p className="text-text-light-body">
                  Securely link all your bank accounts in one place. We
                  automatically import and categorize your transactions for a
                  complete financial overview.
                </p>
              </div>
              <div className="flex flex-col gap-4 p-6 border border-border-light rounded-xl bg-white">
                <div className="flex-shrink-0 size-10 flex items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <span className="material-symbols-outlined">trending_up</span>
                </div>
                <h3 className="text-xl font-bold">Income Tracker</h3>
                <p className="text-text-light-body">
                  Never miss a naira. Monitor all your income streams in
                  real-time, from salaries to side hustles, ensuring everything
                  is accounted for.
                </p>
              </div>
              <div className="flex flex-col gap-4 p-6 border border-border-light rounded-xl bg-white">
                <div className="flex-shrink-0 size-10 flex items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <span className="material-symbols-outlined">search</span>
                </div>
                <h3 className="text-xl font-bold">The Deduction Hunter</h3>
                <p className="text-text-light-body">
                  Our smart system actively scans your expenses to find every
                  possible tax deduction, maximizing your savings legally.
                </p>
              </div>
              <div className="flex flex-col gap-4 p-6 border border-border-light rounded-xl bg-white">
                <div className="flex-shrink-0 size-10 flex items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <span className="material-symbols-outlined">
                    calendar_month
                  </span>
                </div>
                <h3 className="text-xl font-bold">Weekly Tax Review</h3>
                <p className="text-text-light-body">
                  Stay ahead with automated weekly summaries of your tax
                  position. No more year-end surprises, just continuous clarity.
                </p>
              </div>
              <div className="flex flex-col gap-4 p-6 border border-border-light rounded-xl bg-white">
                <div className="flex-shrink-0 size-10 flex items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <span className="material-symbols-outlined">dashboard</span>
                </div>
                <h3 className="text-xl font-bold">Tax Confidence Dashboard</h3>
                <p className="text-text-light-body">
                  Your command center for tax health. See your estimated
                  liability, savings, and compliance status at a single glance.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 sm:py-32 bg-white" id="pricing">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-primary font-semibold uppercase tracking-wider">
                Simple, Transparent Pricing
              </p>
              <h2 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Choose Your Plan
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg text-text-light-body">
                Get started for free or unlock powerful features with our
                premium plans. No hidden fees, ever.
              </p>
            </div>
            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="flex flex-col p-8 bg-background-light rounded-xl border border-border-light shadow-lg">
                <h3 className="text-lg font-semibold text-gray-900">Starter</h3>
                <p className="mt-4 text-sm text-text-light-body">
                  Perfect for individuals getting started with managing their
                  taxes.
                </p>
                <p className="mt-6">
                  <span className="text-4xl font-extrabold text-gray-900">
                    Free
                  </span>
                </p>
                <ul className="mt-6 space-y-4 flex-grow">
                  <li className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary text-base">
                      check_circle
                    </span>
                    <span className="text-sm text-text-light-body">
                      Income Tracker
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary text-base">
                      check_circle
                    </span>
                    <span className="text-sm text-text-light-body">
                      Basic Expense Categorization
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary text-base">
                      check_circle
                    </span>
                    <span className="text-sm text-text-light-body">
                      Connect 1 Bank Account
                    </span>
                  </li>
                </ul>
                <a
                  className="mt-8 block w-full py-3 px-6 text-center rounded-lg text-sm font-semibold text-primary bg-primary/10 hover:bg-primary/20 transition-colors"
                  href="#"
                >
                  Get Started for Free
                </a>
              </div>
              <div className="relative flex flex-col p-8 bg-background-light rounded-xl border-2 border-primary shadow-2xl">
                <p className="absolute top-0 -translate-y-1/2 bg-primary text-white px-3 py-1 text-sm font-semibold tracking-wide rounded-full">
                  Most Popular
                </p>
                <h3 className="text-lg font-semibold text-gray-900">
                  Professional
                </h3>
                <p className="mt-4 text-sm text-text-light-body">
                  For freelancers and professionals who need automated tax
                  optimization.
                </p>
                <p className="mt-6">
                  <span className="text-4xl font-extrabold text-gray-900">
                    ₦5,000
                  </span>
                  <span className="text-base font-medium text-text-light-body">
                    /month
                  </span>
                </p>
                <ul className="mt-6 space-y-4 flex-grow">
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary text-base mt-1">
                      check_circle
                    </span>
                    <span className="text-sm text-text-light-body">
                      Everything in Starter, plus:
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary text-base">
                      check_circle
                    </span>
                    <span className="text-sm text-text-light-body">
                      The Deduction Hunter
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary text-base">
                      check_circle
                    </span>
                    <span className="text-sm text-text-light-body">
                      Weekly Tax Review
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary text-base">
                      check_circle
                    </span>
                    <span className="text-sm text-text-light-body">
                      Connect up to 5 Bank Accounts
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary text-base">
                      check_circle
                    </span>
                    <span className="text-sm text-text-light-body">
                      Tax Confidence Dashboard
                    </span>
                  </li>
                </ul>
                <a
                  className="mt-8 block w-full py-3 px-6 text-center rounded-lg text-sm font-bold text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary shadow-lg transition-transform"
                  href="#"
                >
                  Choose Professional
                </a>
              </div>
              <div className="flex flex-col p-8 bg-background-light rounded-xl border border-border-light shadow-lg">
                <h3 className="text-lg font-semibold text-gray-900">
                  Business
                </h3>
                <p className="mt-4 text-sm text-text-light-body">
                  For small businesses requiring advanced features and priority
                  support.
                </p>
                <p className="mt-6">
                  <span className="text-4xl font-extrabold text-gray-900">
                    ₦15,000
                  </span>
                  <span className="text-base font-medium text-text-light-body">
                    /month
                  </span>
                </p>
                <ul className="mt-6 space-y-4 flex-grow">
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary text-base mt-1">
                      check_circle
                    </span>
                    <span className="text-sm text-text-light-body">
                      Everything in Professional, plus:
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary text-base">
                      check_circle
                    </span>
                    <span className="text-sm text-text-light-body">
                      Unlimited Bank Accounts
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary text-base">
                      check_circle
                    </span>
                    <span className="text-sm text-text-light-body">
                      Audit Protection Guarantee
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary text-base">
                      check_circle
                    </span>
                    <span className="text-sm text-text-light-body">
                      Priority Support
                    </span>
                  </li>
                </ul>
                <a
                  className="mt-8 block w-full py-3 px-6 text-center rounded-lg text-sm font-semibold text-primary bg-primary/10 hover:bg-primary/20 transition-colors"
                  href="#"
                >
                  Choose Business
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 sm:py-32" id="testimonials">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-primary font-semibold uppercase tracking-wider">
                Social Proof
              </p>
              <h2 className="mt-2 text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Trusted by Nigerians Like You
              </h2>
            </div>
            <div className="mt-16 grid gap-8 lg:grid-cols-2">
              <div className="p-8 bg-white rounded-xl shadow-lg border border-border-light">
                <div className="flex items-center gap-4">
                  <img
                    alt="Adebayo Cole's avatar"
                    className="h-14 w-14 rounded-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBs2EBSdb94M1l8f7hdTbvnUCB_M8E_S3zSeoobZ6jYvqKv7MxOQX4KLcKXSAJ0-o92YBt9SS6YbRRysgaK1mUM6QixTssn3aLz4NWxl-F0Wr6WmZBIMouMc-5vT6vvAtsRTcTLLggvGUKtBhuYXh9GBpHpBsWzoMYQwP73vghg2Cv8clig1OjrhOx6X4_jOIyfNihPFxprMNluzbyJjHCOOTXIVZT0Bvq2nxhes4P7MWIMLQR-ZjU9E5xfrGPB51CGMRAxg7iOpwR5"
                  />
                  <div>
                    <p className="font-bold text-gray-900">Adebayo Cole</p>
                    <p className="text-sm text-text-light-body">
                      Digital Marketer, Lagos
                    </p>
                  </div>
                </div>
                <blockquote className="mt-6 text-lg text-text-light-body leading-relaxed">
                  &ldquo;TaxCafe has been a game-changer for my freelance
                  business. I used to dread tax season, but now I feel
                  completely in control. The Deduction Hunter found savings I
                  never would have caught on my own. It&apos;s a must-have tool
                  for any professional in Nigeria.&rdquo;
                </blockquote>
              </div>
              <div className="p-8 bg-white rounded-xl shadow-lg border border-border-light">
                <div className="flex items-center gap-4">
                  <img
                    alt="Chidinma Okoro's avatar"
                    className="h-14 w-14 rounded-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCC_A7ydW0A4xhhE8mqhQIuE7NjECJIQdOeVEXngPhbJkw9UD3A40v0E-qcb9dn4ueCDSLIiZAJs-v6mO3A41rsG44dAw7IWqHkA-OVYttewKymgBkz3UdOHDvdwVg5MsNFuf4TIMRWOGjyFCt6VnXYqX1KedkAMTHIrevha7FJNknlJ0F989R2y1KfkK9_Yny_tV-fbj63k-jPsc57emb5_Wi-bQG289Lv1CNRmPOtaeZOjEyDh_j16GLaZ8nKnRxUUtE3jTF8TztY"
                  />
                  <div>
                    <p className="font-bold text-gray-900">Chidinma Okoro</p>
                    <p className="text-sm text-text-light-body">
                      E-commerce Store Owner, Abuja
                    </p>
                  </div>
                </div>
                <blockquote className="mt-6 text-lg text-text-light-body leading-relaxed">
                  &ldquo;As a small business owner, time is my most valuable
                  asset. TaxCafe saves me hours every month. The dashboard gives
                  me a clear snapshot of my finances and tax obligations. I
                  can&apos;t imagine running my business without it.&rdquo;
                </blockquote>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-primary text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24 text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Ready to Experience Financial Confidence?
            </h2>
            <p className="mt-4 text-lg text-white">
              Stop letting tax worries hold you back. Join thousands of Nigerian
              professionals and business owners who have automated their
              compliance and unlocked peace of mind.
            </p>
            <div className="mt-8">
              <a
                className="inline-flex items-center justify-center px-8 py-4 border border-transparent rounded-lg shadow-sm text-base font-bold bg-white text-primary hover:bg-gray-100"
                href="#"
              >
                Get Started With TaxCafe for Free
                <span className="material-symbols-outlined ml-2 text-xl">
                  arrow_forward
                </span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer
        className="bg-background-light border-t border-border-light"
        id="footer"
      >
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
            <div className="col-span-2 lg:col-span-1">
              <div className="flex items-center gap-3">
                <div className="text-primary size-9">
                  <svg
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M11 19V9H7V19H11ZM12 19V9H17V11H13V13H16V15H13V19H12Z M4 21V5Q4 4.175 4.588 3.587Q5.175 3 6 3H18Q18.825 3 19.413 3.587Q20 4.175 20 5V16H18V5H6V21H4Z"></path>
                  </svg>
                </div>
                <h2 className="text-gray-900 text-xl font-bold">TaxCafe</h2>
              </div>
              <p className="mt-4 text-sm text-text-light-body">
                Automated tax confidence for Nigeria&apos;s professionals and
                businesses.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
                Product
              </h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <a
                    className="text-sm text-text-light-body hover:text-primary transition-colors"
                    href="#features"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    className="text-sm text-text-light-body hover:text-primary transition-colors"
                    href="#pricing"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    className="text-sm text-text-light-body hover:text-primary transition-colors"
                    href="#"
                  >
                    Security
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
                Company
              </h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <a
                    className="text-sm text-text-light-body hover:text-primary transition-colors"
                    href="#"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    className="text-sm text-text-light-body hover:text-primary transition-colors"
                    href="#"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    className="text-sm text-text-light-body hover:text-primary transition-colors"
                    href="#"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900 tracking-wider uppercase">
                Resources
              </h3>
              <ul className="mt-4 space-y-2">
                <li>
                  <a
                    className="text-sm text-text-light-body hover:text-primary transition-colors"
                    href="#"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    className="text-sm text-text-light-body hover:text-primary transition-colors"
                    href="#"
                  >
                    Help Center
                  </a>
                </li>
                <li>
                  <a
                    className="text-sm text-text-light-body hover:text-primary transition-colors"
                    href="#"
                  >
                    FIRS Guidelines
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border-light flex flex-col sm:flex-row-reverse justify-between items-center gap-4">
            <div className="flex gap-4">
              <a
                className="text-text-light-body hover:text-primary transition-colors"
                href="#"
              >
                <svg
                  aria-hidden="true"
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                </svg>
              </a>
              <a
                className="text-text-light-body hover:text-primary transition-colors"
                href="#"
              >
                <svg
                  aria-hidden="true"
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 2.03998C16.97 2.03998 21.94 7.00998 21.94 12C21.94 16.97 16.97 21.94 12 21.94C7.03 21.94 2.06 16.97 2.06 12C2.06 7.00998 7.03 2.03998 12 2.03998ZM12 0.539978C6.22 0.539978 1.5 5.25998 1.5 11C1.5 16.74 6.22 21.46 12 21.46C17.78 21.46 22.5 16.74 22.5 11C22.5 5.25998 17.78 0.539978 12 0.539978ZM16.03 16.03C15.75 16.31 15.3 16.31 15.02 16.03L11.5 12.51V6.53998C11.5 6.12998 11.17 5.79998 10.76 5.79998C10.35 5.79998 10.02 6.12998 10.02 6.53998V12.99C10.02 13.2 10.1 13.4 10.25 13.55L14.03 17.33C14.31 17.61 14.76 17.61 15.04 17.33L16.04 16.33C16.31 16.05 16.31 15.6 16.03 15.32V16.03Z"
                    fill="none"
                  ></path>
                  <path d="M16.49 9.22H14.77V7.51C14.77 6.96 14.32 6.51 13.77 6.51C13.22 6.51 12.77 6.96 12.77 7.51V9.22H11.05C10.5 9.22 10.05 9.67 10.05 10.22C10.05 10.77 10.5 11.22 11.05 11.22H12.77V12.93C12.77 13.48 13.22 13.93 13.77 13.93C14.32 13.93 14.77 13.48 14.77 12.93V11.22H16.49C17.04 11.22 17.49 10.77 17.49 10.22C17.49 9.67 17.04 9.22 16.49 9.22Z"></path>
                </svg>
              </a>
              <a
                className="text-text-light-body hover:text-primary transition-colors"
                href="#"
              >
                <svg
                  aria-hidden="true"
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"></path>
                </svg>
              </a>
            </div>
            <div className="text-sm text-text-light-body">
              © 2025 TaxCafe. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
