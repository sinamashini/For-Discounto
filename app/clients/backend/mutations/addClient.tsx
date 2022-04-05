import { Ctx, resolver, SecurePassword } from "blitz"
import db from "db"
import { AddClient } from "../validation"
import { Clients, StatusEnum } from '@prisma/client';
import addUserLog from "app/logger/mutations/addUserLog";
import { omit } from 'lodash';

const addClient = async (params, ctx) => {
  await ctx.session.$authorize();
  const input = AddClient.parse(params);

  const hashedPassword = await SecurePassword.hash(input.nationalCode.trim());

  const { packageId } = input;

  const addInput = omit(input, packageId);


  const { name, contact, nationalCode, notes, address, parentId, email } = input;

  const addedClient = await db.clients.create({
    data: {
      name, contact, nationalCode, notes, address, parentId, email,
      hashedPassword,
      userId: ctx.session.userId,
    }, include: { introduced: true, parent: true, gifts: true, _count: { select: { introduced: true } } },
  });

  await db.packagesClients.create({ data: { clientId: addedClient.id, packageId, status: "ACTIVE" } })

  //TODO sms

  return addedClient;
}

const addToParentHandler = async (client: Awaited<Promise<ReturnType<typeof addClient>>>, ctx: Ctx) => {
  const clientToUpdate = await addParent(client);
  await addUserLog({ action: 'ثبت مشتری جدید' }, ctx);
  return clientToUpdate;
}

export const addParent = async (client: Awaited<Promise<ReturnType<typeof addClient>>> | Clients) => {
  if (client.parentId) {
    const parents = await db.clientsMap.findMany({ where: { childId: client.parentId } });
    if (parents) {
      await fillMapParents(parents, client);
    }
    await db.clientsMap.create({ data: { level: 1, parentId: client.parentId, childId: client.id, status: "ACTIVE" as StatusEnum } });
  }
  return client;
}



const fillMapParents = async (parents, client) => {
  const addedQuery = parents.map(item => ({ level: item.level + 1, parentId: item.parentId, childId: client.id, status: "ACTIVE" as StatusEnum }))
  await db.clientsMap.createMany({ data: addedQuery });
}


export default resolver.pipe(resolver.zod(AddClient), addClient, addToParentHandler)
