import { redis } from "./redis";

export async function cache<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttlSeconds = 3600
): Promise<T> {
  const cached = await redis.get(key);
  if (typeof cached === "string") {
    return JSON.parse(cached) as T;
  }

  const data = await fetcher();
  await redis.set(key, JSON.stringify(data), { ex: ttlSeconds });
  return data;
}
