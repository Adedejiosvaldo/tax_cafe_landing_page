"use client";

import { TaxCalculationResult } from "@/app/types/tax";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface TaxCalculatorResultsProps {
  results: TaxCalculationResult | null;
  loading: boolean;
  error: string | null;
}

export function TaxCalculatorResults({
  results,
  loading,
  error,
}: TaxCalculatorResultsProps) {
  if (loading) {
    return (
      <Card className="mt-8">
        <CardContent className="pt-6">
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
              <p className="mt-4 text-text-light-body">Calculating your tax...</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="mt-8 border-red-200 bg-red-50">
        <CardContent className="pt-6">
          <div className="text-center text-red-600">
            <p className="font-semibold">Error</p>
            <p className="mt-2 text-sm">{error}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!results) {
    return null;
  }

  const formatCurrency = (amount: number) => {
    return `₦${Math.round(amount).toLocaleString("en-NG")}`;
  };

  return (
    <div className="mt-8 space-y-6">
      {/* Main Results Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Tax Calculation Results</CardTitle>
          <CardDescription>
            Your tax estimate based on Nigeria Tax Act 2025
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Summary Grid */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-border-light bg-background-light p-4">
              <p className="text-sm text-text-light-body">Total Income</p>
              <p className="mt-1 text-2xl font-bold text-gray-900">
                {formatCurrency(results.totalIncome)}
              </p>
            </div>
            <div className="rounded-lg border border-border-light bg-background-light p-4">
              <p className="text-sm text-text-light-body">Total Deductions</p>
              <p className="mt-1 text-2xl font-bold text-primary">
                {formatCurrency(results.totalDeductions)}
              </p>
            </div>
            <div className="rounded-lg border border-border-light bg-background-light p-4">
              <p className="text-sm text-text-light-body">Taxable Income</p>
              <p className="mt-1 text-2xl font-bold text-gray-900">
                {formatCurrency(results.taxableIncome)}
              </p>
            </div>
            <div className="rounded-lg border border-primary bg-primary/5 p-4">
              <p className="text-sm text-text-light-body">Tax Payable</p>
              <p className="mt-1 text-2xl font-bold text-primary">
                {formatCurrency(results.taxPayable)}
              </p>
            </div>
          </div>

          <Separator />

          {/* Effective Tax Rate */}
          <div className="text-center">
            <p className="text-sm text-text-light-body">Effective Tax Rate</p>
            <p className="mt-1 text-3xl font-bold text-primary">
              {results.effectiveTaxRate.toFixed(2)}%
            </p>
          </div>

          <Separator />

          {/* Savings Message */}
          {results.savingsFromDeductions > 0 && (
            <div className="rounded-lg bg-green-50 border border-green-200 p-4">
              <p className="font-semibold text-green-800">
                💰 Savings from Deductions
              </p>
              <p className="mt-1 text-lg text-green-700">
                Your eligible deductions saved you{" "}
                <span className="font-bold">
                  {formatCurrency(results.savingsFromDeductions)}
                </span>{" "}
                this year.
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Deduction Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Deduction Breakdown</CardTitle>
          <CardDescription>Details of all eligible deductions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {results.deductionDetails.pension > 0 && (
              <div className="flex justify-between">
                <span className="text-text-light-body">Pension Contribution</span>
                <span className="font-medium">
                  {formatCurrency(results.deductionDetails.pension)}
                </span>
              </div>
            )}
            {results.deductionDetails.nhf > 0 && (
              <div className="flex justify-between">
                <span className="text-text-light-body">NHF Contribution</span>
                <span className="font-medium">
                  {formatCurrency(results.deductionDetails.nhf)}
                </span>
              </div>
            )}
            {results.deductionDetails.nhis > 0 && (
              <div className="flex justify-between">
                <span className="text-text-light-body">NHIS Contribution</span>
                <span className="font-medium">
                  {formatCurrency(results.deductionDetails.nhis)}
                </span>
              </div>
            )}
            {results.deductionDetails.lifeInsurance > 0 && (
              <div className="flex justify-between">
                <span className="text-text-light-body">Life Insurance</span>
                <span className="font-medium">
                  {formatCurrency(results.deductionDetails.lifeInsurance)}
                </span>
              </div>
            )}
            {results.deductionDetails.rentRelief > 0 && (
              <div className="flex justify-between">
                <span className="text-text-light-body">Rent Relief</span>
                <span className="font-medium">
                  {formatCurrency(results.deductionDetails.rentRelief)}
                </span>
              </div>
            )}
            {results.deductionDetails.loanInterest > 0 && (
              <div className="flex justify-between">
                <span className="text-text-light-body">Loan Interest</span>
                <span className="font-medium">
                  {formatCurrency(results.deductionDetails.loanInterest)}
                </span>
              </div>
            )}
            {results.deductionDetails.donations > 0 && (
              <div className="flex justify-between">
                <span className="text-text-light-body">Donations</span>
                <span className="font-medium">
                  {formatCurrency(results.deductionDetails.donations)}
                </span>
              </div>
            )}
            {results.deductionDetails.dependentRelief > 0 && (
              <div className="flex justify-between">
                <span className="text-text-light-body">Dependent Relief</span>
                <span className="font-medium">
                  {formatCurrency(results.deductionDetails.dependentRelief)}
                </span>
              </div>
            )}
            <Separator />
            <div className="flex justify-between font-semibold">
              <span>Consolidated Relief</span>
              <span>{formatCurrency(results.deductionDetails.consolidatedRelief)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tax Band Breakdown */}
      {results.bandBreakdown.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Tax Band Breakdown</CardTitle>
            <CardDescription>
              Progressive tax calculation by income band
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {results.bandBreakdown.map((band, index) => (
                <div key={index} className="rounded-lg border border-border-light p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="font-medium text-gray-900">{band.range}</p>
                      <p className="text-sm text-text-light-body">
                        {formatCurrency(band.amount)} @ {band.rate}%
                      </p>
                    </div>
                    <p className="font-bold text-primary">
                      {formatCurrency(band.tax)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
