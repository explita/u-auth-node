"use server";

import { parseMessage } from "./lib/utils";
import { serverCall } from "./lib/api";
import { isAuthError } from "./lib/error";
import { Role, NewRole, FormResponse } from "./types";

export async function getRoles(
  req: any,
  options?: { groupId: string }
): Promise<Role[]> {
  try {
    const res = await serverCall(
      req,
      `/roles?groupId=${options?.groupId || ""}`,
      {
        method: "GET",
      }
    );

    return res.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function addRole(
  req: any,
  role: NewRole
): Promise<FormResponse<Role>> {
  try {
    const res = await serverCall(req, "/roles", { method: "POST", body: role });
    return res;
  } catch (error: any) {
    if (isAuthError(error)) {
      return error.data;
    }
    return { message: parseMessage(error.message), status: "failure" };
  }
}

export async function updateRole(
  req: any,
  roleId: string,
  role: NewRole
): Promise<FormResponse<Role>> {
  try {
    const res = await serverCall(req, `/roles/${roleId}`, {
      method: "PUT",
      body: role,
    });
    return res;
  } catch (error: any) {
    if (isAuthError(error)) {
      return error.data;
    }
    return { message: parseMessage(error.message), status: "failure" };
  }
}

export async function assignPermission(
  req: any,
  roleId: string,
  permissions: string[]
): Promise<FormResponse<Role>> {
  try {
    const res = await serverCall(req, `/assign-permissions/${roleId}`, {
      method: "PUT",
      body: { permissions },
    });
    return res;
  } catch (error: any) {
    if (isAuthError(error)) {
      return error.data;
    }
    return { message: parseMessage(error.message), status: "failure" };
  }
}
