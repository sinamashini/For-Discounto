import { createWhereQuery, mapStatusOfContact } from "app/clients/backend/helpers";
import getClients, { GetClientsQuery } from "app/clients/backend/queries/getClients";
import { useQuery, useRouter } from "blitz";

const createSearchQueryForClient = (keyword: string): GetClientsQuery => {
  return {
    where: {
      isActive: true,
      OR: [
        { nationalCode: { contains: keyword } },
        { name: { contains: keyword } },
        { contact: { contains: keyword } },
      ]
    }
  }
}

export const useGetClient = ({ enabled = true }) => {
  const { query } = useRouter();

  const { status = "all", keyword = "" } = query;


  const mapedStatus = mapStatusOfContact(status as string);

  const conditions = createWhereQuery(mapedStatus);

  const where = createSearchQueryForClient(keyword as string)

  const [result, { setQueryData, isFetching, isLoading, refetch, error }] = useQuery(getClients, {
    where: {
      where: {
        ...where.where,
        ...conditions
      }
    }
  }, { enabled })

  return { result, setQueryData, isLoading, isFetching, refetch, error }
}
