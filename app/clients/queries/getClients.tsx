import { Ctx } from "blitz";
import db from "db";
import * as z from "zod"
import { mapStatusOfContact } from "../helpers";


export const GetClients = z.object({
  status: z.string().optional().default('all'),
});

const createWhereQuery = (status: string) => {
  const statusKind = {
    all: {},
    noParent: { parent: null },
    hasParent: { NOT: [{parent: null}] }
  };
  return statusKind[status];
}

export default async function getClients(input: z.infer<typeof GetClients>, { session }: Ctx) {
  await session.$authorize();

  const { status } = GetClients.parse(input);

  const mapedStatus = mapStatusOfContact(status);

  const where = createWhereQuery(mapedStatus);

  const clients = await db.clients.findMany({
    where, include: { parent: true, introduced: true, _count: { select: {introduced: true}} },
    orderBy: [{ id: 'desc' }],
  });

  return clients;
}
