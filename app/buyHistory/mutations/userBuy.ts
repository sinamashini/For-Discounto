import doTheDiscount from "app/clients/backend/mutations/doTheDiscount";
import addUserLog from "app/logger/mutations/addUserLog";
import { Ctx, resolver } from "blitz"
import db from "db";
import { AddBuyHiatory } from "../validation"

export default resolver.pipe(resolver.zod(AddBuyHiatory), async ({ clientId, price, description, clientIds, priceWithDiscount }, ctx: Ctx) => {
  ctx.session.$authorize();

  if (clientIds) {
    await doTheDiscount({ clientId, childIds: clientIds, price: priceWithDiscount }, ctx)
  }

  const history = await db.buyHistory.create({ data: { clientId, price, description, priceWithDiscount } });

  //TODO sms
  await addUserLog({ action: `ثبت خرید برای مشتری با کد ${clientId}` }, ctx);

  return history
});
