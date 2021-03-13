// * Edit AND add project same modal => determined by props
import React, { useState, useEffect } from "react";
import { dateFormatter } from "../../../util/dateFormatter";

import Modal from "../../UI/Modal/Modal";
import Input from "../../UI/Input/Input";
import classes from "./EditProject.module.css";

const EditProject = ({
  editMode,
  setIsEditMode,
  projectIdToEdit,
  setProjectId,
  loadedProject,
  setLoadedProject,
}) => {
  const initialFormData = {
    title: "",
    description: "",
    deadline: dateFormatter(),
    projectId: null,
  };

  useEffect(() => {
    if (editMode) {
      const editFormData = {
        title: loadedProject.title,
        description: loadedProject.description,
        deadline: dateFormatter(loadedProject.deadline),
        projectId: projectIdToEdit,
      };
      setFormData(editFormData);
    }
  }, [loadedProject, editMode, projectIdToEdit]);

  const [formData, setFormData] = useState(initialFormData);

  const [invalidMessage, setInvalidMessage] = useState(null);

  const onCloseModal = () => {
    setFormData(initialFormData);
    setInvalidMessage(null);
    setProjectId(null);
    setIsEditMode(false);
    setLoadedProject(null);
  };

  const inputChangeHandler = (e) => {
    const inputName = e.target.name;
    const updatedForm = { ...formData };
    updatedForm[inputName] = e.target.value;
    setFormData(updatedForm);
  };

  const handleSubmit = async (postData) => {
    const httpMethod = editMode ? "PUT" : "POST";
    const url = editMode
      ? `http://localhost:8080/projects/${postData.projectId}`
      : "http://localhost:8080/projects";

    try {
      const response = await fetch(url, {
        method: httpMethod,
        body: JSON.stringify({
          title: postData.title,
          description: postData.description,
          deadline: postData.deadline,
          creator: localStorage.getItem("userId"),
          projectId: postData.projectId,
        }),
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      const json = await response.json();

      if (response.status >= 400) {
        validationMessageHandler(json.message);
        throw new Error(json.message);
      }

      console.log(json);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const validationMessageHandler = (message) => {
    // Purely for UI only, validation of data is done on backend
    setInvalidMessage(message);
  };

  return (
    <Modal
      title={editMode ? "Edit Project" : "Add Project"}
      cancelText={"Cancel"}
      actionText={editMode ? "Save Changes" : "Add Project"}
      idTarget="editProject"
      onCloseModal={onCloseModal}
      modalAction={() => handleSubmit(formData)}
    >
      {invalidMessage && (
        <div className={classes.Invalid}>{invalidMessage}</div>
      )}
      <form autoComplete={"off"}>
        <Input
          inputType="text"
          inputName="title"
          labelText="Project Title"
          placeholder="Project Title"
          inputChangeHandler={inputChangeHandler}
          value={formData.title}
        />
        <Input
          inputType="textarea"
          inputName="description"
          labelText="Description (100 character limit)"
          placeholder="Describe your project..."
          inputChangeHandler={inputChangeHandler}
          value={formData.description}
        />
        <Input
          inputType="date"
          inputName="deadline"
          labelText="Deadline"
          placeholder="Select Date"
          minDate={new Date().toISOString().split("T")[0]}
          inputChangeHandler={inputChangeHandler}
          value={formData.deadline}
        />
      </form>
    </Modal>
  );
};

export default EditProject;
