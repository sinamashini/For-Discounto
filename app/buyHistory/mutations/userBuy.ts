import addUserLog from "app/logger/mutations/addUserLog";
import { Ctx, resolver } from "blitz"
import db from "db";
import { AddBuyHiatory } from "../validation"

export default resolver.pipe(resolver.zod(AddBuyHiatory), async ({ clientId, price, description }, ctx: Ctx) => {
  ctx.session.$authorize();

  const history = await db.buyHistory.create({ data: { clientId, price, description } });

  await addUserLog({ action: `ثبت خرید برای مشتری با کد ${clientId}` }, ctx);

  return history
});
