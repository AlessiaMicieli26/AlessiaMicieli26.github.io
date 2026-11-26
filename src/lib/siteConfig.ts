export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://alessiamicieli26.github.io"
).replace(/\/$/, "");

export const BASE_PATH = (process.env.NEXT_PUBLIC_BASE_PATH || "").replace(
  /\/$/,
  ""
);
