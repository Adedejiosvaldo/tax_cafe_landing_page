export interface TaxInput {
  // Personal Info
  employmentType: "employee" | "self-employed" | "freelancer" | "both";
  resident: boolean;

  // Income Sources
  employmentIncome: number;
  freelanceIncome: number;
  digitalIncome: number;
  rentalIncome: number;
  investmentIncome: number;
  capitalGains: number;

  // Business Expenses (for self-employed)
  businessExpenses: number;

  // Digital Asset Losses
  lossesDigital: number;

  // Deductions
  pensionContrib: number;
  nhfContrib: number;
  nhisContrib: number;
  lifeInsurance: number;
  rentPaid: number;
  loanInterest: number;
  donations: number;
  dependents: number;
}

export interface TaxBand {
  range: string;
  amount: number;
  rate: number;
  tax: number;
}

export interface TaxCalculationResult {
  totalIncome: number;
  adjustedBusinessIncome: number;
  netDigitalIncome: number;
  totalDeductions: number;
  taxableIncome: number;
  taxPayable: number;
  effectiveTaxRate: number;
  bandBreakdown: TaxBand[];
  savingsFromDeductions: number;
  deductionDetails: {
    pension: number;
    nhf: number;
    nhis: number;
    lifeInsurance: number;
    rentRelief: number;
    loanInterest: number;
    donations: number;
    dependentRelief: number;
    consolidatedRelief: number;
  };
}
