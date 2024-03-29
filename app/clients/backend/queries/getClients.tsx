import { Ctx } from "blitz";
import db, { Prisma } from "db";
import * as z from "zod"

export interface GetClientsQuery extends Pick<Prisma.ClientsFindManyArgs, "where"> { }

export const GetClients = z.object({
    where: z.custom<GetClientsQuery>()
});


export default async function getClients(input: z.infer<typeof GetClients>, { session }: Ctx) {
    await session.$authorize();
    const { where: conditions } = GetClients.parse(input);

    const clients = await db.clients.findMany({
        where: {
            ...conditions.where,
            isActive: true,
        },
        include: {
            parent: true,
            introduced: { include: { introduced: true } },
            gifts: true,
            discounts: { orderBy: { createdAt: 'desc' } },
            packageClients: { where: { status: "ACTIVE" }, take: 1, include: { package: { include: { level: true } } } },
            _count: { select: { introduced: true } }
        },
        orderBy: [{ id: 'desc' }],
    });

    return clients;
}

