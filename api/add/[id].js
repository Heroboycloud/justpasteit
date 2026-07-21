import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { id } = req.query;
  const content = await redis.get(id);

  if (content === null || content === undefined) {
    return res.status(404).json({ error: "Paste not found" });
  }

  return res.status(200).json({ content });
}
