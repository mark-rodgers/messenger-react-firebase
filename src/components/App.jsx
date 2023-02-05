import React, { useEffect, useState } from "react";
// import { useAuthState } from "react-firebase-hooks/auth";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Messenger from "../pages/Messenger";

const App = () => {
  const [currentPage, setCurrentPage] = useState("login");

  return (
    <>
      {currentPage === "messenger" ? (
        <Messenger />
      ) : (
        <div className="min-h-screen min-w-screen bg-gradient-to-br from-violet-400 via-violet-400 to-pink-300">
          {currentPage === "login" && <Login setCurrentPage={setCurrentPage} />}
          {currentPage === "register" && (
            <Register setCurrentPage={setCurrentPage} />
          )}
        </div>
      )}
    </>
  );
};

export default App;
