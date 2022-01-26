import { Ctx } from "blitz"
import db from "db"
import * as zod from "zod"
import { GetClientId } from "../validation";


export default async function getClientById(
  input: zod.infer<typeof GetClientId>,
  ctx: Ctx
) {
  await ctx.session.$authorize();

  const data = GetClientId.parse(input);

  const client = await db.clients.findFirst({ where: { id: data.id } });

  return client;
}
