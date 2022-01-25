import { Ctx } from "blitz"
import db from "db"
import * as zod from "zod"

const GetClient = zod.object({
  id: zod.number(),
})

export default async function getClientById(
  input: zod.infer<typeof GetClient>,
  ctx: Ctx
) {
  await ctx.session.$authorize();

  const data = GetClient.parse(input);

  const client = await db.clients.findFirst({ where: { id: data.id } });

  return client;
}
