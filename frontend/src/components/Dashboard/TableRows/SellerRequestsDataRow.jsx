import useAxiosSecure from "../../../hooks/useAxiosSecure";
import toast from "react-hot-toast";

const SellerRequestsDataRow = ({ request, refetch }) => {
  const axiosSecure = useAxiosSecure();

  const handleRoleUpdate = async () => {
    try {
      await axiosSecure.patch("/update-role", {
        email: request?.email,
        role: "seller",
      });
      toast("Update role successfully");
      refetch();
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 ">{request?.email}</p>
      </td>

      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <span
          onClick={() => handleRoleUpdate()}
          className="relative cursor-pointer inline-block px-3 py-1 font-semibold text-green-900 leading-tight"
        >
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-green-200 opacity-50 rounded-full"
          ></span>
          <span className="relative">Make Seller</span>
        </span>
      </td>
    </tr>
  );
};

export default SellerRequestsDataRow;
