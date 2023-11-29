import { User, Customer, Company, File, Asset } from "db";

export type { User, Customer } from "db";

export type FullUser = User & {
  customer:
    | (Customer & {
        employer: Company | null;
        thumbnail:
          | (File & {
              assets: Asset[];
            })
          | null;
      })
    | null;
};

export const Role = {
  ADMIN: "admin",
  USER: "user",
} as const;
export type Role = (typeof Role)[keyof typeof Role];

export function stringToRole(str: string): Role | undefined {
  switch (str) {
    case "admin":
      return Role.ADMIN;
    case "user":
      return Role.USER;
    default:
      return undefined;
  }
}

export function getRoleName(role?: Role): string {
  switch (role) {
    case Role.ADMIN:
      return "Admin";
    case Role.USER:
      return "User";
    default:
      return "Unknown";
  }
}

export function getRoleColor(role?: Role): string {
  switch (role) {
    case Role.ADMIN:
      return "error";
    case Role.USER:
      return "theme";
    default:
      return "theme";
  }
}

export function getRoleVariant(
  role?: Role
): "default" | "secondary" | "destructive" | "outline" {
  switch (role) {
    case Role.ADMIN:
      return "destructive";
    case Role.USER:
      return "default";
    default:
      return "default";
  }
}
