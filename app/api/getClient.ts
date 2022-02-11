import { BlitzApiHandler } from "blitz";
import db from "db";

const handler: BlitzApiHandler = async (req, res) => {
  try {
    const { clientId = '1' } = req.query;
    const history = await db.discountHistory.findMany({ where: { clientId: parseInt(clientId as string) } });
    res.status(200).send(history);
  } catch (err) {
    res.status(500).send(err.message);
  }
}

export default handler;
