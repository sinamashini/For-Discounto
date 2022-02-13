import { Ctx } from "blitz";
import db, { Prisma } from "db";
import * as z from "zod"

export interface GetUsersQuery extends Pick<Prisma.UserFindManyArgs, "where" | "select" | "include" | "orderBy"> { }

export default async function getAllUsers(input: GetUsersQuery, { session }: Ctx) {
  await session.$authorize();

  const clients = await db.user.findMany({
    ...input
  });

  return clients;
}
