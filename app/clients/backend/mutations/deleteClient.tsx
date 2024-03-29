import { DeleteGenral } from "@zhava/generalValidation";
import { resolver, SecurePassword } from "blitz"
import db from "db"

export const updateParent = async ({ id }) => {
  const clientGoingToDelete = await db.clients.findFirst({ where: { id } });
  if (clientGoingToDelete?.parentId) {
    await db.clientsMap.updateMany({ where: { AND: [{ parentId: id }, { level: 1 }] }, data: { parentId: clientGoingToDelete.parentId } })
    const children = await db.clientsMap.findMany({ where: { parentId: id } })
    await db.clients.updateMany({ where: { parentId: id }, data: { parentId: clientGoingToDelete.parentId } })
    await db.clientsMap.updateMany({ where: { childId: { in: children.map(item => item.id) } }, data: { level: { decrement: 1 } } })
  } else {
    await db.clientsMap.deleteMany({ where: { parentId: id } });
    await db.clients.updateMany({ where: { parentId: id }, data: { parentId: null } })
  }
  return { id }
}
export default resolver.pipe(resolver.zod(DeleteGenral), updateParent, async ({ id }, ctx) => {
  await ctx.session.$authorize();

  await db.clients.update({ where: { id }, data: { isActive: false } });

  return 'Done!';
});

