import { sendSingle } from "app/sms/sendSingle"
import { CronJob } from "quirrel/blitz"

export default CronJob(
  "api/hourlyCron",
  "*/1 * * * *",
  async () => {
    // await sendSingle("discount", '09125430547', {
    //   token: 'سینا',
    //   token2: '100000',
    //   token3: 'لوکال'
    // })
  }
)
