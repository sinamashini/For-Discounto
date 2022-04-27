import { DefaultCtx, SessionContext, SimpleRolesIsAuthorized } from "blitz"
import { User, Prisma, PrismaClient } from "db"

// Note: You should switch to Postgres and then use a DB enum for role type
export type Role = "ADMIN" | "USER" | "EDITOR";

declare module "blitz" {
  export interface Ctx extends DefaultCtx {
    session: SessionContext
  }
  export interface Session {
    isAuthorized: SimpleRolesIsAuthorized<Role>
    PublicData: {
      userId: User["id"]
      role: Role
    }
  }
}

export type DbTransaction = Omit<PrismaClient<Prisma.PrismaClientOptions, never, Prisma.RejectPerOperation | Prisma.RejectOnNotFound | undefined>, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use">;
