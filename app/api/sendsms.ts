import { sendSingle } from "app/sms/sendSingle";
import { BlitzApiRequest, BlitzApiResponse } from "blitz"
import db from "db";

const handler = async (req: BlitzApiRequest, res: BlitzApiResponse) => {
  if (req.method === "POST") {
    try {
      const {
        price = "10000",
        receptor = '09125430547',
        parent = '‌سینا‌ماشینی',
        client = "‌‌‌محسن‌نشاط‌دوست"
      } = req.body;

      const name = "‌سینا‌ ماشینی"


      // await sendSingle("discount", receptor, {
      //   token: parent,
      //   token2: client,
      //   token3: `${price}ریال`
      // });

      return res.status(200).send(name.substring(0, name.indexOf(' ')));
    } catch (err) {
      return res.status(500).send("Internal Server Error!");
    }
  } else {
    return res.status(405).send("Method not allowed!");
  }
}
export default handler
