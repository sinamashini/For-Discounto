// seed scripts should be write there "seedScript/deleteEveryOne" and used here

import db from "db"

const seed = async () => {
  await db.packagesClients.deleteMany({ where: { packageId: 2 } });
  await db.packageLevels.deleteMany({where: { packageId: 2 } });
  await db.packages.delete({ where: { id: 2 } });
}

export default seed
