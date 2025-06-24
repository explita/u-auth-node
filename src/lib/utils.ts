import { User } from "../types";

export function hasPermission(
  user: User | null,
  // @ts-ignore
  permission: PermissionKey
): boolean {
  if (!user || !permission) return false;

  return user.role.permissions?.includes(permission) || user.isSuperAdmin;
}

export function parseMessage(message: string): string {
  return message == "fetch failed" || message == "Failed to fetch"
    ? "Please check your internet connection"
    : message;
}
