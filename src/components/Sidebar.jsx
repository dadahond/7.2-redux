import React from "react";
import Avatar from "./Avatar";
// react icon
import { RiFileListLine } from "react-icons/ri";
import { IoIosAddCircleOutline } from "react-icons/io";
import { LuSettings2 } from "react-icons/lu";

import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
// theme
import { useThemeToggle } from "../hooks/useThemeToggle";

function Sidebar() {
  const { changeTheme, theme } = useThemeToggle();
  const { logout } = useLogout();
  const { user } = useSelector((store) => store.user);
  return (
    <div
      className="bg-base-300

 h-screen w-[350px] flex flex-col "
    >
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
      <div className="flex flex-col justify-center items-center mb-10 ">
        <label className="flex cursor-pointer gap-2 mb-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
          </svg>
          <input
            onChange={changeTheme}
            defaultChecked={theme == "dracula"}
            type="checkbox"
            value="synthwave"
            className="toggle theme-controller"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        </label>
        <button
          onClick={logout}
          className="btn btn-success btn-sm text-lg text-{success-content} border-2 hover:border-red-500"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Sidebar;
