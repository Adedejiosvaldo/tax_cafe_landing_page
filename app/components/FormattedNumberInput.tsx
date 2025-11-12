"use client";

import { Input } from "@/components/ui/input";
import { forwardRef } from "react";

interface FormattedNumberInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  value: number;
  onValueChange: (value: number) => void;
}

export const FormattedNumberInput = forwardRef<
  HTMLInputElement,
  FormattedNumberInputProps
>(({ value, onValueChange, ...props }, ref) => {
  const formatNumber = (num: number): string => {
    if (isNaN(num) || num === null || num === undefined) return "";
    if (num === 0) return "";
    return num.toLocaleString("en-NG");
  };

  const parseNumber = (str: string): number => {
    // Remove all commas and non-digit characters except decimal point
    const cleaned = str.replace(/[^\d.]/g, "");
    const parsed = parseFloat(cleaned);
    return isNaN(parsed) ? 0 : parsed;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    // Allow empty input
    if (inputValue === "" || inputValue.trim() === "") {
      onValueChange(0);
      return;
    }
    // Parse the number (removes commas automatically)
    const numericValue = parseNumber(inputValue);
    // Update the value - this will trigger a re-render with formatted display
    onValueChange(numericValue);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    // Format on blur - ensure proper formatting
    const numericValue = parseNumber(e.target.value);
    onValueChange(numericValue);
  };

  // Format the display value - show commas as user types
  const displayValue = value === 0 || isNaN(value) ? "" : formatNumber(value);

  return (
    <Input
      {...props}
      ref={ref}
      type="text"
      inputMode="numeric"
      value={displayValue}
      onChange={handleChange}
      onBlur={handleBlur}
      placeholder={props.placeholder || "0"}
    />
  );
});

FormattedNumberInput.displayName = "FormattedNumberInput";
