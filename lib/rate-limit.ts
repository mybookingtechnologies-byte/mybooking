const requestStore = new Map<string, number[]>();

export function isRateLimited(key: string, maxRequests = 5, windowMs = 60_000) {
  const now = Date.now();
  const windowStart = now - windowMs;
  const requests = requestStore.get(key)?.filter((stamp) => stamp > windowStart) ?? [];

  requests.push(now);
  requestStore.set(key, requests);

  return requests.length > maxRequests;
}