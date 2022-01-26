import db from "./index"

const seed = async () => {

  const packageResult = await db.package.create({
    data: {
      name: 'معمولی',
      discountOfEachLevelByPercent: 5,
      numberOfNesting: 3,
      createdAt: new Date()
    }
  });

  //   await db.user.create({
//     data: {
//       name: 'پریسا مدیر', email: 'parisa@yahoo.com', hashedPassword: parisaHashed, role: "Admin"
//     }
//   });

  const clients = await db.clients.findMany({});
  await db.packageClient.createMany({
    data: clients.map(client => ({
      packageId: packageResult.id,
      clientId: client.id,
      discountOfEachLevelByPercent: 5,
      numberOfNesting: 3,
    }))
  })

}

export default seed
