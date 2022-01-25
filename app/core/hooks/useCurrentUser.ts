import { useQuery } from "blitz"
import getCurrentUser from "app/users/queries/getCurrentUser"

export const useCurrentUser = () => {
  const [user, {isLoading}] = useQuery(getCurrentUser, null)
  return { user, isLoading }
}
