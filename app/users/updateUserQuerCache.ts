import { fetchStart, fetchSuccess } from "app/redux/actions";
import { setQueryData } from "blitz"
import { Role } from "types";
import getAllUsers from "./queries/getAllUsers";

const createQeryParams = (qs) => {
  const { keyword, role } = qs;
  return  {where: {
    ...(role !== 'all' && { role: role as Role }),
    ...(keyword && {
      OR: [
        { name: keyword, },
        { nationalCode: keyword },
        { contact: keyword },
        { email: keyword }]
    })
  }
   }
}

export const addToUsersCache = async (qs, dataToUpdate) => {
  const params = createQeryParams(qs)
   await setQueryData(getAllUsers, params, (oldData =>
    oldData ? [...oldData, dataToUpdate]: [dataToUpdate]))
}

export const updateCacheAfterDelete = async (qs, id) => {
  const params = createQeryParams(qs)
  await setQueryData(getAllUsers, params, (oldData =>
   oldData ? oldData.filter(data => data.id !== id): []))
}


