import addUserLog from "app/logger/mutations/addUserLog";
import { sendSingle } from "app/sms/sendSingle";
import { resolver, SecurePassword } from "blitz"
import db from "db"
import { UpdateClient } from "../validation"
import { addParent } from "./addClient";
import { updateParent } from "./deleteClient";
import { omit } from 'lodash';

const updateLevels = async (input) => {
  const currentlient = await db.clients.findFirst({ where: { id: input.id } });
  if (currentlient && currentlient.parentId !== input.AddClient.parentId) {
    const { id } = await updateParent(input.id);
    await db.clientsMap.deleteMany({ where: { parentId: input.id, childId: input.id } })
    await addParent(input.AddClient);
  }
  return input;
}

// input = { email, name, contact, nationalCode, parentId, notes, address }
export default resolver.pipe(resolver.zod(UpdateClient), updateLevels, async (input, ctx) => {
  await ctx.session.$authorize();

  const { packageId } = input.AddClient;

  const updateInput = omit(input.AddClient, packageId);

  const packageClientUpdate = await db.packagesClients.findFirst({ where: { clientId: input.id } });

  if (!packageClientUpdate) {
    await db.packagesClients.create({ data: { clientId: input.id, packageId, status: "ACTIVE" } });
  }

  const { name, contact, nationalCode, notes, address, parentId, email } = input.AddClient;

  const client = await db.clients.update({
    where: { id: input.id },
    data: { name, contact, nationalCode, notes, address, parentId, email },
    include: { introduced: true, parent: true, gifts: true, _count: { select: { introduced: true } } }
  });

  await addUserLog({ action: `${client.name}و کدملی ${client.nationalCode} ویرایش مشتری با نام` }, ctx);

  // sendSingle('thanks', client.contact, { token: client.name });

  return client
})
