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

          {/* Deduction Breakdown */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Deduction Breakdown</h3>
            <p className="text-sm text-text-light-body mb-4">
              Details of all eligible deductions
            </p>
            <div className="space-y-3">
              {results.deductionDetails.lifeInsurance > 0 && (
                <div className="flex justify-between items-center py-2">
                  <span className="text-text-light-body">Life Insurance</span>
                  <span className="font-medium">
                    {formatCurrency(results.deductionDetails.lifeInsurance)}
                  </span>
                </div>
              )}
              {results.deductionDetails.rentRelief > 0 && (
                <div className="flex justify-between items-center py-2">
                  <span className="text-text-light-body">Rent Relief</span>
                  <span className="font-medium">
                    {formatCurrency(results.deductionDetails.rentRelief)}
                  </span>
                </div>
              )}
              {results.deductionDetails.pension > 0 && (
                <div className="flex justify-between items-center py-2">
                  <span className="text-text-light-body">Pension Contribution</span>
                  <span className="font-medium">
                    {formatCurrency(results.deductionDetails.pension)}
                  </span>
                </div>
              )}
              {results.deductionDetails.nhf > 0 && (
                <div className="flex justify-between items-center py-2">
                  <span className="text-text-light-body">NHF Contribution</span>
                  <span className="font-medium">
                    {formatCurrency(results.deductionDetails.nhf)}
                  </span>
                </div>
              )}
              {results.deductionDetails.nhis > 0 && (
                <div className="flex justify-between items-center py-2">
                  <span className="text-text-light-body">NHIS Contribution</span>
                  <span className="font-medium">
                    {formatCurrency(results.deductionDetails.nhis)}
                  </span>
                </div>
              )}
              {results.deductionDetails.loanInterest > 0 && (
                <div className="flex justify-between items-center py-2">
                  <span className="text-text-light-body">Loan Interest</span>
                  <span className="font-medium">
                    {formatCurrency(results.deductionDetails.loanInterest)}
                  </span>
                </div>
              )}
              {results.deductionDetails.donations > 0 && (
                <div className="flex justify-between items-center py-2">
                  <span className="text-text-light-body">Donations</span>
                  <span className="font-medium">
                    {formatCurrency(results.deductionDetails.donations)}
                  </span>
                </div>
              )}
              {results.deductionDetails.dependentRelief > 0 && (
                <div className="flex justify-between items-center py-2">
                  <span className="text-text-light-body">Dependent Relief</span>
                  <span className="font-medium">
                    {formatCurrency(results.deductionDetails.dependentRelief)}
                  </span>
                </div>
              )}
              <Separator className="my-2" />
              <div className="flex justify-between items-center py-2 font-semibold">
                <span>Consolidated Relief</span>
                <span>{formatCurrency(results.deductionDetails.consolidatedRelief)}</span>
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
