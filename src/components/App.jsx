import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Messenger from "../pages/Messenger";

const App = () => {
  const [currentPage, setCurrentPage] = useState("login");
  const { currentUser } = useAuth();

  // TODO: setup react-router-dom
  // 1. replace currentPage state with react-router-dom
  // 2. if not logged in, show "Login" page
  // 3. after login if currentUser.createdAt == currentUser.lastLoginAt,
  //    take the user to the "Profile Setup" page
  // 4. once profile setup is submitted, take the user to the "Messenger" page

  return (
    <>
      {currentUser && !currentUser.isAnonymous ? (
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
