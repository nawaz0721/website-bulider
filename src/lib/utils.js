import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Function to merge Tailwind classes correctly
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
