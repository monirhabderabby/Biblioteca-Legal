import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generatePassword(
  options: { length?: number; includeSymbols?: boolean } = {}
) {
  const { length = 12, includeSymbols = true } = options;

  const prefix = "Bib";
  const totalLength = Math.max(prefix.length + length, 12); // ensure min total length if needed
  const desiredLength = totalLength - prefix.length;

  const lower = "abcdefghijklmnopqrstuvwxyz";
  const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numbers = "0123456789";
  const symbols = "!@#$%^&*()-_=+[]{}|;:,.<>?/";

  let allChars = lower + upper + numbers;
  if (includeSymbols) {
    allChars += symbols;
  }

  let password = "";
  for (let i = 0; i < desiredLength; i++) {
    const randomIndex = Math.floor(Math.random() * allChars.length);
    password += allChars[randomIndex];
  }

  return prefix + password;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function extractTextFromTipTap(html: any): string {
  if (!html) return "";
  // Create a temporary DOM element to extract text
  const tmp =
    typeof window === "undefined"
      ? // eslint-disable-next-line @typescript-eslint/no-require-imports
        new (require("jsdom").JSDOM)(`<div>${html}</div>`).window.document.body
      : document.createElement("div");

  if (typeof window !== "undefined") {
    tmp.innerHTML = html;
    return tmp.textContent || "";
  }

  return tmp.textContent || "";
}
