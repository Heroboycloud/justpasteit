import { Redis } from "@upstash/redis";
import { nanoid } from "nanoid";

const redis = Redis.fromEnv();

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { content } = req.body || {};

  if (!content || typeof content !== "string") {
    return res.status(400).json({ error: "content is required" });
  }

  const id = nanoid(8);

  // Pastes expire after 30 days. Remove the `ex` option to keep them forever.
  await redis.set(id, content, { ex: 60 * 60 * 24 * 30 });

  return res.status(200).json({ _id: id });
}
