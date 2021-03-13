import React, { useState } from "react";

import Input from "../UI/Input/Input";
import Modal from "../UI/Modal/Modal";
import Avatar from "../UI/Image/Avatar";
import classes from "./EditProfile.module.css";

// import Image from "../UI/Image/Image";
import { generateBase64FromImage } from "../../util/image";

const EditProfile = ({ user, token }) => {
  const initialFormData = {
    profilePicture: `http://localhost:8080/${user.profilePictureUrl}`,
    username: user.username ? user.username : "",
    role: user.role ? user.role : "",
  };
  const [formData, setFormData] = useState(initialFormData);
  const [imagePreview, setImagePreview] = useState(
    initialFormData.profilePicture
  );
  const [invalidMessage, setInvalidMessage] = useState(null);

  const inputChangeHandler = async (e) => {
    const inputName = e.target.name;
    const updatedForm = { ...formData };
    if (inputName === "profilePicture") {
      const imageFile = e.target.files[0];
      updatedForm[inputName] = imageFile;
      try {
        const b64 = await generateBase64FromImage(imageFile);
        setImagePreview(b64);
      } catch (error) {
        setImagePreview(initialFormData.profilePicture);
      }
    } else {
      updatedForm[inputName] = e.target.value;
    }
    setFormData(updatedForm);
  };

  const editSubmitHandler = async (postData) => {
    const formData = new FormData();
    formData.append("username", postData.username);
    formData.append("role", postData.role);
    formData.append("profilePicture", postData.profilePicture);

    try {
      const response = await fetch(
        `http://localhost:8080/auth/users/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          method: "PUT",
          body: formData,
        }
      );
      const json = await response.json();

      if (response.status >= 400) {
        validationMessageHandler(json.message);
        throw new Error(json.message);
      }
      window.location.reload();
      console.log(json);
    } catch (error) {
      console.log(error);
    }
  };

  const onCloseModal = () => {
    setFormData(initialFormData);
    setImagePreview(initialFormData.profilePicture);
  };

  const validationMessageHandler = (message) => {
    // Purely for UI only, validation of data is done on backend
    setInvalidMessage(message);
  };

  const avatarStyles = {
    width: "200px",
    height: "200px",
  };

  return (
    <Modal
      onCloseModal={onCloseModal}
      modalAction={() => editSubmitHandler(formData)}
      title="Edit Profile"
      cancelText="Cancel"
      actionText="Save Changes"
      idTarget="editProfile"
    >
      <form>
        {<Avatar imageUrl={imagePreview} avatarStyles={avatarStyles} />}
        {invalidMessage && (
          <div className={classes.Invalid}>{invalidMessage}</div>
        )}
        <Input
          inputName="profilePicture"
          inputType="file"
          inputChangeHandler={inputChangeHandler}
          labelText="Profile Picture"
          placeholder={"Change Profile Picture"}
        />
        <Input
          inputName="username"
          placeholder="Add username"
          inputType="text"
          inputChangeHandler={inputChangeHandler}
          value={formData.username}
          labelText="Username"
        />
        <Input
          inputName="role"
          placeholder="Add role"
          inputType="text"
          inputChangeHandler={inputChangeHandler}
          value={formData.role}
          labelText="Role"
        />
      </form>
      <p>Email: {user.email}</p>
      <p>Joined: {new Date(user.createdAt).toISOString().split("T")[0]}</p>
    </Modal>
  );
};

export default EditProfile;
