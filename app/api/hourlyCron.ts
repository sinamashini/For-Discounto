import { log } from "@zhava/utility/Utils"
import { CronJob } from "quirrel/blitz"

export default CronJob(
    "api/hourlyCron",
    ["0 */2 * * *", "UTC+03:30"],
    async () => {
        const now = new Date();
        log('cron is working!!!!' + ' ' + now);
    }
)
