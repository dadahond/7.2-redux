import React from "react";
import Avatar from "../components/Avatar";
import { useSelector } from "react-redux";
import { useLogout } from "../hooks/useLogout";

function Settings() {
  const { logout } = useLogout();
  const { user } = useSelector((store) => store.user);

  return (
    <div className=" flex flex-col max-w-2xl mx-auto">
      <div className="flex justify-between w-full mb-60">
        <span className="text-red-500 font-bold text-2xl">LOGO</span>
        <button
          onClick={logout}
          className="btn btn-sm text-lg border-2 hover:border-red-500 transition-all"
        >
          Logout
        </button>
      </div>

      <div
        className="w-full max-w-3xl bg-slate-300 relative rounded-lg mb-20"
        style={{ height: "100px" }}
      >
        <div className=" flex justify-center">
          <Avatar user={user} />
        </div>
      </div>

      <div className="w-full max-w-4xl flex flex-col items-center gap-4">
        <div className="flex justify-around w-full mb-10">
          <span>{user.displayName}</span>
          <span>{user.email}</span>
        </div>
        <button className="btn btn-neutral btn-sm hover:border-red-500">
          Save
        </button>
      </div>
    </div>
  );
}

export default Settings;
