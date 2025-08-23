import React, { forwardRef, useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

type Props = {
  name?: string;
  placeholder?: string;
};

const PasswordInput = forwardRef(
  (props: Props, ref: React.Ref<HTMLInputElement> | undefined) => {
    const [showPassword, setshowPassword] = useState(false);
    return (
      <div className="relative flex items-center w-full h-12 rounded-xl">
        <input
          ref={ref}
          type={showPassword ? "text" : "password"}
          name={props.name}
          id={props.name}
          className="w-full h-full px-3 border border-stone-400 rounded-xl"
          placeholder={props.placeholder}
        />
        {!showPassword ? (
          <IoMdEye
            className="absolute text-xl cursor-pointer right-5"
            onClick={() => setshowPassword(!showPassword)}
          />
        ) : (
          <IoMdEyeOff
            className="absolute text-xl cursor-pointer right-5"
            onClick={() => setshowPassword(!showPassword)}
          />
        )}
      </div>
    );
  }
);

export default PasswordInput;
