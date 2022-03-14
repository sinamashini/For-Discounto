import { DeleteGenral } from "@zhava/generalValidation";
import addUserLog from "app/logger/mutations/addUserLog";
import { Ctx, resolver } from "blitz"
import db from "db";

export default resolver.pipe(resolver.zod(DeleteGenral), resolver.authorize('ADMIN'), async (params, ctx: Ctx) => {

  const { id } = params;

  const clients = await db.packagesClients.findMany({ where: { packageId: id } });
  if (clients.length > 0) {
    throw new Error('مشتریانی در حال استفاده از این پکیج هستند لطفا ابتدا پکیج آنها را ویرایش کنید')
  } else {

    await db.packageLevels.deleteMany({ where: { packageId: id } });

    await db.packages.delete({ where: { id } })

    await addUserLog({ action: id + 'پکیج این کد حذف کرد' }, ctx);

    return 'Done!';
  }
});




