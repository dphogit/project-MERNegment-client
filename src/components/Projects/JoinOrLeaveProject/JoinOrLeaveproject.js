import React from "react";

import Modal from "../../UI/Modal/Modal";
import Summary from "../ProjectModalSummary/ProjectModalSummary";

const JoinProject = ({ loadedProject, setLoadedProject, mode, setMode }) => {
  const onCloseModal = () => {
    console.log("Closing Modal...");
    setLoadedProject(null);
    setMode("join");
  };

  const onJoinOrLeaveHandler = async () => {
    const projectId = loadedProject._id;
    const userId = localStorage.getItem("userId");

    let url = `http://localhost:8080/projects/join/${projectId}/${userId}`;
    if (mode === "leave") {
      url = `http://localhost:8080/projects/leave/${projectId}/${userId}`;
    }

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const json = await response.json();

      if (response.status >= 400) {
        throw new Error(json.message);
      }

      console.log(json.message);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  let modalTitle;
  switch (mode) {
    case "join":
      modalTitle = "Join Project";
      break;
    case "leave":
      modalTitle = "Leave Project";
      break;
    default:
      modalTitle = "Modal Title Error";
      break;
  }

  return (
    <Modal
      title={modalTitle}
      cancelText="Close"
      actionText="OK"
      idTarget="viewProject"
      onCloseModal={onCloseModal}
      modalAction={onJoinOrLeaveHandler}
    >
      {loadedProject && <Summary loadedProject={loadedProject} mode={mode} />}
    </Modal>
  );
};

export default JoinProject;
