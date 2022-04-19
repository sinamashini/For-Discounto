import addUserLog from "app/logger/mutations/addUserLog";
import { Ctx, resolver } from "blitz"
import db from "db"
import { UpdateClient } from "../validation"
import { omit } from 'lodash';
import { diffrenceDetctor, updateLevels, updatePackage } from "./update";

export default resolver.pipe(resolver.zod(UpdateClient), resolver.authorize(), diffrenceDetctor, updateLevels, async (input, ctx: Ctx) => {
  const clientToUpdate = omit(input.diffrences, 'packageId');
  if (clientToUpdate) {

    const client = await db.clients.update({
      where: { id: input.id },
      data: clientToUpdate,
      include: { introduced: true, parent: true, packageClients: true, gifts: true, _count: { select: { introduced: true } } }
    });

    await addUserLog({ action: `${client.name}و کدملی ${client.nationalCode} ویرایش مشتری با نام` }, ctx);
    return client
  }
})
