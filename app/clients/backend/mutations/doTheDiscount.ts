import addUserLog from "app/logger/mutations/addUserLog";
import { resolver, Ctx } from "blitz";
import db from "db";
import { z } from "zod";
import { ConfirmDiscount } from "../validation";


const updateMapLevel = async({childIds, clientId, price}: z.infer<typeof ConfirmDiscount>, ctx: Ctx) => {
  ctx.session.$authorize();
  await db.clientsMap.updateMany({
    where: {
      AND: [
        { childId: { in: childIds } },
        { parentId: clientId }
      ]
    },
    data: { status: "USED" }
  });
  return { childIds, clientId, price };
}


export default resolver.pipe(resolver.zod(ConfirmDiscount), updateMapLevel, async ({ clientId, price, childIds }: z.infer<typeof ConfirmDiscount>, ctx: Ctx) => {
  const clientPackage = await db.packagesClients.findFirst({ where: { clientId, status: 'ACTIVE' }, include: { package: { select: { maxPayment: true } } } });

  const remain = clientPackage ? clientPackage?.package.maxPayment - price : 0;

  const clientDiscountHistory = await db.discountHistory.create({ data: { clientId, price, remain, numberOfPeopleIncluded: childIds.length } });

  await addUserLog({ action: `اعمال تخفیف برای مشتری به کد ${clientId}` }, ctx);

  return clientDiscountHistory;
});
