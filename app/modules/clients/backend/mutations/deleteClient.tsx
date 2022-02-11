import { DeleteGenral } from "@zhava/generalValidation";
import { resolver, SecurePassword } from "blitz"
import db from "db"

export const updateParent = async ({ id }) => {
  const clientGoingToDelete = await db.clients.findFirst({ where: { id } });
  if (clientGoingToDelete?.parentId) {
    await db.clientsMap.updateMany({ where: { parentId: id, level: 1 }, data: { parentId: clientGoingToDelete.parentId } })
    const children = await db.clientsMap.findMany({ where: { parentId: id } })
    await db.clientsMap.updateMany({ where: { childId: { in: children.map(item => item.id) } }, data: { level: { decrement: 1 } } })
  } else {
    await db.clientsMap.updateMany({ where: { parentId: id }, data: { parentId: null } });
  }
  return { id }
}

// input = { email, name, contact, nationalCode, parentId, notes, address }
export default resolver.pipe(resolver.zod(DeleteGenral), updateParent, async ({ id }, ctx) => {
  await ctx.session.$authorize();

  await db.clients.delete({ where: { id } });

  return 'Done!';
})



