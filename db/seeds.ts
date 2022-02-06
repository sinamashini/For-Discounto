// seed scripts should be write there "seedScript/deleteEveryOne" and used here

import db from "db"

const seed = async () => {
  const clients = await db.clientsMap.findMany({ where: { level: { gt: 1 } } });
  await db.clientsMap.updateMany({ where: { id: { in: clients.map(item => item.id) } }, data: { level: { decrement: 1 } } });
}

export default seed
