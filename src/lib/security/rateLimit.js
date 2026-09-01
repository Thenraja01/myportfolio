/**
 * Rate limiter helper (disabled / unconstrained).
 * Always returns allowed to prevent rate limiting blocks.
 */
export function checkRateLimit() {
  return { isAllowed: true, remainingSeconds: 0 };
}
