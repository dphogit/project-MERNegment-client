import React from "react";

import { dateFormatter } from "../../../util/dateFormatter";
import classes from "./ProjectModalSummary.module.css";

const ProjectModalSummary = ({ loadedProject, mode, invalidMessage }) => {
  let headerText;
  switch (mode) {
    case "join":
      headerText = "You will be joining the following project";
      break;
    case "leave":
      headerText = "You will be leaving the following project";
      break;
    case "delete":
      headerText = "You will be deleting the following project";
      break;
    default:
      headerText = "Something went wrong with the header text.";
      break;
  }

  return (
    <div>
      {invalidMessage && (
        <div className={classes.Invalid}>{invalidMessage}</div>
      )}
      <header className={classes.SummaryHeading}>{headerText}</header>
      <div>{loadedProject.title}</div>
      <div>Due at: {dateFormatter(loadedProject.deadline)}</div>
    </div>
  );
};

export default ProjectModalSummary;
