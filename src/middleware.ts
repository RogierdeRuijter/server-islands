import { sequence } from "astro/middleware";

import { defineMiddleware } from "astro:middleware";

const BROWSER_CACHE_MAX_AGE_SECS = 60 * 1;
const VERCEL_CACHE_MAX_AGE_SECS = 60 * 2;
const VERCEL_CACHE_KEY = "Vercel-CDN-Cache-Control";

const setCacheHeaders = defineMiddleware(async (context, next) => {
  const response = await next();

  response.headers.set(
    "Cache-Control",
    `max-age=${BROWSER_CACHE_MAX_AGE_SECS}`,
  );
  response.headers.set(
    VERCEL_CACHE_KEY,
    `max-age=${VERCEL_CACHE_MAX_AGE_SECS}`,
  );

  return response;
});

export const onRequest = sequence(setCacheHeaders);
