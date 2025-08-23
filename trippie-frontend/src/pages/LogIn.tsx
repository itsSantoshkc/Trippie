"use client";
import { type FormEvent, useRef, useState } from "react";
import { Separator } from "../components/ui/separator";
import PasswordInput from "../components/ui/passwordInput";

const LogIn = () => {
  const EmailRef = useRef(null);
  const PasswordRef = useRef(null);
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <div className="flex flex-col w-full py-5 mx-4 sm:w-3/4 sm:px-5 md:w-1/2 lg:w-1/3 xl:w-1/4 rounded-xl bg-stone-200">
        <h1 className="w-full py-3 mt-4 text-3xl font-bold text-center">
          Log In
        </h1>
        <div className="py-2 ">
          <h2 className="font-semibold text-center text-stone-600">
            Enter your email and password to log in.
          </h2>
        </div>

        <div className="flex items-center justify-center w-full my-3">
          <Separator className="bg-stone-400 w-[90%]  " />
        </div>
        <div className="mx-2">
          <form className="flex flex-col">
            <label
              htmlFor="email"
              className="px-3 my-1 font-bold text-stone-600"
            >
              Email Address
            </label>
            <input
              ref={EmailRef}
              type="email"
              name="email"
              className="h-12 px-3 border rounded-xl border-stone-400"
              placeholder="Enter Your Email"
            />
            <label
              htmlFor="password"
              className="px-3 my-1 font-bold text-stone-600"
            >
              Password
            </label>

            <PasswordInput
              ref={PasswordRef}
              placeholder="Enter Your Password"
              name="password"
            />
            <div className="flex items-center justify-between m-2 mx-1 text-sm font-bold text-stone-600">
              <a href={"/Sign-up"}>
                <h2 className="transition-colors duration-500 cursor-pointer hover:text-stone-400">
                  Create a new account
                </h2>
              </a>
              <a href={"/forget-password"}>
                <h2 className="underline transition-colors duration-500 cursor-pointer hover:text-stone-400">
                  Forgot Password ?
                </h2>
              </a>
            </div>
            <button
              type="submit"
              value="Log In"
              disabled={loading ? true : false}
              className="flex items-center justify-center p-3 my-3 text-xl font-bold text-white transition-colors duration-500 cursor-pointer rounded-xl bg-stone-500 hover:bg-stone-400 "
            >
              {!loading && "Log In"}
              {loading && (
                <div className="flex items-center px-2 justify-evenly">
                  <div className="w-6 h-6 border-2 border-gray-300 rounded-full animate-spin border-t-blue-600" />
                </div>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
