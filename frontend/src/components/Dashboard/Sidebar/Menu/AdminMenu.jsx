import { FaUserCog } from "react-icons/fa";
import MenuItem from "./MenuItem";
import { RiUserCommunityFill } from "react-icons/ri";

const AdminMenu = () => {
  return (
    <>
      <MenuItem icon={FaUserCog} label="Manage Users" address="manage-users" />
      <MenuItem
        icon={RiUserCommunityFill}
        label="Seller requests"
        address="seller-requests"
      />
    </>
  );
};

export default AdminMenu;
