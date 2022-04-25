import addUserLog from "app/logger/mutations/addUserLog";
import { Ctx, resolver } from "blitz"
import db from "db"
import { UpdateClient } from "../validation"
import { omit } from 'lodash';
import { diffrenceDetctor, updateLevels, updatePackage } from "./update";
import { log } from "@zhava/utility/Utils";

export default resolver.pipe(resolver.zod(UpdateClient), resolver.authorize(), async (input, ctx: Ctx) => {
  try {
    return await db.$transaction(async (db) => {
      const diff = await diffrenceDetctor(input, db);
      const updatedLevel = await updateLevels(diff, db);
      const newInput = await updatePackage(updatedLevel, db);
      const clientToUpdate = omit(newInput.diffrences, 'packageId');
      if (clientToUpdate) {
        const client = await db.clients.update({
          where: { id: input.id },
          data: clientToUpdate,
          include: { introduced: true, parent: true, packageClients: true, gifts: true, _count: { select: { introduced: true } } }
        });
        await addUserLog({ action: `${client.name}و کدملی ${client.nationalCode} ویرایش مشتری با نام`, prisma: db }, ctx);
        return client
      }
    })

  } catch (err) {
    log(err)
    return err.message
  }
})
