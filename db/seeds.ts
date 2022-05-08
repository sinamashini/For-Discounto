// seed scripts should be write there "seedScript/deleteEveryOne" and used here
import { fillingEmptyDb } from "seedScript/fillingEmptyDb";

const seed = async () => {
  await fillingEmptyDb()
}

export default seed

