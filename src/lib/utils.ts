import { GoogleGenerativeAI } from "@google/generative-ai";
import { clsx, type ClassValue } from "clsx";
import { createClient } from "pexels";
import { twMerge } from "tailwind-merge";

export const genAI = new GoogleGenerativeAI(
  process.env.NEXT_PUBLIC_API_KEY || ""
);
export const client = createClient(process.env.NEXT_PUBLIC_PEXEL_API_KEY || "");

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const audioTracks = [
  "1.mp3",
  "2.mp3",
  "3.mp3",
  "4.mp3",
  "5.mp3",
  "6.mp3",
];

export const copy = (text: string) => {
  navigator.clipboard.writeText(text);
  alert("Copied to clipboard!");
};
