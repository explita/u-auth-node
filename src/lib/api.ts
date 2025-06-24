import { Request } from "express";
import { ApiOptions } from "../types";
import { AuthError } from "./error";

export async function serverCall<T = any>(
  req: Request,
  apiPath: string,
  options?: ApiOptions
): Promise<T> {
  if (!process.env.U_AUTH_PRIVATE_TOKEN) {
    throw new Error(
      "Missing U_AUTH_PRIVATE_TOKEN environment variable. Please set it in your .env file."
    );
  }

  let [apiUrl, apiKey] = atob(process.env.U_AUTH_PRIVATE_TOKEN).split("$");

  if (!apiUrl || !apiKey) {
    throw new Error(
      "Invalid API URL or API key, please set U_AUTH_PRIVATE_TOKEN in your .env file."
    );
  }

  const rawAuth = req.headers["authorization"] || "";
  const token = rawAuth.startsWith("Bearer ") ? rawAuth.split(" ")[1] : rawAuth;

  if (!token) {
    throw new Error("Missing or invalid Authorization header");
  }

  const { method = "POST", body, headers, ...rest } = options ?? {};

  const res = await fetch(`${apiUrl}${apiPath}`, {
    method,
    body: body ? JSON.stringify(body) : undefined,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "x-api-key": apiKey,
      "x-server-to-server": "true",
      // ...headers,
    },
    ...rest,
  });

  if (!res.ok) {
    let errorData: any = { message: "Something went wrong." };

    try {
      errorData = await res.json();
    } catch {
      // response is not JSON, keep default errorData
    }

    const baseMessage = errorData.message || "Unexpected error occurred.";

    if (res.status === 401) {
      throw new AuthError(
        "Unauthorized: Please check the token or login again.",
        errorData,
        401
      );
    }

    if (res.status === 403) {
      throw new AuthError(
        "Forbidden: You don't have permission to access this resource.",
        errorData,
        403
      );
    }

    if (res.status === 404) {
      throw new AuthError(
        "Not Found: The requested API path was not found.",
        errorData,
        404
      );
    }

    throw new AuthError(baseMessage, errorData, res.status);
  }

  return (await res.json()) as T;
}
