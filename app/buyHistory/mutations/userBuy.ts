import { log } from "@zhava/utility/Utils";
import dateDiffInDays, { addNDays } from "@zhava/utility/dateDiffInDays";
import { extractFirstname } from "app/clients/backend/helpers";
import { updateMapLevel } from "app/clients/backend/mutations/doTheDiscount";
import addUserLog from "app/logger/mutations/addUserLog";
import { sendSingle } from "app/sms/sendSingle";
import { Ctx, resolver } from "blitz"
import db, { DiscountHistory, DiscountHistoryStatus } from "db";
import { DbTransaction } from "types";
import { z } from "zod";
import { AddDiscountHistory } from "../types";
import { AddBuyHiatory, ParentWithPrice } from "../validation"

const updateClientBuyHistory = async (parentWithPrice: z.infer<typeof ParentWithPrice>, prisma: DbTransaction) => {
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
        const { maxPayment, deadLineAfterMaxPayment } = clientPackage.package;

        let statusToAdd = 'ACTIVE' as DiscountHistoryStatus;
        let endDateToAdd: Date | null = null;
        let remainPresent = 0;
        let amount = 0;

        if (lastDiscount) {
          const { price, remain, endDate, status } = lastDiscount;

          const priceToAdd = price + parent.discount >= maxPayment ? maxPayment : price + parent.discount;
          remainPresent = price + parent.discount - maxPayment < 0 ? 0 : price + parent.discount - maxPayment;
          remainPresent = remainPresent + (remain ?? 0);
          amount = priceToAdd;
          endDateToAdd = endDate ?? null;

          statusToAdd = adjustStatus({
            price: priceToAdd,
            maxPayment,
            status,
          })
        }
        else {
          const priceToPay = parent.discount > maxPayment ? maxPayment : parent.discount;
          remainPresent = parent.discount > maxPayment ? parent.discount - maxPayment : 0;
          amount = priceToPay;

          statusToAdd = adjustStatus({
            price: priceToPay,
            maxPayment,
            status: "ACTIVE",
          });

          endDateToAdd = statusToAdd === "REACHED_MAX" ? addNDays(new Date(), deadLineAfterMaxPayment ?? 1) : null;
        }

        await addToDscountHistory({
          clientId: parent.id,
          amount,
          remain: remainPresent,
          prisma,
          endDate: endDateToAdd,
          status: statusToAdd!
        })

        await updateClientCredit(parent.id, parent.discount, prisma);
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

      await addUserLog({ action: `ثبت خرید برای مشتری با کد ${clientId}`, prisma: db }, ctx);

      await smsHandler(clientId, parentWithPrice, db);

      return history
    })
  } catch (err) {
    log(err);
  }
});

export const doTheDiscountForSelfClient = async (discount, clientId, priceOfService, prisma: DbTransaction) => {

  const client = await prisma.clients.findFirst({
    where: { id: clientId },
    include: { packageClients: { include: { package: true } } }
  });



  const history = await prisma.discountHistory.findMany({ where: { clientId }, orderBy: { createdAt: 'desc' }, take: 1 });

  const lastDiscount = history[0];
  if (lastDiscount) {
    const { remain, price, endDate } = lastDiscount;
    const maxPayment = client?.packageClients.find(item => item.package.status === "ACTIVE")?.package.maxPayment ?? 0;
    const priceOfServiceByClent = price - priceOfService < 0 ? 0 : price - priceOfService;
    const fromRemain = price >= maxPayment ? maxPayment : priceOfServiceByClent;
    const lastsInRemain = (remain ?? 0) >= maxPayment ? (remain ?? 0) - maxPayment : 0;


    await addToDscountHistory({
      clientId,
      amount: fromRemain,
      remain: lastsInRemain,
      prisma,
      status: "USED",
      endDate
    });

    await addToDscountHistory({
      clientId,
      amount: fromRemain,
      remain: lastsInRemain,
      prisma,
      status: "ACTIVE",
    });


    await updateClientAmount(lastsInRemain, clientId, prisma);
  }

}



export const addToDscountHistory = async (params: AddDiscountHistory) => {
  const { clientId, amount, remain, prisma, } = params;

  await prisma.discountHistory.create({
    data: {
      price: amount,
      remain,
      clientId
    }
  });
}

export const updateClientAmount = async (creadit, clientId, prisma: DbTransaction) => {
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

export const smsHandler = async (clientId, parentWithPrice, prisma) => {
  const prismaDb = prisma ?? db;

  const parents = await prismaDb.clients.findMany({ where: { id: { in: parentWithPrice.map(item => item.id) } } });
  const client = await prismaDb.clients.findUnique({ where: { id: clientId } });

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


export const balancingHistory = async (history: DiscountHistory, maxPayment: number, numberOfDays: number, prisma?: DbTransaction,) => {
  const prismaDb = prisma ? prisma : db;
  const { endDate, status, clientId } = history;
  if (status === "REACHED_MAX" && endDate) {
    const now = new Date();
    const diffDays = dateDiffInDays(now, endDate);

    if (diffDays < 0) {
      const isRemainBiggerthanMaxPayment = history.remain! > maxPayment;
      const newPrice = isRemainBiggerthanMaxPayment ? maxPayment : history.remain!;
      const newRemain = isRemainBiggerthanMaxPayment ? history.remain! - maxPayment : 0;
      const newStatus = newPrice === maxPayment ? 'REACHED_MAX' : 'ACTIVE';
      const newEndDate = newStatus === 'REACHED_MAX' ? addNDays(new Date(), numberOfDays) : null;

      await prismaDb.clients.update({ where: { id: clientId }, data: { burnedDiscountAmount: { increment: maxPayment }, remainDiscountAmount: { decrement: maxPayment } } })
      await prismaDb.discountHistory.createMany({
        data: [{
          clientId,
          price: 0,
          remain: history.remain!,
          status: "BURNED",
          endDate
        }, {
          clientId,
          price: newPrice,
          remain: newRemain,
          status: newStatus,
          endDate: newEndDate
        }]
      })
    }
  }
}

interface AdjustStatus {
  price: number;
  maxPayment: number;
  status: DiscountHistoryStatus;
}

export const adjustStatus = (input: AdjustStatus): DiscountHistoryStatus => {
  const { price, maxPayment, status } = input
  const statusToAdd = price === maxPayment ? "REACHED_MAX" : status;
  return statusToAdd;
}
