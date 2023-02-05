import React from "react";
import { useAuth } from "../context/AuthContext";

const Messenger = () => {
  const { currentUser, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="text-center">
      <div className="text-2xl max-w-xs my-8 mx-auto">
        Wow! This is the best messaging app I've ever seen!
        <div className="text-right mx-4">- Mark</div>
      </div>
      <img src="/great-success.gif" className="w-full max-w-xs mx-auto my-8" />
      <div className="my-8">
        <button
          onClick={handleLogout}
          className="rounded-full transition duration-200 bg-violet-500 hover:bg-violet-600 text-white py-2 px-4"
        >
          Log out
        </button>
      </div>
      <div className="text-left whitespace-pre-wrap break-all bg-slate-200 p-4 mx-4 my-8">
        {JSON.stringify(currentUser, null, 2)}
      </div>
    </div>
  );
};

export default Messenger;
