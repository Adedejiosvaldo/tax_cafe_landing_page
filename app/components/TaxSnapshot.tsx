"use client";

import { TaxInput, TaxCalculationResult } from "@/app/types/tax";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";

interface TaxSnapshotProps {
  formData: TaxInput;
}

export function TaxSnapshot({ formData }: TaxSnapshotProps) {
  const [snapshot, setSnapshot] = useState<TaxCalculationResult | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Debounce calculation
    const timer = setTimeout(async () => {
      // Only calculate if there's meaningful data
      const hasIncome =
        formData.employmentIncome > 0 ||
        formData.freelanceIncome > 0 ||
        formData.digitalIncome > 0 ||
        formData.rentalIncome > 0 ||
        formData.investmentIncome > 0 ||
        formData.capitalGains > 0;

      if (!hasIncome) {
        setSnapshot(null);
        return;
      }

      setLoading(true);
      try {
        const response = await fetch("/api/calculate-tax", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          const result = await response.json();
          setSnapshot(result);
        }
      } catch (error) {
        console.error("Error calculating snapshot:", error);
      } finally {
        setLoading(false);
      }
    }, 500); // 500ms debounce

    return () => clearTimeout(timer);
  }, [formData]);

  const formatCurrency = (amount: number) => {
    return `₦${Math.round(amount).toLocaleString("en-NG")}`;
  };

  const getEmploymentTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      employee: "Employee",
      "self-employed": "Self-Employed",
      freelancer: "Freelancer",
      both: "Employee + Self-Employed",
    };
    return labels[type] || type;
  };

  const getRiskLevel = (result: TaxCalculationResult | null) => {
    if (!result) return "Low Risk";
    const rate = result.effectiveTaxRate;
    if (rate < 10) return "Low Risk";
    if (rate < 18) return "Medium Risk";
    return "High Risk";
  };

  if (!snapshot && !loading) {
    return (
      <Card className="sticky top-24 h-fit">
        <CardContent className="pt-6">
          <div className="text-center py-12">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Your Tax Snapshot
            </h3>
            <p className="text-sm text-text-light-body">
              Start filling the form to see your real-time tax estimate
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="sticky top-24 h-fit border-primary/20 shadow-lg">
      <CardContent className="pt-6">
        <div className="space-y-6">
          {/* Header */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">
              Your Tax Snapshot
            </h3>
            {loading && (
              <p className="text-xs text-text-light-body animate-pulse">
                Calculating...
              </p>
            )}
          </div>

          {/* Estimated Tax Due */}
          {snapshot && (
            <>
              <div className="rounded-lg bg-background-light border border-border-light p-4">
                <p className="text-sm text-text-light-body mb-2">
                  Estimated Tax Due
                </p>
                <p className="text-4xl font-bold text-primary">
                  {formatCurrency(snapshot.taxPayable)}
                </p>
                <p className="text-xs text-text-light-body mt-1">
                  Effective Rate: {snapshot.effectiveTaxRate.toFixed(2)}%
                </p>
              </div>

              {/* Profile Tags */}
              <div>
                <p className="text-sm text-text-light-body mb-2">Your Profile</p>
                <div className="flex flex-wrap gap-2">
                  <Badge
                    variant="secondary"
                    className="bg-primary/10 text-primary border-primary/20"
                  >
                    {getEmploymentTypeLabel(formData.employmentType)}
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="bg-gray-100 text-gray-700 border-gray-200"
                  >
                    {getRiskLevel(snapshot)}
                  </Badge>
                  {formData.resident && (
                    <Badge
                      variant="secondary"
                      className="bg-green-50 text-green-700 border-green-200"
                    >
                      Resident
                    </Badge>
                  )}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="space-y-3 pt-2 border-t border-border-light">
                <div className="flex justify-between text-sm">
                  <span className="text-text-light-body">Total Income</span>
                  <span className="font-semibold text-gray-900">
                    {formatCurrency(snapshot.totalIncome)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-light-body">Deductions</span>
                  <span className="font-semibold text-primary">
                    {formatCurrency(snapshot.totalDeductions)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-light-body">Taxable Income</span>
                  <span className="font-semibold text-gray-900">
                    {formatCurrency(snapshot.taxableIncome)}
                  </span>
                </div>
              </div>

              {/* Savings Highlight */}
              {snapshot.savingsFromDeductions > 0 && (
                <div className="rounded-lg bg-green-50 border border-green-200 p-3">
                  <p className="text-xs font-semibold text-green-800 mb-1">
                    💰 Savings from Deductions
                  </p>
                  <p className="text-lg font-bold text-green-700">
                    {formatCurrency(snapshot.savingsFromDeductions)}
                  </p>
                </div>
              )}

              {/* Info Message */}
              <div className="rounded-lg bg-blue-50 border border-blue-200 p-3">
                <p className="text-xs text-blue-800">
                  Based on your current inputs, this is a preliminary estimate
                  and may change as you add more details.
                </p>
              </div>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
