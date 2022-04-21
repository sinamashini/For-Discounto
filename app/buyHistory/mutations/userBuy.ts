import { extractFirstname } from "app/clients/backend/helpers";
import doTheDiscount, { updateMapLevel } from "app/clients/backend/mutations/doTheDiscount";
import addUserLog from "app/logger/mutations/addUserLog";
import { sendSingle } from "app/sms/sendSingle";
import { Ctx, resolver } from "blitz"
import db from "db";
import { z } from "zod";
import { AddBuyHiatory, ParentWithPrice } from "../validation"

const updateClientBuyHistory = async (parentWithPrice: z.infer<typeof ParentWithPrice>, prisma) => {
  if (parentWithPrice?.length) {
    for (const parent of parentWithPrice) {
      const history = await prisma.discountHistory.findMany({ where: { clientId: parent.id }, orderBy: { createdAt: 'desc' }, take: 1 });
      const lastDiscount = history[0];
      const clientPackage = await prisma.packagesClients.findFirst({
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
          await addToDscountHistory(parent.id, priceToAdd, remainPresent + (remain ?? 0), prisma)
          await updateClientCredit(parent.id, parent.discount, prisma)
        }
        else {
          const priceToPay = parent.discount > maxPayment ? maxPayment : parent.discount;
          const remain = parent.discount > maxPayment ? parent.discount - maxPayment : 0;
          await addToDscountHistory(parent.id, priceToPay, remain, prisma);
          await updateClientCredit(parent.id, parent.discount, prisma);
        }
      }
    }
  }
}

export default resolver.pipe(resolver.zod(AddBuyHiatory), async (params, ctx: Ctx) => {
  ctx.session.$authorize();
  try {
    await db.$transaction(async (db) => {
      const { clientId, price, description, clientIds, priceWithDiscount, parentWithPrice } = params;

      if (clientIds) {
        await updateMapLevel({ clientId, parentIds: clientIds, price }, db)
      }

      const history = await db.buyHistory.create({ data: { clientId, price, description, priceWithDiscount } });

      if (parentWithPrice) {
        await updateClientBuyHistory(parentWithPrice, db);
      }
      if (params.priceWithDiscount !== params.price) {
        await doTheDiscountForSelfClient(priceWithDiscount, clientId, price, db);
      }

      await addUserLog({ action: `ثبت خرید برای مشتری با کد ${clientId}` }, ctx);

      await smsHandler(clientId, parentWithPrice)

      return history
    })
  } catch (err) {

  }
});

export const doTheDiscountForSelfClient = async (discount, clientId, priceOfService, prisma) => {

  const client = await prisma.clients.findFirst({
    where: { id: clientId },
    include: { packageClients: { include: { package: true } } }
  });


  const history = await prisma.discountHistory.findMany({ where: { clientId }, orderBy: { createdAt: 'desc' }, take: 1 });

  const lastDiscount = history[0];

  if (lastDiscount) {
    const { remain, price } = lastDiscount;
    const maxPayment = client?.packageClients.find(item => item.package.status === "ACTIVE")?.package.maxPayment ?? 0;
    const priceOfServiceByClent = price - priceOfService < 0 ? 0 : price - priceOfService;
    const fromRemain = price >= maxPayment ? maxPayment : priceOfServiceByClent;
    const lastsInRemain = (remain ?? 0) >= maxPayment ? (remain ?? 0) - maxPayment : 0;
    await addToDscountHistory(clientId, fromRemain, lastsInRemain, prisma);
    await updateClientAmount(lastsInRemain, clientId, prisma);
  }

}

export const addToDscountHistory = async (clientId, amount, remain, prisma) => {
  await prisma.discountHistory.create({
    data: {
      price: amount,
      remain,
      clientId
    }
  });
}

export const updateClientAmount = async (creadit, clientId, prisma) => {
  await prisma.clients.update({
    where: { id: clientId },
    data: { remainDiscountAmount: creadit }
  })
}

export const updateClientCredit = async (clientId, remain = 0, prisma, burned = 0, incremental = true) => {
  const updatedClient = await prisma.clients.update({
    where: { id: clientId }, data: {
      remainDiscountAmount: { ...(incremental ? { increment: remain } : { decrement: remain }) },
      burnedDiscountAmount: { ...(incremental ? { increment: burned } : { decrement: burned }) }
    }
  });

  if (updatedClient.remainDiscountAmount < 0) {
    await prisma.clients.update({ where: { id: clientId }, data: { remainDiscountAmount: 0 } })
  }
}

export const smsHandler = async (clientId, parentWithPrice) => {
  const parents = await db.clients.findMany({ where: { id: { in: parentWithPrice.map(item => item.id) } } });
  const client = await db.clients.findUnique({ where: { id: clientId } });
  if (parents?.length) {
    for (const parent of parents) {
      await sendSingle("discount", parent.contact, {
        token: extractFirstname(parent.name),
        token2: `${parentWithPrice.find(item => item.id === parent.id).discount}`,
        token3: client?.name,
      });
    }
  }

}

export const maxPaymentRecived = async (parents: number[]) => {
  // const parentPackage = await db.packagesClients.findMany({
  //   where: {
  //     AND: [{
  //       clientId: { in: parentWithPrice.map(item => item.id) }
  //     },
  //     {
  //       status: "ACTIVE"
  //     }
  //     ]
  //   },
  //   include: { package: true }
  // })

  // const clientsPackageDuration = parentPackage.map(item => ({ parentId: item.clientId, duration: item.package.deadLineAfterMaxPayment }));

  const history = await db.discountHistory.findMany({})
}
