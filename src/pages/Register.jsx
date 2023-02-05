import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { useAuth } from "../context/AuthContext";
import { MdWest } from "react-icons/md";
import logo from "../assets/logo3.svg";

const Register = ({ setCurrentPage }) => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submitRegisterForm = async (e) => {
    e.preventDefault();

    if (loading) return;
    setLoading(true);

    register(emailRef.current.value, passwordRef.current.value)
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div
      className="flex flex-col items-center justify-center bg-white min-w-[320px] max-w-[800px] min-h-screen px-8 md:px-32 animate-slide-in-from-left"
      style={{
        boxShadow: "0px 0px 20px 0px #808080",
      }}
    >
      <a
        href="#"
        className="self-start"
        onClick={() => {
          setCurrentPage("login");
        }}
      >
        <MdWest size={24} />
      </a>
      <img src={logo} className="logo w-full max-w-xs my-12" alt="logoipsum" />
      <p className="text-4xl font-bold text-black mb-12">Register</p>
      <div className="w-full min-w-max">
        <form onSubmit={submitRegisterForm}>
          <div className="flex flex-col">
            <label className="text-slate-700 text-sm font-medium">
              Email address
            </label>
            <div className="border-b-1 border-slate-300 ">
              <input
                type="email"
                placeholder="jon.snow@thewall.com"
                ref={emailRef}
                className="w-full p-2 transition duration-200 focus:outline-none focus:border-b-1 focus:border-indigo-700"
                required
              />
            </div>
          </div>
          <div className="flex flex-col mt-6">
            <label className="text-slate-700 text-sm font-medium">
              Password
            </label>
            <div className="border-b-1 border-slate-300">
              <input
                type="password"
                placeholder="Enter your password"
                ref={passwordRef}
                className="w-full p-2 transition duration-200 focus:outline-none focus:border-b-1 focus:border-indigo-700"
                required
              />
            </div>
          </div>
          <div className="my-6">
            <button className="rounded-full w-full transition duration-200 bg-violet-500 hover:bg-violet-600 text-white py-2 px-4">
              Register
            </button>
          </div>
          {error && <p className="text-red-500 my-6">{error}</p>}
        </form>
      </div>
    </div>
  );
};

Register.propTypes = {
  setCurrentPage: PropTypes.func.isRequired,
};

export default Register;
