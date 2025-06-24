type VerifyUserKey = "email" | "username" | "password";
export type PermissionKey = string;

export type VerifyUser = {
  key: VerifyUserKey;
  value: string;
}[];

export type VerifyUserResponse =
  | {
      success: true;
      data: {
        key: VerifyUserKey;
        value: string;
        status: "available" | "taken";
        message: string;
      }[];
    }
  | {
      message: string;
      message_slug: string;
      success: false;
    };

export type ApiOptions = {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  body?: Record<string, any>;
  headers?: Record<string, string>;
  [key: string]: any;
};

export type User<MetaData extends Record<string, any> = Record<string, any>> = {
  id: string;
  groupId: string | null;
  email: string;
  firstName: string;
  lastName: string;
  avatar: string | null;
  with2fa: boolean;
  metaData: MetaData;
  role: Role;
  isSuperAdmin: boolean;
  status: Status;
  createdAt: string;
  updatedAt: string;
};

export type Role = {
  id: string;
  userId: string | null;
  name: string;
  description: string | null;
  permissions: string[];
  status: Status;
  createdAt: Date;
  updatedAt: Date;
};

export type NewRole = {
  name: string;
  description?: string;
  groupId?: string;
};

type GeneralResponse = {
  status: "failure";
  message: string;
};

export type FormResponse<T extends any = any> =
  | {
      status: "validation-error";
      errors: Record<string, string>;
      message: string;
    }
  | GeneralResponse
  | {
      status: "success";
      message: string;
      data: T;
      authToken?: string;
    };

export type Signup = {
  groupId?: string | null;
  firstName: string;
  lastName: string;
  username?: string;
  email: string;
  password: string;
  confirmPassword: string;
  metaData?: Record<string, any>;
};

export type UpdateUser = Omit<Signup, "password" | "confirmPassword">;

export type Status = "ACTIVE" | "INACTIVE";
