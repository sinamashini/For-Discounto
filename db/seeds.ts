// seed scripts should be write there "seedScript/deleteEveryOne" and used here
import addClients from "seedScript/addClients";

const seed = async () => {
  await addClients()
}

export default seed
