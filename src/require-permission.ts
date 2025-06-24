import { PermissionKey } from "./types";
import { hasPermission } from "./lib/utils";
import { NextFunction, Request, Response } from "express";

// @ts-ignore
export function requirePermission(permission: PermissionKey) {
  return (req: Request, res: Response, next: NextFunction) => {
    //@ts-ignore
    const user = req.auth;

    if (!user) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    if (!hasPermission(user, permission)) {
      res.status(403).json({ error: "Forbidden" });
      return;
    }

    next();
  };
}
