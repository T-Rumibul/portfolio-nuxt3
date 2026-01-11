import type { Context } from "@netlify/edge-functions";
export default async (req: Request, context: Context) => {
  const ip = context.ip;
  req.headers.set("x-client-ip", ip);
  return context.next(req);
};
