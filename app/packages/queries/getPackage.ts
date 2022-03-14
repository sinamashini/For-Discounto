import { Ctx, resolver } from "blitz";
import db, { Prisma } from "db";
import * as z from "zod"

export interface GetPackageByQuery extends Pick<Prisma.PackagesFindFirstArgs, "where" | "select"> { }

export const GetPackage = z.object({
  query: z.custom<GetPackageByQuery>()
});


export default resolver.pipe(resolver.zod(GetPackage), resolver.authorize('ADMIN') ,async (input) => {
  const { query } = GetPackage.parse(input);

  const pack = await db.packages.findFirst({
    ...query, include: {level: true},
  });

  return pack;
})
