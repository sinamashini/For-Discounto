import { Ctx, resolver } from "blitz";
import db from "db";
import { z } from "zod";
import { DbTransaction } from 'types';


interface LoggerI {
  action: string;
  prisma?: DbTransaction
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
