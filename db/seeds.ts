// seed scripts should be write there "seedScript/deleteEveryOne" and used here
import addClients from "seedScript/addClients";
import { addAdminUser } from "seedScript/addUsers";

const seed = async () => {
  await addAdminUser()
}

export default seed
