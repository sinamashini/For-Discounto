import getCurrentUser from "app/users/queries/getCurrentUser";
import { useQuery, useMutation } from "blitz";
import logout from "app/auth/mutations/logout"

export const useAuthUser = () => {
  const [user, {isLoading}] = useQuery(getCurrentUser, null)
  return { user, isLoading, isAuthenticated: user !== undefined}
};

export const useAuthMethod = () => {
  const [logoutMutation] = useMutation(logout);
  return {
    logout: logoutMutation
  };
};
