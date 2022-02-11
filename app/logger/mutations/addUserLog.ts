import { Ctx, resolver } from "blitz";
import db from "db";
import { z } from "zod";

const Logger = z.object({
  action: z.string()
})

export default resolver.pipe(resolver.zod(Logger), async ({ action }, ctx: Ctx) => {
  ctx.session.$authorize();
  const userId = ctx.session.userId;
  await db.opratorLogs.create({data: {action, userId}})
});
