import React from "react";

import Modal from "../Modal/Modal";

// FIXME Redesign later on when modal is scalable(not urgent)

const ErrorHandler = ({ error, setError }) => {
  const modal = error ? (
    <Modal error={error} setError={setError} title="Something Went Wrong">
      {error.message}
    </Modal>
  ) : null;

  return modal;
};

export default ErrorHandler;
