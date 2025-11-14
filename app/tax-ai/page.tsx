"use client";

import { TaxAI } from "@/app/components/TaxAI";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function TaxAIPage() {
  return (
    <div className="min-h-screen bg-background-light">
      {/* Header */}
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
            <div className="flex items-center gap-4">
              <nav className="hidden md:flex items-center gap-6">
                <Link
                  href="/"
                  className="text-sm font-medium text-gray-600 hover:text-primary transition-colors"
                >
                  Home
                </Link>
                <Link
                  href="/tax-ai"
                  className="text-sm font-semibold text-primary"
                >
                  Tax AI
                </Link>
                <Link
                  href="/tax-calculator"
                  className="text-sm font-medium text-gray-600 hover:text-primary transition-colors"
                >
                  Calculator
                </Link>
              </nav>
              <Link href="/">
                <Button variant="outline" size="sm">
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900">
            Tax AI Assistant
          </h1>
          <p className="mt-2 text-lg text-text-light-body">
            Get instant answers about Nigerian tax laws, deductions, and
            compliance
          </p>
        </div>

        <TaxAI />
      </main>
    </div>
  );
}
