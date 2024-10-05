"use client";

import { useFormStatus } from "react-dom";

export default function FormSubmit(params) {
  //its give a status that contain information about the submission object and must be used inside a form
  const status = useFormStatus();
  if (status.pending) {
    return <p>Creating post...</p>;
  }
  return (
    <>
      <button type="reset">Reset</button>
      <button>Create Post</button>
    </>
  );
}
