import addUserLog from "app/logger/mutations/addUserLog";
import { resolver, Ctx } from "blitz";
import db from "db";
import { z } from "zod";
import { ConfirmDiscount } from "../validation";


const updateMapLevel = async ({ parentIds, clientId, price }: z.infer<typeof ConfirmDiscount>) => {
  await db.clientsMap.updateMany({
    where: {
      AND: [
        { parentId: { in: parentIds } },
        { childId: clientId }
      ]
    },
    data: { status: "USED" }
  });
  return { parentIds, clientId, price };
}

export default resolver.pipe(resolver.zod(ConfirmDiscount), resolver.authorize(), updateMapLevel);
