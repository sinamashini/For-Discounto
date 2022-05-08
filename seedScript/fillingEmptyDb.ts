import { addClientToPackage } from "./addClientAndPackage";
import addClients from "./addClients";
import { addAdminUser } from "./addUsers";

export const fillingEmptyDb = async() => {
  await addAdminUser();
  await addClients();
  await addClientToPackage();
}
