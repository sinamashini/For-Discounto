import addUserLog from "app/logger/mutations/addUserLog";
import { Ctx, resolver } from "blitz"
import db from "db";
import { EditPackage } from "../validation";
import { addPackageFn } from "./addPackage";
import { omit, pick } from 'lodash';
import { z } from "zod";
import { Packages, PackageLevels } from '@prisma/client'

export const updateUsersPackge = async ({ addedPackage, oldId }) => {
  await db.packagesClients.updateMany({ where: { packageId: oldId }, data: { packageId: addedPackage.id } });
  return addedPackage;
}

export default resolver.pipe(resolver.zod(EditPackage), resolver.authorize('ADMIN'), async (params, ctx: Ctx) => {
  const usersUsed = await db.clientsMap.findMany({
    where: { AND: { status: "USED", parent: { packageClients: { some: { packageId: params.id } } } } },
  });

  if (usersUsed?.length > 0) {
    await versioningThePackage(params, ctx);
  } else {
    await editedPackage(params, ctx)
  }
});

const generateNewVersion = async(params: z.infer<typeof EditPackage>) => {
  const findedPackage = await db.packages.findUnique({ where: { id: params.id } });
  const version = findedPackage?.version ? findedPackage?.version + 1 : 1;
  return { ...params, version };
};

export const updateTheOldPackageStatus = async(params: z.infer<typeof EditPackage>) => {
  await db.packages.update({ where: { id: params.id }, data: { status: 'ARCHIVE' } });
  return params;
}

export const versioningThePackage = resolver.pipe(resolver.zod(EditPackage), generateNewVersion, updateTheOldPackageStatus, addPackageFn, updateUsersPackge);


export interface UpdateLevelsProps {
  editedPackage: Packages & {
    level: PackageLevels[];
  };
  params: z.infer<typeof EditPackage>
}

export const updateLevels = async (input: UpdateLevelsProps, ctx) => {
  const { editedPackage, params } = input;
  const { levels, id } = params;

  if (levels.length > 0) {
    const levelsAreSame = editedPackage.level.length === levels.length && editedPackage.level.every((value, index) => value === levels[index]);
    if (!levelsAreSame) {
      await db.packageLevels.deleteMany({ where: { packageId: id } });
      await db.packageLevels.createMany({ data: levels.map(item  => ({ packageId: id, ...item }))});
    }
  }

  await addUserLog({ action: editedPackage.id + 'پکیج باین کد ورا ویرایش کرد' }, ctx);

  return editedPackage;
}

export const editedPackage = resolver.pipe(resolver.zod(EditPackage), async(params, ctx) => {
  const { name, maxPayment, deadLineAfterMaxPayment, id } = params;
  const editedPackage = await db.packages.update({
    where: { id },
    data: {
      name,
      maxPayment,
      deadLineAfterMaxPayment,
    },
    include: { level: true },
  });

  return { editedPackage, params };
}, updateLevels);


