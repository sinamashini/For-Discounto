// seed scripts should be write there "seedScript/deleteEveryOne" and used here
import db from "db";
import addClients from "seedScript/addClients";
import { addAdminUser } from "seedScript/addUsers";

const seed = async () => {
  await db.clientsMap.deleteMany({});
  await db.packagesClients.deleteMany({});
  await db.buyHistory.deleteMany({});
  await db.discountHistory.deleteMany({});
  await db.clients.deleteMany({});
  await db.packageLevels.deleteMany({ where: { packageId: 1 } });
  await db.packages.delete({ where: { id: 1 } })
}

export default seed
