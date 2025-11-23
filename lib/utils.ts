import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("sk-SK", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export function formatDateTime(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleString("sk-SK", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function generateVerificationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function isDisposableEmail(email: string): boolean {
  const disposableDomains = [
    "tempmail.com",
    "10minutemail.com",
    "guerrillamail.com",
    "mailinator.com",
    "throwaway.email",
    "yopmail.com",
  ];
  const domain = email.split("@")[1]?.toLowerCase();
  return disposableDomains.includes(domain);
}

export function sanitizePhoneNumber(phone: string): string {
  // Remove all non-digit characters
  return phone.replace(/\D/g, "");
}

export function isValidSlovakPhone(phone: string): boolean {
  const cleaned = sanitizePhoneNumber(phone);
  // Slovak phone numbers: +421 followed by 9 digits, or 0 followed by 9 digits
  return /^(421\d{9}|0\d{9})$/.test(cleaned);
}


