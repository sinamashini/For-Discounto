import addUserLog from "app/logger/mutations/addUserLog";
import { Ctx, resolver } from "blitz"
import db from "db";
import { z } from "zod";
import { AddPackage, EditPackage } from "../validation";


export default resolver.pipe(resolver.zod(AddPackage), resolver.authorize('ADMIN'), async (params, ctx: Ctx) => {

  const { addedPackage } = await addPackageFn(params);
  await addUserLog({ action: addedPackage.id + 'پکیج به نام با این کد ایجاد کرد' }, ctx);

  return addedPackage;
});


export const addPackageFn = async (params: z.infer<typeof AddPackage>, oldId?: number) => {
  const { name, maxPayment, deadLineAfterMaxPayment, levels, version } = params;
  const addedPackage = await db.packages.create({
    data: {
      name,
      maxPayment,
      deadLineAfterMaxPayment,
      ...(version ? {version} : {version: 1}),
      level: { createMany: { data: levels } }
    }
  });
  return {
    addedPackage, ...(oldId ? { oldId } : {})
  }
}



