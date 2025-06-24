export class AuthError extends Error {
  data: any;
  status: number;

  constructor(message: string, data: any, status: number) {
    super(message);
    this.data = data;
    this.status = status;
  }
}

export function isAuthError(err: any): err is AuthError {
  return err?.data !== undefined;
}
