"use client"

import React, {ComponentProps} from "react";

const SubmitButton = ({children, ...props}: ComponentProps<"button">) => {

  return (
    <button
      className="bg-medium-sea-green-700 px-5 py-2.5 text-white hover:ring-1 hover:ring-medium-sea-green-300"
      {...props}>
      {children}
    </button>
  );
}

export default SubmitButton;
