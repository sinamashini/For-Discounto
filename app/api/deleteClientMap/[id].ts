import { BlitzApiHandler } from "blitz";
import db from "db";

const handler: BlitzApiHandler = async (req, res) => {
  if (req.method === "DELETE") {
    try {
      const { id } = req.query;
      await db.clientsMap.delete({ where: { id: parseInt(id as string) } });
      res.status(200).send("Done!");
    } catch (err) {
      res.status(500).send(err.message);
    }
  } else {
    res.status(500).send("invalid request!")
  }
}

export default handler;
