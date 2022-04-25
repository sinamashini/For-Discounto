import { Ctx, resolver } from "blitz";
import db, { PrismaClient, Prisma } from "db";
import { z } from "zod";

export type DbTranAction = Omit<PrismaClient<Prisma.PrismaClientOptions, never, Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>, "$connect" | "$disconnect" | "$on" | "$transaction" | "$use">

interface LoggerI {
  action: string;
  prisma?: DbTranAction
}

export default resolver.pipe(async ({ action, prisma }: LoggerI, ctx: Ctx) => {
  ctx.session.$authorize();
  const userId = ctx.session.userId;
  if (!prisma)
    await db.opratorLogs.create({ data: { action, userId } })
  else {
    await prisma.opratorLogs.create({ data: { action, userId } })
  }
});
