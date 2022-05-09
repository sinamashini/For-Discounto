import db from "db";

export const addClientToPackage = async () => {
  const clients = await db.clients.findMany({});
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
      },
      packageClients: {

        createMany: {
          data:  clients.map(client => ({ clientId: client.id, packageId: packagesToAdd.id }))
        }
      },
    }
  });
}
