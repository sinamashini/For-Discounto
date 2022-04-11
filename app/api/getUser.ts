import { BlitzApiRequest, BlitzApiResponse } from "blitz"
import db from "db";

const handler = async (req: BlitzApiRequest, res: BlitzApiResponse) => {
  if (req.method === "GET") {
    try {
      const users = await db.user.findMany({});
      return res.status(200).send(users);
    } catch (err) {
      return res.status(500).send("Internal Server Error!");
    }
  } else {
    return res.status(405).send("Method not allowed!");
  }
}
export default handler
