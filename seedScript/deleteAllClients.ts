import db from "db";

export const deleteAllClients = async () => {
  await db.clientsMap.deleteMany({});
  await db.packagesClients.deleteMany({});
  await db.buyHistory.deleteMany({});
  await db.discountHistory.deleteMany({});
  await db.clients.deleteMany({});
}
