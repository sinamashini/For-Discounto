import { Ctx } from "blitz"
import db from "db"
import * as zod from "zod"
import { GetClientId } from "../validation";

const levelOfNestig = 10;

export default async function getNestedClientById(
  input: zod.infer<typeof GetClientId>,
  ctx: Ctx
) {
  await ctx.session.$authorize();

  const { id } = GetClientId.parse(input);

  const includes = assign({}, true);

  const client = await db.clients.findUnique({
    where: { id }, include: { introduced: { include: { introduced: true } } }
  });

  return { client, includes }
}

const createKeyPath = () => {
  let keyPath: string[] = [];
  for (let i = 0; i < levelOfNestig; i++){
    const key = i % 2 === 0 ? 'include' : 'introduced';
    keyPath.push(key);
  }
  return keyPath;
}

const assign = (obj, value) => {
  const keyPath = createKeyPath();
  for (var i = 0; i < levelOfNestig; ++i) {
    let key = keyPath[i];
    if (!(key! in obj)){
      obj[key!] = {}
    }
    obj = obj[key!];
  }
  obj[keyPath[levelOfNestig - 1]!] = value;
  return { ...obj };
}
