import db from "db";

export const addClientToPackage = async () => {
  const packagesToAdd = await db.packages.create({
    data: {
      name: 'معمولی',
      deadLineAfterMaxPayment: 30,
      maxPayment: 1000000,
      version: 1,
      numberOfPeopleIncluded: 5,
      status: 'ACTIVE',
      level: {
        createMany: {
          data: [
            { levelNumber: 1, percent: 5 },
            { levelNumber: 2, percent: 3 },
            { levelNumber: 3, percent: 2 }]
        }
      }
    }
  });
  const clients = await db.clients.findMany({});
  const dataToAddPackageClients = clients.map(client => ({ clientId: client.id, packageId: packagesToAdd.id }))
  db.packagesClients.createMany({ data: dataToAddPackageClients });
}
