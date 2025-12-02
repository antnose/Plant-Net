import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
  const { user, isLoading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: role, isLoading: isRoleLoading } = useQuery({
    enabled: !isLoading && !!user?.email,
    queryKey: ["role", user?.email],
    queryFn: async () => {
      const data = await axiosSecure(`/user/role/${user?.email}`);
      return data?.data?.role;
    },
  });

  // return { role, isRoleLoading };
  return [role, isRoleLoading];
};

export default useRole;
