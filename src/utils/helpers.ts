/**
 * Format monetary values
 * @param val
 * @returns
 */
export const formatAmount = (val: string | number = "", currency?: string) => {
  if (currency) {
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
    });
    return formatter.format(val as number);
  }
  return (
    val?.toLocaleString("en", {
      minimumFractionDigits: Number.isInteger(+val) ? 0 : 2,
      maximumFractionDigits: Number.isInteger(+val) ? 0 : 2,
    }) ?? 0
  );
};

export const calcDiscountedPrice = (
  discount: string | number,
  originalPrice: string | number
) => {
  const dicountprice = (+discount / 100) * +originalPrice;
  return formatAmount(+originalPrice + dicountprice);
};

export const truncate = (str: string, maxLength = 50): string => {
  return str.length > maxLength ? str.slice(0, maxLength) + "..." : str;
};

export const generateId = (): string =>
  `${
    crypto?.randomUUID?.() ?? Math.random().toString(36).slice(2) + Date.now()
  }`;
