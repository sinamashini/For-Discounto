import { BlitzApiHandler } from "blitz";
import db from "db";

const handler: BlitzApiHandler = async (req, res) => {
  if (req.method === "GET") {
    const { childId, parentId } = req.query;
      // const parents = await db.clientsMap.findMany({include: {parent: true}});
    const whereObj = {
      ...(childId && { childId: parseInt(childId as string, 10) }),
      ...(parentId && { parentId: parseInt(parentId as string, 10) })
    }
    const childs = await db.clientsMap.findMany({
      where: whereObj,
      include: { child: { select: { name: true } }, parent: { select: { name: true } } }
    });
      res.send({ childs });
  } else {
    res.status(500).send("invalid request!")
  }
}

export default handler;
