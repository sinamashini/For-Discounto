// seed scripts should be write there "seedScript/deleteEveryOne" and used here
import { addClientToPackage } from "seedScript/addClientAndPackage"

const seed = async () => {
  await addClientToPackage()
}

export default seed
