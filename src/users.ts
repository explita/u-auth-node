import { Request } from "express";
import { parseMessage } from "./lib/utils";
import { isAuthError } from "./lib/error";
import { serverCall } from "./lib/api";
import {
  VerifyUser,
  VerifyUserResponse,
  User,
  FormResponse,
  Signup,
  UpdateUser,
} from "./types";

export async function verifyUser(
  req: Request,
  data: VerifyUser
): Promise<VerifyUserResponse> {
  try {
    const res = await serverCall(req, "/users/verify", {
      body: { actions: data },
    });

    return res;
  } catch (error: any) {
    return error;
  }
}

export async function registerUser(
  req: Request,
  data: Signup,
  options?: { isSuperAdmin?: boolean }
): Promise<FormResponse<User>> {
  try {
    const res = await serverCall(
      req,
      `/signup?isSuperAdmin=${options?.isSuperAdmin || false}`,
      {
        body: { ...data },
      }
    );

    return res;
  } catch (error: any) {
    if (isAuthError(error)) {
      return error.data;
    }
    return {
      message: parseMessage(error.message),
      status: "failure",
    };
  }
}

export async function updateUser(
  req: Request,
  userId: string,
  data: UpdateUser
): Promise<FormResponse<User>> {
  try {
    const res = await serverCall(req, `/update-user/${userId}`, {
      body: { ...data },
      method: "PUT",
    });

    return res;
  } catch (error: any) {
    if (isAuthError(error)) {
      return error.data;
    }
    return { message: parseMessage(error.message), status: "failure" };
  }
}

export async function getUsers(
  req: Request,
  options?: { groupId: string }
): Promise<User[]> {
  try {
    const res = await serverCall(
      req,
      `/users?groupId=${options?.groupId || ""}`,
      {
        method: "GET",
      }
    );
    return res.data;
  } catch (err: any) {
    console.log(err.message);
    return [];
  }
}

export async function getUserById(
  req: Request,
  userId: string
): Promise<User | null> {
  try {
    const res = await serverCall(req, `/users/${userId}`, { method: "GET" });
    return res.user;
  } catch (err: any) {
    console.log(err.message);
    return null;
  }
}

export async function toggleUserStatus(
  req: Request,
  userId: string
): Promise<any> {
  try {
    const res = await serverCall(req, "/toggle-user-status", {
      method: "PUT",
      body: {
        selectedUserId: userId,
      },
    });

    return res;
  } catch (error: any) {
    if (isAuthError(error)) {
      return error.data;
    }
    return { message: parseMessage(error.message), status: "failure" };
  }
}
