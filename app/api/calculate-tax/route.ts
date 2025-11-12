import { NextRequest, NextResponse } from "next/server";
import {
  TaxInput,
  TaxCalculationResult,
  TaxBand,
  DeductionDetail,
} from "@/app/types/tax";

export async function POST(request: NextRequest) {
  try {
    const data: TaxInput = await request.json();

    // Step 1: Calculate Gross Income (for reference, though CRA no longer uses it)
    // Note: Gross income is calculated but CRA has been phased out

    // Step 2: Apply business expense deductions (for self-employed)
    let adjustedBusinessIncome = data.freelanceIncome;
    if (
      data.employmentType === "self-employed" ||
      data.employmentType === "both" ||
      data.employmentType === "freelancer"
    ) {
      adjustedBusinessIncome = Math.max(
        0,
        data.freelanceIncome - data.businessExpenses
      );
    }

    // Step 3: Adjust for digital income losses
    const netDigitalIncome = Math.max(
      0,
      data.digitalIncome - data.lossesDigital
    );

    // Step 4: Calculate Total Income
    const totalIncome =
      data.employmentIncome +
      adjustedBusinessIncome +
      netDigitalIncome +
      data.rentalIncome +
      data.investmentIncome +
      data.capitalGains;

    // Step 5: Calculate Statutory Deductions
    // Pension: ≤8% of employment income
    const pensionLimit = data.employmentIncome * 0.08;
    const pension = Math.min(data.pensionContrib, pensionLimit);

    // NHF: 2.5% of basic salary (or actual contribution)
    const nhfLimit = data.employmentIncome * 0.025;
    const nhf = Math.min(data.nhfContrib, nhfLimit);

    // NHIS: Actual contribution
    const nhis = data.nhisContrib;

    // Life Insurance: Actual premium
    const lifeInsurance = data.lifeInsurance;

    // Rent Relief: 20% of rent paid or ₦500,000 max
    const rentRelief = Math.min(data.rentPaid * 0.2, 500000);

    // Loan Interest: Actual interest paid
    const loanInterest = data.loanInterest;

    // Donations: ≤10% of total income
    const donationsLimit = totalIncome * 0.1;
    const donations = Math.min(data.donations, donationsLimit);

    // Dependent Relief: ₦2,500 per dependent (max 4)
    const dependentRelief = Math.min(data.dependents, 4) * 2500;

    // Note: Consolidated Relief Allowance (CRA) has been phased out and replaced by Rent Relief
    // Total Deductions (CRA no longer applies)
    const totalDeductions =
      pension +
      nhf +
      nhis +
      lifeInsurance +
      rentRelief +
      loanInterest +
      donations +
      dependentRelief;

    // Step 6: Calculate Taxable Income
    const taxableIncome = Math.max(0, totalIncome - totalDeductions);

    // Step 7: Apply Progressive Tax Bands
    const bands = [
      { amount: 800000, rate: 0.0 },
      { amount: 2200000, rate: 0.15 },
      { amount: 9000000, rate: 0.18 },
      { amount: 13000000, rate: 0.21 },
      { amount: 25000000, rate: 0.23 },
    ];

    let remainingIncome = taxableIncome;
    let totalTax = 0;
    const bandBreakdown: TaxBand[] = [];
    let previousThreshold = 0;

    for (let i = 0; i < bands.length; i++) {
      const band = bands[i];
      const bandThreshold = previousThreshold + band.amount;
      const rangeStart = previousThreshold;
      const rangeEnd = bandThreshold;

      if (remainingIncome <= 0) break;

      if (remainingIncome > band.amount) {
        const bandTax = band.amount * band.rate;
        totalTax += bandTax;
        bandBreakdown.push({
          range: `₦${formatNumber(rangeStart)} - ₦${formatNumber(rangeEnd)}`,
          amount: band.amount,
          rate: band.rate * 100,
          tax: bandTax,
        });
        remainingIncome -= band.amount;
        previousThreshold = bandThreshold;
      } else {
        const bandTax = remainingIncome * band.rate;
        totalTax += bandTax;
        bandBreakdown.push({
          range: `₦${formatNumber(rangeStart)} - ₦${formatNumber(
            rangeStart + remainingIncome
          )}`,
          amount: remainingIncome,
          rate: band.rate * 100,
          tax: bandTax,
        });
        remainingIncome = 0;
        break;
      }
    }

    // Remaining income above ₦50,000,000 (25% rate)
    if (remainingIncome > 0) {
      const topBandTax = remainingIncome * 0.25;
      totalTax += topBandTax;
      bandBreakdown.push({
        range: `Above ₦50,000,000`,
        amount: remainingIncome,
        rate: 25,
        tax: topBandTax,
      });
    }

    // Step 8: Calculate Effective Tax Rate
    const effectiveTaxRate =
      totalIncome > 0 ? (totalTax / totalIncome) * 100 : 0;

    // Calculate savings from deductions
    const savingsFromDeductions = totalDeductions;

    // Build detailed deductions list
    const detailedDeductions: DeductionDetail[] = [];

    if (pension > 0) {
      detailedDeductions.push({
        name: "Pension Contribution",
        amount: pension,
        originalAmount: data.pensionContrib,
        limit: pensionLimit,
        calculation:
          pensionLimit < data.pensionContrib
            ? `Limited to 8% of employment income (₦${formatNumber(
                pensionLimit
              )})`
            : `8% of employment income: ₦${formatNumber(
                data.employmentIncome
              )} × 8% = ₦${formatNumber(pensionLimit)}`,
        description:
          "Contributions under the Pension Reform Act. Maximum deductible is 8% of your employment income.",
      });
    }

    if (nhf > 0) {
      detailedDeductions.push({
        name: "National Housing Fund (NHF)",
        amount: nhf,
        originalAmount: data.nhfContrib,
        limit: nhfLimit,
        calculation:
          nhfLimit < data.nhfContrib
            ? `Limited to 2.5% of employment income (₦${formatNumber(
                nhfLimit
              )})`
            : `2.5% of employment income: ₦${formatNumber(
                data.employmentIncome
              )} × 2.5% = ₦${formatNumber(nhfLimit)}`,
        description:
          "National Housing Fund contributions. Typically 2.5% of basic salary.",
      });
    }

    if (nhis > 0) {
      detailedDeductions.push({
        name: "National Health Insurance Scheme (NHIS)",
        amount: nhis,
        originalAmount: data.nhisContrib,
        calculation: `Actual contribution: ₦${formatNumber(data.nhisContrib)}`,
        description:
          "Your annual NHIS premium payments for health insurance coverage.",
      });
    }

    if (lifeInsurance > 0) {
      detailedDeductions.push({
        name: "Life Insurance / Annuity Premium",
        amount: lifeInsurance,
        originalAmount: data.lifeInsurance,
        calculation: `Actual premium paid: ₦${formatNumber(
          data.lifeInsurance
        )}`,
        description:
          "Annual premiums paid for life insurance policies or annuity plans for yourself or your spouse.",
      });
    }

    // Rent Relief: Replaces the old Consolidated Relief Allowance (CRA)
    // Show rent relief if rent was paid (even if 0, to show it's available)
    if (data.rentPaid > 0) {
      const rentReliefCalc = data.rentPaid * 0.2;
      detailedDeductions.push({
        name: "Rent Relief",
        amount: rentRelief,
        originalAmount: data.rentPaid,
        limit: 500000,
        calculation:
          rentReliefCalc > 500000
            ? `20% of rent (₦${formatNumber(
                rentReliefCalc
              )}) capped at ₦500,000 maximum`
            : `20% of rent paid: ₦${formatNumber(
                data.rentPaid
              )} × 20% = ₦${formatNumber(rentRelief)}`,
        description:
          "Rent relief replaces the previous Consolidated Relief Allowance (CRA). You can claim 20% of your annual rent paid, subject to a maximum of ₦500,000 (whichever is lower). Documentary evidence such as lease agreements or payment receipts is required.",
      });
    }

    if (loanInterest > 0) {
      detailedDeductions.push({
        name: "Loan Interest (Home Ownership)",
        amount: loanInterest,
        originalAmount: data.loanInterest,
        calculation: `Actual interest paid: ₦${formatNumber(
          data.loanInterest
        )}`,
        description:
          "Interest paid on loans used to develop or purchase your owner-occupied residential house.",
      });
    }

    if (donations > 0) {
      detailedDeductions.push({
        name: "Charitable Donations",
        amount: donations,
        originalAmount: data.donations,
        limit: donationsLimit,
        calculation:
          donationsLimit < data.donations
            ? `Limited to 10% of total income (₦${formatNumber(
                donationsLimit
              )})`
            : `10% of total income: ₦${formatNumber(
                totalIncome
              )} × 10% = ₦${formatNumber(donationsLimit)}`,
        description:
          "Donations to approved NGOs or charitable organizations. Maximum deductible is 10% of your total income.",
      });
    }

    if (dependentRelief > 0) {
      const dependentsCount = Math.min(data.dependents, 4);
      detailedDeductions.push({
        name: "Dependent Relief",
        amount: dependentRelief,
        originalAmount: data.dependents,
        limit: 4,
        calculation: `${dependentsCount} dependent${
          dependentsCount > 1 ? "s" : ""
        } × ₦2,500 = ₦${formatNumber(dependentRelief)}${
          data.dependents > 4 ? ` (capped at 4 dependents)` : ""
        }`,
        description:
          "Relief for dependents you support financially. ₦2,500 per dependent, maximum 4 dependents (₦10,000 total).",
      });
    }

    // Note: Consolidated Relief Allowance (CRA) has been phased out
    // It has been replaced by the new Rent Relief system

    const result: TaxCalculationResult = {
      totalIncome,
      adjustedBusinessIncome,
      netDigitalIncome,
      totalDeductions,
      taxableIncome,
      taxPayable: totalTax,
      effectiveTaxRate,
      bandBreakdown,
      savingsFromDeductions,
      deductionDetails: {
        pension,
        nhf,
        nhis,
        lifeInsurance,
        rentRelief,
        loanInterest,
        donations,
        dependentRelief,
        consolidatedRelief: 0, // CRA has been phased out, kept for backward compatibility
      },
      detailedDeductions,
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error("Tax calculation error:", error);
    return NextResponse.json(
      { error: "Failed to calculate tax. Please check your inputs." },
      { status: 400 }
    );
  }
}

function formatNumber(num: number): string {
  return Math.round(num).toLocaleString("en-NG");
}
