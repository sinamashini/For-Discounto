import db, { Prisma } from "db";
import { paginate, resolver } from "blitz"

interface GetClientsQuery extends Pick<Prisma.ClientsFindManyArgs, "where" | "orderBy" | "skip" | "take"> { }

export default resolver.pipe(resolver.authorize(), async ({ where, orderBy, skip = 0, take = 100 }: GetClientsQuery) => {
  const {
    items: clients,
    hasMore,
    nextPage,
    count,
  } = await paginate({
    skip,
    take,
    count: () => db.clients.count({ where }),
    query: (paginateArgs) => db.clients.findMany({
      ...paginateArgs, where, orderBy, include: {
        parent: true,
        introduced: true,
        gifts: true,
      }
    })
  })

  return {
    clients,
    hasMore,
    nextPage,
    count,
  }

});
