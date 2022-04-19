// seed scripts should be write there "seedScript/deleteEveryOne" and used here

import { deleteAllClients } from "seedScript/deleteAllClients";


const seed = async () => {
  await deleteAllClients();
}

export default seed
