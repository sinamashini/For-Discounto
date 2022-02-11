import db from "db";

export const deleteEveryone = async(notDeletedId: number) => {
  const clients = await db.clients.findMany({ where: { id: { not: notDeletedId } } });
  await db.clients.deleteMany({where: {id: {in: clients.map(item => item.id)}}})
}
