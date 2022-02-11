import { resolver } from "blitz"
import db, {Prisma} from "db"

export interface GetMapClientsQuery extends Pick<Prisma.ClientsMapFindManyArgs, "where" | "include" | "orderBy" | "skip" | "take"> { }

export default resolver.pipe(async (input: GetMapClientsQuery, ctx) => {
  await ctx.session.$authorize();

  const realtedClients = await db.clientsMap.findMany({ ...input });

  return realtedClients;
})



