import doTheDiscount from "app/clients/backend/mutations/doTheDiscount";
import addUserLog from "app/logger/mutations/addUserLog";
import { Ctx, resolver } from "blitz"
import db, { Clients } from "db";
import { z } from "zod";
import { AddBuyHiatory, ParentWithPrice } from "../validation"

const updateClientBuyHistory = async (parentWithPrice: z.infer<typeof ParentWithPrice>) => {
  if (parentWithPrice?.length) {
    for (const parent of parentWithPrice) {
      const history = await db.discountHistory.findMany({ where: { clientId: parent.id }, orderBy: { createdAt: 'desc' }, take: 1 });
      const lastDiscount = history[0];
      const clientPackage = await db.packagesClients.findFirst({
        where: { clientId: parent.id, status: "ACTIVE" }, include: {
          package: true
        }
      });
      if (clientPackage) {
        const { maxPayment } = clientPackage.package;
        if (lastDiscount) {
          const { price, remain } = lastDiscount;
          const priceToAdd = price + parent.discount >= maxPayment ? maxPayment : price + parent.discount;
          const remainPresent = price + parent.discount - maxPayment < 0 ? 0 : price + parent.discount - maxPayment
          await addToDscountHistory(parent.id, priceToAdd, remainPresent + (remain ?? 0))
          await updateClientCredit(parent.id, parent.discount)
        }
        else {
          const priceToPay = parent.discount > maxPayment ? maxPayment : parent.discount;
          const remain = parent.discount > maxPayment ? parent.discount - maxPayment : 0;
          await addToDscountHistory(parent.id, priceToPay, remain);
          await updateClientCredit(parent.id, parent.discount);
        }
      }
    }
  }
}

export default resolver.pipe(resolver.zod(AddBuyHiatory), async (params, ctx: Ctx) => {
  ctx.session.$authorize();
  const { clientId, price, description, clientIds, priceWithDiscount, parentWithPrice } = params;

  if (clientIds) {
    await doTheDiscount({ clientId, parentIds: clientIds, price }, ctx)
  }

  const history = await db.buyHistory.create({ data: { clientId, price, description, priceWithDiscount } });

  if (parentWithPrice) {
    await updateClientBuyHistory(parentWithPrice);
  }
  if (params.priceWithDiscount !== params.price) {
    await doTheDiscountForSelfClient(priceWithDiscount, clientId, price);
  }

  await addUserLog({ action: `ثبت خرید برای مشتری با کد ${clientId}` }, ctx);

  return history
});

export const doTheDiscountForSelfClient = async (discount, clientId, priceOfService) => {

  const client = await db.clients.findFirst({
    where: { id: clientId },
    include: { packageClients: { include: { package: true } } }
  });


  const history = await db.discountHistory.findMany({ where: { clientId }, orderBy: { createdAt: 'desc' }, take: 1 });

  const lastDiscount = history[0];

  if (lastDiscount) {
    const { remain, price } = lastDiscount;
    const maxPayment = client?.packageClients.find(item => item.package.status === "ACTIVE")?.package.maxPayment ?? 0;
    const priceOfServiceByClent = price - priceOfService < 0 ? 0 : price - priceOfService;
    const fromRemain = price >= maxPayment ? maxPayment : priceOfServiceByClent;
    const lastsInRemain = (remain ?? 0) >= maxPayment ? (remain ?? 0) - maxPayment : 0;
    await addToDscountHistory(clientId, fromRemain, lastsInRemain);
    await updateClientAmount(lastsInRemain, clientId);
  }

}

export const addToDscountHistory = async (clientId, amount, remain) => {
  await db.discountHistory.create({
    data: {
      price: amount,
      remain,
      clientId
    }
  });
}

export const updateClientAmount = async (creadit, clientId) => {
  await db.clients.update({
    where: { id: clientId },
    data: { remainDiscountAmount: creadit }
  })
}

export const updateClientCredit = async (clientId, remain = 0, burned = 0, incremental = true) => {
  const updatedClient = await db.clients.update({
    where: { id: clientId }, data: {
      remainDiscountAmount: { ...(incremental ? { increment: remain } : { decrement: remain }) },
      burnedDiscountAmount: { ...(incremental ? { increment: burned } : { decrement: burned }) }
    }
  });

  if (updatedClient.remainDiscountAmount < 0) {
    await db.clients.update({ where: { id: clientId }, data: { remainDiscountAmount: 0 } })
  }
}
