"use client";

import { TaxCalculationResult } from "@/app/types/tax";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

interface TaxCalculatorResultsProps {
  results: TaxCalculationResult | null;
  loading: boolean;
  error: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TaxCalculatorResults({
  results,
  loading,
  error,
  open,
  onOpenChange,
}: TaxCalculatorResultsProps) {
  const formatCurrency = (amount: number) => {
    return `₦${Math.round(amount).toLocaleString("en-NG")}`;
  };

  if (loading) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
              <p className="mt-4 text-text-light-body">Calculating your tax...</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (error) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-red-600">Error</DialogTitle>
            <DialogDescription>{error}</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  }

  if (!results) {
    return null;
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">Tax Calculation Results</DialogTitle>
          <DialogDescription>
            Your tax estimate based on Nigeria Tax Act 2025
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Summary Section */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-text-light-body mb-1">Total Income</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(results.totalIncome)}
              </p>
            </div>
            <div>
              <p className="text-sm text-text-light-body mb-1">Total Deductions</p>
              <p className="text-2xl font-bold text-primary">
                {formatCurrency(results.totalDeductions)}
              </p>
            </div>
            <div>
              <p className="text-sm text-text-light-body mb-1">Taxable Income</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(results.taxableIncome)}
              </p>
            </div>
            <div>
              <p className="text-sm text-text-light-body mb-1">Tax Payable</p>
              <p className="text-2xl font-bold text-primary">
                {formatCurrency(results.taxPayable)}
              </p>
            </div>
          </div>

          <Separator />

          {/* Effective Tax Rate */}
          <div>
            <p className="text-sm text-text-light-body mb-1">Effective Tax Rate</p>
            <p className="text-3xl font-bold text-primary">
              {results.effectiveTaxRate.toFixed(2)}%
            </p>
          </div>

          <Separator />

          {/* Savings Message */}
          {results.savingsFromDeductions > 0 && (
            <div className="rounded-lg bg-green-50 border border-green-200 p-4">
              <p className="font-semibold text-green-800 mb-1">
                💰 Savings from Deductions
              </p>
              <p className="text-green-700">
                Your eligible deductions saved you{" "}
                <span className="font-bold">
                  {formatCurrency(results.savingsFromDeductions)}
                </span>{" "}
                this year.
              </p>
            </div>
          )}

          <Separator />

          {/* Detailed Deduction Breakdown */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Detailed Deduction Breakdown</h3>
            <p className="text-sm text-text-light-body mb-4">
              Complete breakdown of all eligible deductions with calculations
            </p>
            <div className="space-y-4">
              {results.detailedDeductions && results.detailedDeductions.length > 0 ? (
                results.detailedDeductions.map((deduction, index) => (
                  <div
                    key={index}
                    className="rounded-lg border border-border-light bg-background-light p-4 space-y-2"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">
                          {deduction.name}
                        </h4>
                        <p className="text-sm text-text-light-body mb-2">
                          {deduction.description}
                        </p>
                        {deduction.calculation && (
                          <div className="bg-white rounded border border-border-light p-2 mt-2">
                            <p className="text-xs font-medium text-gray-700 mb-1">
                              Calculation:
                            </p>
                            <p className="text-sm text-gray-900 font-mono">
                              {deduction.calculation}
                            </p>
                          </div>
                        )}
                        {deduction.originalAmount !== undefined &&
                          deduction.originalAmount !== deduction.amount && (
                            <p className="text-xs text-text-light-body mt-2">
                              Original amount: {formatCurrency(deduction.originalAmount)} →
                              Limited to: {formatCurrency(deduction.amount)}
                            </p>
                          )}
                      </div>
                      <div className="text-right ml-4">
                        <p className="text-lg font-bold text-primary">
                          {formatCurrency(deduction.amount)}
                        </p>
                        {deduction.limit && deduction.limit !== deduction.amount && (
                          <p className="text-xs text-text-light-body mt-1">
                            Limit: {formatCurrency(deduction.limit)}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-text-light-body text-center py-4">
                  No deductions available
                </p>
              )}

              {/* Total Deductions Summary */}
              <div className="rounded-lg border-2 border-primary bg-primary/5 p-4 mt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">
                    Total Deductions
                  </span>
                  <span className="text-2xl font-bold text-primary">
                    {formatCurrency(results.totalDeductions)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Tax Band Breakdown */}
          {results.bandBreakdown.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold mb-3">Tax Band Breakdown</h3>
              <p className="text-sm text-text-light-body mb-4">
                Progressive tax calculation by income band
              </p>
              <div className="space-y-3">
                {results.bandBreakdown.map((band, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-border-light last:border-0">
                    <div>
                      <p className="font-medium text-gray-900">{band.range}</p>
                      <p className="text-sm text-text-light-body">
                        {formatCurrency(band.amount)} @ {band.rate}%
                      </p>
                    </div>
                    <p className="font-bold text-primary text-lg">
                      {formatCurrency(band.tax)}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-end">
          <Button onClick={() => onOpenChange(false)}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
