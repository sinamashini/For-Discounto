import { Ctx } from "blitz";
import db, { Prisma } from "db";
import * as z from "zod"

export interface GetPackagesByQuery extends Pick<Prisma.PackagesFindManyArgs, "where" | "select" | "orderBy"> { }

export const GetPackages = z.object({
  query: z.custom<GetPackagesByQuery>()
});


export default async function getPackages(input: z.infer<typeof GetPackages>, { session }: Ctx) {
  await session.$authorize();
  const { query } = GetPackages.parse(input);

  const packages = await db.packages.findMany({
    ...query, include: {level: true},
  });

  return packages;
}
