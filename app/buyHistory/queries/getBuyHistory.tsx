import { Ctx, resolver } from "blitz"
import db from "db";

interface Params {
  clientId: number;
}

export default resolver.pipe(async (input: Params, ctx: Ctx) => {
  ctx.session.$authorize();

  const { clientId } = input;

  const history = await db.buyHistory.findMany({ where: { clientId } });

  return history
});
