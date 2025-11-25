"use client";
import { type FormEvent, useRef, useState } from "react";
import { Separator } from "../components/ui/separator";
import PasswordInput from "../components/ui/passwordInput";
import Input from "@/components/Input";

const SignUp = () => {
  const EmailRef = useRef(null);
  const PasswordRef = useRef(null);
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <div className="flex flex-col w-full py-5 mx-4 sm:w-3/4 sm:px-5 md:w-1/2 lg:w-1/3 xl:w-1/4 rounded-xl bg-primary-foreground">
        <h1 className="w-full py-3 mx-2 mt-4 text-3xl font-bold ">
          Get Started Now
        </h1>
        <div className="py-2 ">
          <h2 className="mx-2 font-semibold text-stone-600">
            Enter your credemtials to create an account
          </h2>
        </div>

        <div className="flex items-center justify-center w-full my-3">
          <Separator className="bg-secondary opacity-50 w-[90%]  " />
        </div>
        <div className="mx-2">
          <form className="flex flex-col">
            <label
              htmlFor="full-name"
              className="px-1 my-1 font-bold text-secondary"
            >
              Full Name
            </label>
            <Input
              type="text"
              name="full-name"
              className="h-12 px-3 bg-white rounded-lg drop-shadow-md"
              placeholder="Enter Your Full Name"
            />
            <label
              htmlFor="phone"
              className="px-1 my-1 font-bold text-secondary"
            >
              Phone Number
            </label>
            <Input
              type="text"
              name="phone"
              className="h-12 px-3 bg-white rounded-lg drop-shadow-md"
              placeholder="Enter Your Phone Number"
            />
            <label
              htmlFor="email"
              className="px-1 my-1 font-bold text-secondary"
            >
              Email Address
            </label>
            <Input
              type="email"
              name="email"
              className="h-12 px-3 bg-white rounded-lg drop-shadow-md"
              placeholder="Enter Your Email"
            />
            <label
              htmlFor="password"
              className="px-1 my-1 font-bold text-stone-600"
            >
              Password
            </label>

            <PasswordInput
              ref={PasswordRef}
              placeholder="Enter Your Password"
              name="password"
            />
            <label
              htmlFor="cpassword"
              className="px-1 my-1 font-bold text-stone-600"
            >
              Confirm Password
            </label>

            <PasswordInput
              ref={PasswordRef}
              placeholder="Re-Enter Your Password"
              name="cpassword"
            />
            <div className="flex items-center m-2 text-sm font-bold ">
              <span>Already an User?</span>
              <a href={"/Sign-up"}>
                <span className="mx-1 underline transition-colors duration-500 cursor-pointer text-primary hover:text-primary-hover">
                  Log In
                </span>
              </a>
            </div>
            <button
              type="submit"
              value="Log In"
              disabled={loading ? true : false}
              className="flex items-center justify-center p-3 my-3 text-xl font-bold text-white transition-colors duration-500 cursor-pointer rounded-xl bg-primary hover:bg-primary-hover "
            >
              {!loading && "Sign Up"}
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

export default SignUp;
