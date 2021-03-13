import React, { useState } from "react";

import Modal from "../../UI/Modal/Modal";
import Summary from "../ProjectModalSummary/ProjectModalSummary";

const DeleteProject = ({ setProjectId, setProjects, loadedProject }) => {
  const [invalidMessage, setInvalidMessage] = useState(null);

  const deleteProjectHandler = async (projectId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/projects/${projectId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Only a message is sent through the json (i.e. no data) => projects handled on client side
      const json = await response.json();
      const message = json.message;

      if (response.status >= 400) {
        validationMessageHandler(json.message);
        throw new Error(message);
      }

      // Update the new state of projects by filtering through all the posts except the one the project with the selected id to delete.
      setProjects((prevProjects) => {
        const updatedProjects = prevProjects.filter(
          (project) => project._id !== projectId
        );
        return updatedProjects;
      });

      console.log(message);
    } catch (error) {
      console.log(error);
    }
  };

  const onCloseModal = () => {
    setProjectId(null);
    console.log("Deletion Cancelled");
  };

  const validationMessageHandler = (message) => {
    // Purely for UI only, validation of data is done on backend
    setInvalidMessage(message);
  };

  return (
    <Modal
      idTarget="deleteProject"
      title="Delete Confirmation"
      onCloseModal={() => onCloseModal()}
      modalAction={() => deleteProjectHandler(loadedProject._id)}
      cancelText="Cancel"
      actionText="Delete"
    >
      {loadedProject && (
        <Summary
          loadedProject={loadedProject}
          mode="delete"
          invalidMessage={invalidMessage}
        />
      )}
    </Modal>
  );
};

export default DeleteProject;
