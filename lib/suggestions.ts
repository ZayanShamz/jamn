export const PLATFORMS = [
  "LinkedIn",
  "Indeed",
  "Glassdoor",
  "Wellfound",
  "Dice",
  "Monster",
  "ZipRecruiter",
  "Greenhouse",
  "Lever",
  "Workday",
  "Handshake",
  "AngelList",
  "Naukrigulf",
  "Naukri",
  "Jooble",
  "Adzuna",
  "CareerBuilder",
  "SimplyHired",
] as const;

export type Platform = (typeof PLATFORMS)[number];

export const isKnownPlatform = (val: string): boolean =>
  PLATFORMS.some((p) => p.toLowerCase() === val.trim().toLowerCase());
