"use client"

import React, {ComponentProps} from "react";
import {useFormStatus} from "react-dom";

type Props = ComponentProps<"button"> & {
  pendingText?: string
};

const SubmitButton = ({children, pendingText, ...props}: Props) => {

  const {pending, action} = useFormStatus();
  const isPending = pending && action === props.formAction;

  return (
    <button
      type="submit"
      aria-disabled={pending}
      {...props}>
      {isPending ? pendingText : children}
    </button>
  );
}

export default SubmitButton;
