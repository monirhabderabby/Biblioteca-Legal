import { Environment, Paddle } from "@paddle/paddle-node-sdk";
const apiKey = process.env.PADDLE_API_KEY!;

export const paddle = new Paddle(apiKey, {
  environment: Environment.production, // or Environment.sandbox for accessing sandbox API
});
