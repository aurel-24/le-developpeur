"use client"

import {ComponentProps, InputHTMLAttributes} from "react";
import "../app/globals.css";

type Props = ComponentProps<"input">;

const Input = ({...props}: InputHTMLAttributes<HTMLInputElement>) => {

  return (
      <input
        required
        className="w-1/2 mx-auto bg-transparent border-b-2 border-medium-sea-green-700 py-2.5 text-white outline-none mt-4"
        {...props}
      />
  );
}

export default Input;
