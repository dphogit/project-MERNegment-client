import React from "react";

import Modal from "../../UI/Modal/Modal";

const DeleteProject = ({ projectIdToDelete, setProjectId, setProjects }) => {
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

  return (
    <Modal
      idTarget="deleteProject"
      title="Delete Project Confirmation"
      onCloseModal={() => onCloseModal()}
      modalAction={() => deleteProjectHandler(projectIdToDelete)}
      cancelText="Cancel"
      actionText="Delete"
    >
      {/* TODO Maybe change this to display some details with a GET project fetch because editing is implemented */}
      Are you sure you want to delete this project?
    </Modal>
  );
};

export default DeleteProject;
