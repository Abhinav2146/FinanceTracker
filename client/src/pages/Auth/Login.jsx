import { useContext, useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import AuthLayout from "../../components/layouts/AuthLayout";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { userContext } from "../../context/userContext";
import toast from "react-hot-toast";

const Login = () => {
  const [state, setState] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { updateUser } = useContext(userContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (state === "login") {
        response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
          email,
          password,
        });

        const { token, user } = response.data;
        if (token) {
          updateUser(user);
          localStorage.setItem("token", token);
          navigate("/dashboard");
          toast.success("Logged in Successfully");
        } else {
          toast.error(response.data.message);
        }
      } else {
        response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
          name,
          email,
          password,
        });

        if (response.data.success) {
          toast.success("Account created successfully! Please login.");
          setState("login");
          setPassword("");
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <AuthLayout>
      <div className="h-3/4 md:h-full flex flex-col">
        <form
          onSubmit={handleLogin}
          onClick={(e) => e.stopPropagation()}
          className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white"
        >
          <p className="text-2xl font-medium m-auto">
            <span className="text-primary">User</span>{" "}
            {state === "login" ? "Login" : "Sign Up"}
          </p>
          {state === "register" && (
            <div className="w-full">
              <p>Name</p>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="border border-borderColor rounded w-full p-2 mt-1 outline-primary"
                type="text"
                required
              />
            </div>
          )}
          <div className="w-full ">
            <p>Email</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="border border-borderColor rounded w-full p-2 mt-1 outline-primary"
              type="email"
              required
            />
          </div>
          <div className="w-full ">
            <p>Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="border border-borderColor rounded w-full p-2 mt-1 outline-primary"
              type="password"
              required
            />
          </div>
          {state === "register" ? (
            <p>
              Already have account?{" "}
              <span
                onClick={() => setState("login")}
                className="text-primary cursor-pointer"
              >
                click here
              </span>
            </p>
          ) : (
            <p>
              Create an account?{" "}
              <span
                onClick={() => setState("register")}
                className="text-primary cursor-pointer"
              >
                click here
              </span>
            </p>
          )}
          <button className="bg-primary hover:bg-primary-dull transition-all text-white w-full py-2 rounded-md cursor-pointer">
            {state === "register" ? "Create Account" : "Login"}
          </button>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
