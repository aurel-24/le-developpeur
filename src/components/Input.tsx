"use client"

import {ComponentProps} from "react";

const Input = ({...props}: ComponentProps<"input">) => {

  return (
      <input
        required
        className="w-1/2 mx-auto bg-transparent border-b-2 border-medium-sea-green-700 py-2.5 text-white outline-none mt-4"
        {...props}
      />
  );
}

export default Input;
