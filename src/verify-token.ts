import { serverCall } from "./lib/api";
import { NextFunction, Request, Response } from "express";

export function verifyTokenMiddleware(options?: { exclude?: string[] }) {
  return async function (req: Request, res: Response, next: NextFunction) {
    const path = req.path || req.originalUrl || req.url;

    const excludedPaths = options?.exclude ?? [];

    if (excludedPaths.some((p) => path.startsWith(p))) {
      return next();
    }

    try {
      const { user } = await serverCall(req, "/me", { method: "GET" });

      //@ts-ignore
      req.auth = user; // Attach user to request

      next();
    } catch (err: any) {
      console.log(err);
      res
        .status(401)
        .json({ message: err.message || "Invalid or expired token" });
    }
  };
}
