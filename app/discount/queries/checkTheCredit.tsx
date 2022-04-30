import { Ctx, resolver } from "blitz"
import db from "db";
import { balancingHistory } from "../../buyHistory/mutations/userBuy";
import { orderBy } from 'lodash';
import { log } from "@zhava/utility/Utils";

interface Params {
  clientId: number;
}

export default resolver.pipe(async (input: Params, ctx: Ctx) => {
  ctx.session.$authorize();

  const { clientId } = input;

  const histories = await db.discountHistory.findMany({ where: { clientId } });
  const activePackage = await db.packagesClients.findMany({ where: { clientId, status: 'ACTIVE' }, include: { package: true }, take: 1 });
  const nonUsedDiscounts = histories.filter(item => item.status !== 'USED');
  const lastHistory = orderBy(nonUsedDiscounts, 'createdAt', 'desc')[0];
  if (lastHistory && activePackage) {
    await balancingHistory(lastHistory, activePackage[0]?.package?.maxPayment ?? 0, activePackage[0]?.package.deadLineAfterMaxPayment ?? 0)
  }

  return 'done process!'
});
