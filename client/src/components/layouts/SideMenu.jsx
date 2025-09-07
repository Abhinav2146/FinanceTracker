import React from "react";
import { SIDE_MENU_DATA } from "../../utils/data";
import { useContext } from "react";
import { userContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const SideMenu = ({ activeMenu }) => {
  const { user, clearUser } = useContext(userContext);
  const navigate = useNavigate();

  const handleClick = (route) => {
    if (route === "logout") {
      handleLogout();
      return;
    }
    navigate(route);
  };

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
    toast.success("LoggedOut Successfully");
  };

  return (
    <div className="w-72 h-screen bg-white border-r border-gray-200/50 p-5 sticky top-[60px] z-20 mt-2">
      <h4 className="text-gray-950 font-medium text-xl text-center mb-5">
        {user?.name}
      </h4>
      {SIDE_MENU_DATA.map((item, index) => (
        <button
          key={index}
          className={`w-full flex items-center gap-4 text-[15px] ${
            activeMenu === item.label ? "text-white bg-primary" : ""
          } py-3 px-6 rounded-lg mb-3 cursor-pointer`}
          onClick={() => handleClick(item.path)}
        >
          <item.icon className="text-xl" />
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default SideMenu;
