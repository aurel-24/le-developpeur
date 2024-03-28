"use client"

import React, {ComponentProps} from "react";
import "../app/globals.css";
import {useFormStatus} from "react-dom";

type Props = ComponentProps<"button"> & {
  pendingText?: string
};

const SubmitButton = ({children, pendingText, ...props}: Props) => {

  const { pending, action } = useFormStatus();

  const isPending = pending && action === props.formAction;

  return (
    <button
      type="submit"
      className="w-1/2 mx-auto border-2 border-medium-sea-green-700 hover:bg-medium-sea-green-700 px-5 py-2.5 text-white mb-2"
            {...props} aria-disabled={pending}>
      {isPending ? pendingText : children}
    </button>
  );
}

export default SubmitButton;
