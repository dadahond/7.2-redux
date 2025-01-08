import React from "react";

function Avatar({ user }) {
  return (
    <div className="flex flex-col items-center p-10 text-center">
      <img className="w-20 h-20 rounded-full" src={user.photoURL} alt="" />
      <p> {user.displayName}</p>
    </div>
  );
}

export default Avatar;
