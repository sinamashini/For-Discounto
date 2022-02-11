import addUserLog from "app/logger/mutations/addUserLog";
import { sendSingle } from "app/sms/sendSingle";
import { resolver, SecurePassword } from "blitz"
import db from "db"
import { UpdateClient } from "../validation"
import { addParent } from "./addClient";
import { updateParent } from "./deleteClient";


const updateLevels = async (input) => {
  const currentlient = await db.clients.findFirst({ where: { id: input.id } });
  if (currentlient && currentlient.parentId !== input.AddClient.parentId) {
    const { id } = await updateParent(input.id);
    await db.clientsMap.deleteMany({ where: { parentId: input.id, childId: input.id } })
    const updatedClient = await addParent(input.AddClient);
  }
  return input;
}

// input = { email, name, contact, nationalCode, parentId, notes, address }
export default resolver.pipe(resolver.zod(UpdateClient), updateLevels, async (input, ctx) => {
  await ctx.session.$authorize();

  const client = await db.clients.update({
    where: { id: input.id },
    data: input.AddClient,
    include: { introduced: true, parent: true, gifts: true, _count: { select: { introduced: true } } }
  });

  await addUserLog({ action: `${client.name}و کدملی ${client.nationalCode} ویرایش مشتری با نام` }, ctx);

  // sendSingle('thanks', client.contact, { token: client.name });

  return client
})
