import { Ctx } from "blitz";
import db, { Prisma } from "db";
import * as z from "zod"

export interface GetClientsByQuery extends Pick<Prisma.ClientsFindManyArgs, "where" | "select" | "include" | "orderBy"> { }

export const GetClients = z.object({
  query: z.custom<GetClientsByQuery>()
});


export default async function getClientByQuery(input: z.infer<typeof GetClients>, { session }: Ctx) {
  await session.$authorize();
  const { query } = GetClients.parse(input);

  const clients = await db.clients.findMany({
    ...query
  });

  return clients;
}
