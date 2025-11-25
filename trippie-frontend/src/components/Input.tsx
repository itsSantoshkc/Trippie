import React, { forwardRef, useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";

type Props = {
  name?: string;
  type?: string;
  placeholder?: string;
  className?: string;
};

const Input = forwardRef(
  (props: Props, ref: React.Ref<HTMLInputElement> | undefined) => {
    return (
      <>
        <div className="relative flex items-center w-full h-12 my-2 rounded-xl">
          <input
            ref={ref}
            type={props.type || "text"}
            name={props.name}
            id={props.name}
            // border && border-primary for error
            className="w-full h-full px-3 bg-white rounded-lg drop-shadow-md "
            placeholder={props.placeholder}
          />
        </div>
        {/* <p className="px-3 text-primary">Error! </p> */}
      </>
    );
  }
);

export default Input;
