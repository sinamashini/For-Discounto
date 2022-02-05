import db from "./index"

const seed = async () => {
  const clients = await db.clients.findMany({include: {discounts: {where: {status: 'ACTIVE'}}}});

  // for (let i = 0; i < clients.length; ++i) {
  //   if (clients[i]?.discounts) {
  //     const childs = clients[i]?.numberOfIndirectSubPeople! + clients[i]?.numberOfDiectSubPeople!;
  //     const allDiscount = childs * clients[i]?.discounts[0]?.discountPercent!;
  //     const legalDis = clients[i]?.discounts[0]?.discountPercent! * clients[i]?.discounts[0]?.numberOfIncludedPeople!;
  //     await db.clients.update({ where: { id: clients[i]?.id }, data: { currentDiscount: allDiscount > legalDis ? legalDis: allDiscount } })
  //   }
  // }

}

export default seed
