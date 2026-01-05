/**
 * Format balance value with thousands separators
 * @param amount - The numeric amount to format
 * @param price - The price per unit
 * @returns Formatted string with currency symbol (e.g., "$1,234.56")
 */
export const formatBalance = (amount: string, price: number): string => {
  if (!amount || amount === "") {
    return "$0";
  }

  const numericAmount = parseFloat(amount);
  if (isNaN(numericAmount)) {
    return "$0";
  }

  const totalValue = numericAmount * price;

  // Format with thousands separators and 2 decimal places
  return `$${totalValue.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};
