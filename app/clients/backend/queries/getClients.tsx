import { Ctx, paginate, resolver } from "blitz";
import db, { Prisma } from "db";
import * as z from "zod"

export interface GetClientsQuery extends Pick<Prisma.ClientsFindManyArgs, "where" | "orderBy" | "skip" | "take"> { }

export default resolver.pipe(resolver.authorize(),
    async (input: GetClientsQuery, { session }: Ctx) => {
        await session.$authorize();
        const { where: conditions, skip = 0, take = 100 } = input;
        const { items: clients,
            hasMore,
            nextPage,
            count, } = await paginate({
                skip,
                take,
                count: () => db.clients.count({ where: conditions }),
                query: (paginateArgs) => db.clients.findMany({
                    ...paginateArgs,
                    where: {
                        ...conditions,
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
                })

            });

        return {
            clients,
            nextPage,
            hasMore,
            count,
        };
    }
)