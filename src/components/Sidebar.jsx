import React from "react";
import Avatar from "./Avatar";

import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";

function Sidebar() {
  const { logout } = useLogout();
  const { user } = useSelector((store) => store.user);
  return (
    <div className="bg-violet-400 h-screen w-[350px] text-white flex flex-col ">
      <Avatar user={user} />
      <ul className="flex flex-col pr-0 pl-10 mb-auto">
        <li className="nav-item">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `block px-3 py-2 rounded-l-3xl transition-all duration-900 ${
                isActive
                  ? "bg-white text-violet-400 transform scale-105"
                  : "hover:bg-violet-500"
              }`
            }
          >
            Projects
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/create"
            className={({ isActive }) =>
              `block px-3 py-2 rounded-l-3xl transition-all duration-900 ${
                isActive
                  ? "bg-white text-violet-400 transform scale-105"
                  : "hover:bg-violet-500"
              }`
            }
          >
            Create
          </NavLink>
        </li>
      </ul>
      <div className="flex justify-center mb-10 ">
        <button onClick={logout} className="btn btn-ghost btn-sm text-lg">
          Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
