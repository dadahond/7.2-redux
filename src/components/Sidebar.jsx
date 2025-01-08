import React from "react";
import Avatar from "./Avatar";
// react icon
import { RiFileListLine } from "react-icons/ri";
import { IoIosAddCircleOutline } from "react-icons/io";
import { LuSettings2 } from "react-icons/lu";

import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";

function Sidebar() {
  const { logout } = useLogout();
  const { user } = useSelector((store) => store.user);
  return (
    <div className="bg-slate-700 h-screen w-[350px] text-white flex flex-col ">
      <Avatar user={user} />
      <ul className="flex flex-col pr-0 pl-10 mb-auto">
        <li className="nav-item">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `block px-3 py-2 rounded-l-3xl transition-all duration-900 ${
                isActive
                  ? "bg-white text-slate-900 transform scale-105"
                  : "border-2 hover:border-red-500"
              }`
            }
          >
            <span className="flex items-center gap-2">
              <RiFileListLine /> Projects
            </span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/create"
            className={({ isActive }) =>
              `block px-3 py-2 rounded-l-3xl transition-all duration-900 my-2 ${
                isActive
                  ? "bg-white text-slate-900 transform scale-105"
                  : "border-2 hover:border-red-500"
              }`
            }
          >
            <span className="flex items-center gap-2">
              <IoIosAddCircleOutline /> Create
            </span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `block px-3 py-2 rounded-l-3xl transition-all duration-900 my-2 ${
                isActive
                  ? "bg-white text-slate-900 transform scale-105"
                  : "border-2 hover:border-red-500"
              }`
            }
          >
            <span className="flex items-center gap-2">
              <LuSettings2 /> Settings
            </span>
          </NavLink>
        </li>
      </ul>
      <div className="flex justify-center mb-10 ">
        <button
          onClick={logout}
          className="btn btn-ghost btn-sm text-lg border-2 hover:border-red-500"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
