import { NextRequest, NextResponse } from "next/server";
import { TaxInput, TaxCalculationResult, TaxBand } from "@/app/types/tax";

export async function POST(request: NextRequest) {
  try {
    const data: TaxInput = await request.json();

    // Step 1: Calculate Gross Income
    const grossIncome =
      data.employmentIncome +
      data.freelanceIncome +
      data.digitalIncome +
      data.rentalIncome +
      data.investmentIncome +
      data.capitalGains;

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
    const netDigitalIncome = Math.max(0, data.digitalIncome - data.lossesDigital);

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

    // Consolidated Relief: 20% of Gross Income + ₦200,000 (whichever is higher)
    const consolidatedRelief = Math.max(totalIncome * 0.2, 200000);

    // Total Deductions
    const totalDeductions =
      pension +
      nhf +
      nhis +
      lifeInsurance +
      rentRelief +
      loanInterest +
      donations +
      dependentRelief +
      consolidatedRelief;

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
        consolidatedRelief,
      },
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
