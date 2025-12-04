import AdminStatistics from "../../../components/Dashboard/Statistics/AdminStatistics";
import CustomerStatistics from "../../../components/Dashboard/Statistics/CustomerStatistics";
import SellerStatistics from "../../../components/Dashboard/Statistics/SellerStatistics";
import useRole from "../../../hooks/useRole";
const Statistics = () => {
  const [role, isRoleLoading] = useRole();
  console.log(role);

  if (isRoleLoading) <span className="loading loading-ring loading-xl"></span>;

  return (
    <div>
      {role === "customer" && <CustomerStatistics />}
      {role === "seller" && <SellerStatistics />}
      {role === "admin" && <AdminStatistics />}
    </div>
  );
};

export default Statistics;
