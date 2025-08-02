import { interviewCovers, mappings } from "@/constants";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const techIconBaseURL = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

// Cache for icon existence checks to reduce fetch calls and stabilize SSR
const iconCache = new Map<string, boolean>();

const normalizeTechName = (tech: string) => {
  const key = tech.toLowerCase().replace(/\.js$/, "").replace(/\s+/g, "");
  const normalized =
    key === "c#" ? "csharp" : mappings[key as keyof typeof mappings] || key;
  console.log(`Normalized ${tech} to ${normalized}`); // Debug log
  return normalized;
};

const checkIconExists = async (url: string) => {
  if (iconCache.has(url)) {
    return iconCache.get(url)!;
  }
  try {
    const response = await fetch(url, { method: "HEAD" });
    const exists = response.ok;
    iconCache.set(url, exists);
    if (!exists) {
      console.error(`Icon not found: ${url}`);
    }
    return exists;
  } catch (error) {
    console.error(`Error checking icon ${url}:`, error);
    iconCache.set(url, false);
    return false;
  }
};

export const getTechLogos = async (techArray: string[]) => {
  console.log("Input techStack:", techArray); // Debug log
  const logoURLs = techArray.map((tech) => {
    const normalized = normalizeTechName(tech);
    const url = `${techIconBaseURL}/${normalized}/${normalized}-original.svg`;
    console.log(`Generated URL for ${tech}: ${url}`); // Debug log
    return { tech, url };
  });

  const results = await Promise.all(
    logoURLs.map(async ({ tech, url }) => ({
      tech,
      url: (await checkIconExists(url)) ? url : null,
    }))
  );
  return results.filter((result) => result.url !== null);
};

export const getRandomInterviewCover = () => {
  const randomIndex = Math.floor(Math.random() * interviewCovers.length);
  return `/covers${interviewCovers[randomIndex]}`;
};