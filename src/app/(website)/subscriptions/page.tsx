import { auth } from "@/auth";
import CTA from "@/components/shared/sections/cta";
import HeaderSection from "@/components/shared/sections/header";
import { getCurrentUserSubscription } from "@/helper/subscription";
import { paddle } from "@/lib/paddle";
import PricingComparison from "./_components/pricing-plan";

// Utility: Currency Mapping
const countryToCurrency: Record<string, string> = {
  BD: "BDT", // Bangladesh → Taka
  HN: "HNL", // Honduras → Lempira
  US: "USD", // USA → Dollar
  IN: "INR", // India → Rupee
  MX: "MXN", // Mexico → Peso
  // চাইলে আরো দেশ যোগ করুন
};

// Fetch exchange rate (USD → target currency)
async function getExchangeRate(to: string) {
  try {
    const res = await fetch(
      `https://api.exchangerate.host/latest?base=USD&symbols=${to}`,
      { cache: "no-store" } // always fresh
    );
    console.log("currency convert response", res.json());
    const data = await res.json();
    return data.rates[to] || 1;
  } catch (e) {
    console.error("Exchange rate error:", e);
    return 1;
  }
}

// Detect user country by IP
async function getUserCountry() {
  try {
    const res = await fetch("https://ipapi.co/json/", {
      cache: "no-store",
    });
    const data = await res.json();
    console.log("ipapi response", data);
    return data.country || "US";
  } catch (e) {
    console.error("IP detection error:", e);
    return "US";
  }
}

const Page = async () => {
  const cu = await auth();
  const isLoggedin = !!cu;
  const currentSubscription = await getCurrentUserSubscription();

  // Paddle থেকে USD price
  const response = await paddle.prices.get(process.env.NEXT_PUBLIC_PRICE_ID!);
  const priceData = response.unitPrice;
  const usdAmount = Number(priceData.amount) / 100;

  // User country detect
  const userCountry = await getUserCountry();
  const targetCurrency = countryToCurrency[userCountry] || "USD";

  // যদি লোকাল কারেন্সি আলাদা হয় তাহলে কনভার্ট
  let displayPrice: string;
  if (targetCurrency !== "USD") {
    const rate = await getExchangeRate(targetCurrency);
    const localAmount = (usdAmount * rate).toFixed(2);
    displayPrice = formatPrice(localAmount, targetCurrency);
  } else {
    displayPrice = formatPrice(usdAmount.toString(), "USD");
  }

  console.log("displayPrice", displayPrice);

  return (
    <div>
      <HeaderSection
        imageUrl="https://files.edgestore.dev/ln9m9j3kr2yibrue/staticFiled/_public/subscription%20page.webp"
        title="Nuestros Planes"
        description="Únete a nuestra plataforma para acceder a recursos legales actualizados"
      />

      <PricingComparison
        subscription={currentSubscription?.subscription}
        sub_type={currentSubscription?.type as "user" | "company"}
        price={displayPrice}
        // note={`(Approx USD $${usdAmount})`} // নিচে USD reference দেখাবে
      />

      {!isLoggedin && <CTA />}
    </div>
  );
};

export default Page;

// Format function
function formatPrice(amount: string, currencyCode: string): string {
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
