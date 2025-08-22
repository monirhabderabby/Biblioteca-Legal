import { useMemo } from "react";
import useSWR from "swr";

export const countryToCurrency: Record<string, string> = {
  BD: "BDT",
  HN: "HNL",
  US: "USD",
  IN: "INR",
  MX: "MXN",
};

export function formatPrice(amount: string, currencyCode: string): string {
  const num = Number(amount);
  const formattedAmount = num % 1 === 0 ? num.toString() : num.toFixed(2);

  const currencySymbols: Record<string, string> = {
    USD: "$",
    HNL: "L",
    BDT: "৳",
    INR: "₹",
    MXN: "$",
  };

  const symbol = currencySymbols[currencyCode] || currencyCode;
  return `${symbol}${formattedAmount}`;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useLocalizedPrice(usdAmount: number) {
  // First, try to load cached IP/currency data from localStorage
  const localCache =
    typeof window !== "undefined" ? localStorage.getItem("ipData") : null;
  const parsedCache = localCache ? JSON.parse(localCache) : null;

  const { data: ipData, error } = useSWR("https://ipwhois.app/json/", fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 24 * 60 * 60 * 1000, // 24h dedupe
    shouldRetryOnError: true,
    fallbackData: parsedCache, // Use cached data immediately
    onSuccess: (data) => {
      // Store the data in localStorage for future visits
      if (typeof window !== "undefined") {
        localStorage.setItem("ipData", JSON.stringify(data));
      }
    },
  });

  const price = useMemo(() => {
    if (!ipData || error) return `$${usdAmount}`;

    const targetCurrency = countryToCurrency[ipData.country_code] || "USD";
    const userCurrencyRate = ipData.currency_rates || 1;

    if (targetCurrency !== "USD") {
      const localAmount = (usdAmount * userCurrencyRate).toFixed(2);
      return formatPrice(localAmount, targetCurrency);
    }
    return formatPrice(usdAmount.toString(), "USD");
  }, [ipData, usdAmount, error]);

  return price;
}
