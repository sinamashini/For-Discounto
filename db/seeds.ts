import { SecurePassword } from "blitz"
import db from "./index"

// const clients = [
//   { name: 'سینا ماشینی', email: "sina.mashini1993@gmail.com", nationalCode: '0015443523', contact: '09125430547', notes: '' },
//   // { name: 'رضا اصغری', email: "sina2@gmail.com", nationalCode: '00154435233', contact: '0912555430547', notes: '' },
//   // { name: 'کریم عشقی', email: "sina3@gmail.com", nationalCode: '00154435223', contact: '09121225430547', notes: '' },
//   // { name: 'عباس قلی حسنوند', email: "sina4@gmail.com", nationalCode: '00154435423', contact: '09125423430547', notes: '' },
//   // { name: 'فاطمه درود گر', email: "sina5@gmail.com", nationalCode: '001544356623', contact: '0912235430547', notes: '' },
//   // { name: 'رضا شوکت منش', email: "sin6a@gmail.com", nationalCode: '001544322523', contact: '0912512430547', notes: '' },
//   // { name: 'نرگس الهیار', email: "sin12a@gmail.com", nationalCode: '001544344523', contact: '0912544330547', notes: ''}
// ]

/*
 * This seed function is executed when you run `blitz db seed`.
 *
 * Probably you want to use a library like https://chancejs.com
 * or https://github.com/Marak/Faker.js to easily generate
 * realistic data.
 */
// const seed = async () => {
//   const hashedMeysamPassword = await SecurePassword.hash('meysam123!@');
//   const parisaHashed = await SecurePassword.hash('parisa123!@');

//   await db.user.create({
//     data: {
//       name: 'میثم یعقوب زاده', email: 'meysam@yahoo.com', hashedPassword: hashedMeysamPassword, role: "Admin"
//     }
//   });

//   await db.user.create({
//     data: {
//       name: 'پریسا مدیر', email: 'parisa@yahoo.com', hashedPassword: parisaHashed, role: "Admin"
//     }
//   });

// }

const seed = async () => {

  const packageResult = await db.package.create({
    data: {
      name: 'معمولی',
      discountOfEachLevelByPercent: 5,
      numberOfNesting: 3,
      createdAt: new Date()
    }
  });

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
