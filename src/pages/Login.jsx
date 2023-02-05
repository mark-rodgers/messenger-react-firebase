import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo3.svg";
import logoGoogle from "../assets/logo-google.svg";
import logoFacebook from "../assets/logo-facebook.svg";
import logoMicrosoft from "../assets/logo-microsoft.svg";

const Login = ({ setCurrentPage }) => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submitLoginForm = async (e) => {
    e.preventDefault();

    if (loading) return;
    setLoading(true);

    login(emailRef.current.value, passwordRef.current.value)
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const forgotPassword = () => {
    alert("TODO: implement password reset");
  };

  const loginWithProvider = (provider) => {
    alert(`TODO: implement login with ${provider}`);
  };

  return (
    <div
      className="flex flex-col items-center justify-center bg-white min-w-[320px] max-w-[800px] min-h-screen px-8 md:px-32 animate-slide-in-from-left"
      style={{
        boxShadow: "0px 0px 20px 0px #808080",
      }}
    >
      <img src={logo} className="logo w-full max-w-xs my-12" alt="logoipsum" />
      <p className="text-4xl font-bold text-black mb-12">Sign in</p>
      <div className="w-full min-w-max">
        <form onSubmit={submitLoginForm}>
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
            <div className="text-sm text-right mt-2">
              <a
                href="#"
                onClick={forgotPassword}
                className="text-indigo-500 hover:text-indigo-600"
              >
                Forgot password?
              </a>
            </div>
          </div>
          <div className="my-6">
            <button className="rounded-full w-full transition duration-200 bg-violet-500 hover:bg-violet-600 text-white py-2 px-4">
              Sign in
            </button>
          </div>
          {error && <p className="text-red-500 my-6">{error}</p>}
        </form>
        <div>
          <div className="my-2">
            <button
              onClick={() => {
                loginWithProvider("google");
              }}
              className="rounded-full w-full transition duration-200 bg-slate-200 hover:bg-slate-300 text-slate-600 py-2 px-4 flex items-center justify-center"
            >
              <img
                src={logoGoogle}
                alt="Sign in with Google"
                className="mr-3 w-5 h-5"
              />
              <span>Sign in with Google</span>
            </button>
          </div>
          <div className="my-2">
            <button
              onClick={() => {
                loginWithProvider("facebook");
              }}
              className="rounded-full w-full transition duration-200 bg-slate-200 hover:bg-slate-300 text-slate-600 py-2 px-4 flex items-center justify-center"
            >
              <img
                src={logoFacebook}
                alt="Sign in with Facebook"
                className="mr-3 w-5 h-5"
              />
              <span>Sign in with Facebook</span>
            </button>
          </div>
          <div className="my-2">
            <button
              onClick={() => {
                loginWithProvider("microsoft");
              }}
              className="rounded-full w-full transition duration-200 bg-slate-200 hover:bg-slate-300 text-slate-600 py-2 px-4 flex items-center justify-center"
            >
              <img
                src={logoMicrosoft}
                alt="Sign in with Microsoft"
                className="mr-3 w-5 h-5"
              />
              <span>Sign in with Microsoft</span>
            </button>
          </div>
        </div>
        <div className="border-t-1 text-center border-slate-300 my-6 pt-6">
          <a
            href="#"
            onClick={() => {
              setCurrentPage("register");
            }}
            className="text-indigo-500 hover:text-indigo-600"
          >
            Don't already have an account? Register now!
          </a>
        </div>
      </div>
    </div>
  );
};

Login.propTypes = {
  setCurrentPage: PropTypes.func.isRequired,
};

export default Login;
