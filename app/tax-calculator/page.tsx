"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { TaxInput, TaxCalculationResult } from "@/app/types/tax";
import { TaxCalculatorResults } from "@/app/components/TaxCalculatorResults";
import { TaxSnapshot } from "@/app/components/TaxSnapshot";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import Image from "next/image";

const taxFormSchema = z.object({
  employmentType: z.enum(["employee", "self-employed", "freelancer", "both"]),
  resident: z.boolean(),
  employmentIncome: z.number().min(0, "Income cannot be negative"),
  freelanceIncome: z.number().min(0, "Income cannot be negative"),
  digitalIncome: z.number().min(0, "Income cannot be negative"),
  rentalIncome: z.number().min(0, "Income cannot be negative"),
  investmentIncome: z.number().min(0, "Income cannot be negative"),
  capitalGains: z.number().min(0, "Income cannot be negative"),
  businessExpenses: z.number().min(0, "Expenses cannot be negative"),
  lossesDigital: z.number().min(0, "Losses cannot be negative"),
  pensionContrib: z.number().min(0, "Contribution cannot be negative"),
  nhfContrib: z.number().min(0, "Contribution cannot be negative"),
  nhisContrib: z.number().min(0, "Contribution cannot be negative"),
  lifeInsurance: z.number().min(0, "Premium cannot be negative"),
  rentPaid: z.number().min(0, "Rent cannot be negative"),
  loanInterest: z.number().min(0, "Interest cannot be negative"),
  donations: z.number().min(0, "Donations cannot be negative"),
  dependents: z.number().int().min(0).max(10, "Maximum 10 dependents"),
});

type TaxFormValues = z.infer<typeof taxFormSchema>;

export default function TaxCalculatorPage() {
  const [results, setResults] = useState<TaxCalculationResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<TaxFormValues>({
    resolver: zodResolver(taxFormSchema),
    defaultValues: {
      employmentType: "employee",
      resident: true,
      employmentIncome: 0,
      freelanceIncome: 0,
      digitalIncome: 0,
      rentalIncome: 0,
      investmentIncome: 0,
      capitalGains: 0,
      businessExpenses: 0,
      lossesDigital: 0,
      pensionContrib: 0,
      nhfContrib: 0,
      nhisContrib: 0,
      lifeInsurance: 0,
      rentPaid: 0,
      loanInterest: 0,
      donations: 0,
      dependents: 0,
    },
  });

  const onSubmit = async (data: TaxFormValues) => {
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      // Convert form data to TaxInput format
      const taxInput: TaxInput = {
        employmentType: data.employmentType,
        resident: data.resident,
        employmentIncome: data.employmentIncome,
        freelanceIncome: data.freelanceIncome,
        digitalIncome: data.digitalIncome,
        rentalIncome: data.rentalIncome,
        investmentIncome: data.investmentIncome,
        capitalGains: data.capitalGains,
        businessExpenses: data.businessExpenses,
        lossesDigital: data.lossesDigital,
        pensionContrib: data.pensionContrib,
        nhfContrib: data.nhfContrib,
        nhisContrib: data.nhisContrib,
        lifeInsurance: data.lifeInsurance,
        rentPaid: data.rentPaid,
        loanInterest: data.loanInterest,
        donations: data.donations,
        dependents: data.dependents,
      };

      const response = await fetch("/api/calculate-tax", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taxInput),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to calculate tax");
      }

      const result = await response.json();
      setResults(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const employmentType = form.watch("employmentType");
  const formValues = form.watch();

  // Convert form values to TaxInput for real-time snapshot
  const snapshotData: TaxInput = {
    employmentType: formValues.employmentType,
    resident: formValues.resident,
    employmentIncome: formValues.employmentIncome || 0,
    freelanceIncome: formValues.freelanceIncome || 0,
    digitalIncome: formValues.digitalIncome || 0,
    rentalIncome: formValues.rentalIncome || 0,
    investmentIncome: formValues.investmentIncome || 0,
    capitalGains: formValues.capitalGains || 0,
    businessExpenses: formValues.businessExpenses || 0,
    lossesDigital: formValues.lossesDigital || 0,
    pensionContrib: formValues.pensionContrib || 0,
    nhfContrib: formValues.nhfContrib || 0,
    nhisContrib: formValues.nhisContrib || 0,
    lifeInsurance: formValues.lifeInsurance || 0,
    rentPaid: formValues.rentPaid || 0,
    loanInterest: formValues.loanInterest || 0,
    donations: formValues.donations || 0,
    dependents: formValues.dependents || 0,
  };

  return (
    <div className="min-h-screen bg-background-light">
      {/* Enhanced Header */}
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
                <p className="text-xs text-text-light-body">Tax Calculator</p>
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
                  href="/tax-calculator"
                  className="text-sm font-semibold text-primary"
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

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900">
            Nigeria Tax Calculator
          </h1>
          <p className="mt-2 text-lg text-text-light-body">
            Calculate your tax liability based on Nigeria Tax Act 2025
          </p>
        </div>

        {/* Two Column Layout for Desktop */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Form Column - Takes 2/3 on desktop */}
          <div className="lg:col-span-2">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* Personal Info Section */}
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>
                      Tell us about your employment status and residency
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="employmentType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Employment Type</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select employment type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="employee">Employee</SelectItem>
                              <SelectItem value="self-employed">
                                Self-Employed
                              </SelectItem>
                              <SelectItem value="freelancer">
                                Freelancer
                              </SelectItem>
                              <SelectItem value="both">
                                Both (Employee + Self-Employed)
                              </SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="resident"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Nigerian Resident</FormLabel>
                            <FormDescription>
                              Check if you are a resident of Nigeria for tax
                              purposes
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                {/* Income Sources Section */}
                <Card>
                  <CardHeader>
                    <CardTitle>Income Sources</CardTitle>
                    <CardDescription>
                      Enter your annual income from all sources (₦)
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="employmentIncome"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Employment Income (Salary/Wages)
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="0"
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseFloat(e.target.value) || 0)
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {(employmentType === "self-employed" ||
                      employmentType === "freelancer" ||
                      employmentType === "both") && (
                      <FormField
                        control={form.control}
                        name="freelanceIncome"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Freelance/Business Income</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="0"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(
                                    parseFloat(e.target.value) || 0
                                  )
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}

                    <FormField
                      control={form.control}
                      name="digitalIncome"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Digital Assets Income (Crypto, NFT, etc.)
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="0"
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseFloat(e.target.value) || 0)
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="rentalIncome"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Rental Income</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="0"
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseFloat(e.target.value) || 0)
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="investmentIncome"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Investment Income (Dividends, Interest, Royalties)
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="0"
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseFloat(e.target.value) || 0)
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="capitalGains"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Capital Gains</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="0"
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseFloat(e.target.value) || 0)
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                {/* Business Expenses Section */}
                {(employmentType === "self-employed" ||
                  employmentType === "freelancer" ||
                  employmentType === "both") && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Business Expenses</CardTitle>
                      <CardDescription>
                        Deductible business expenses for
                        self-employed/freelancers
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <FormField
                        control={form.control}
                        name="businessExpenses"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Total Business Expenses</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="0"
                                {...field}
                                onChange={(e) =>
                                  field.onChange(
                                    parseFloat(e.target.value) || 0
                                  )
                                }
                              />
                            </FormControl>
                            <FormDescription>
                              Legitimate business expenses related to your
                              freelance/self-employed income
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </CardContent>
                  </Card>
                )}

                {/* Digital Asset Losses */}
                <Card>
                  <CardHeader>
                    <CardTitle>Digital Asset Losses</CardTitle>
                    <CardDescription>
                      Losses from crypto, NFT, or other digital asset trading
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <FormField
                      control={form.control}
                      name="lossesDigital"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Digital Asset Losses</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="0"
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseFloat(e.target.value) || 0)
                              }
                            />
                          </FormControl>
                          <FormDescription>
                            Losses can only be deducted from digital asset
                            profits
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                {/* Deductions Section */}
                <Card>
                  <CardHeader>
                    <CardTitle>Statutory Deductions & Reliefs</CardTitle>
                    <CardDescription>
                      Eligible deductions under Nigeria Tax Act 2025
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="pensionContrib"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Pension Contribution</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="0"
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseFloat(e.target.value) || 0)
                              }
                            />
                          </FormControl>
                          <FormDescription>
                            Maximum 8% of employment income
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="nhfContrib"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            National Housing Fund (NHF) Contribution
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="0"
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseFloat(e.target.value) || 0)
                              }
                            />
                          </FormControl>
                          <FormDescription>
                            Typically 2.5% of basic salary
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="nhisContrib"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            National Health Insurance Scheme (NHIS) Contribution
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="0"
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseFloat(e.target.value) || 0)
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="lifeInsurance"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Life Insurance or Annuity Premium
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="0"
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseFloat(e.target.value) || 0)
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="rentPaid"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Rent Paid (Primary Residence)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="0"
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseFloat(e.target.value) || 0)
                              }
                            />
                          </FormControl>
                          <FormDescription>
                            20% of rent paid or ₦500,000 maximum
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="loanInterest"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Loan Interest (Home Ownership)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="0"
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseFloat(e.target.value) || 0)
                              }
                            />
                          </FormControl>
                          <FormDescription>
                            Interest on loans for developing owner-occupied
                            residential house
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="donations"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Charitable Donations</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="0"
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseFloat(e.target.value) || 0)
                              }
                            />
                          </FormControl>
                          <FormDescription>
                            Maximum 10% of total income (must be to approved
                            NGOs)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="dependents"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Number of Dependents</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="0"
                              {...field}
                              onChange={(e) =>
                                field.onChange(parseInt(e.target.value) || 0)
                              }
                            />
                          </FormControl>
                          <FormDescription>
                            ₦2,500 per dependent (maximum 4 dependents)
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                {/* Submit Button */}
                <div className="flex gap-4">
                  <Button
                    type="submit"
                    size="lg"
                    className="flex-1 bg-primary hover:bg-primary/90"
                    disabled={loading}
                  >
                    {loading ? "Calculating..." : "Calculate Tax"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="lg"
                    onClick={() => {
                      form.reset();
                      setResults(null);
                      setError(null);
                    }}
                  >
                    Reset
                  </Button>
                </div>
              </form>
            </Form>
          </div>

          {/* Sidebar - Real-time Snapshot (Desktop only) */}
          <div className="lg:col-span-1 hidden lg:block">
            <TaxSnapshot formData={snapshotData} />
          </div>
        </div>

        {/* Full Results - Shown after explicit calculation */}
        {(results || error) && (
          <div className="mt-8">
            <TaxCalculatorResults
              results={results}
              loading={loading}
              error={error}
            />
          </div>
        )}
      </main>
    </div>
  );
}
