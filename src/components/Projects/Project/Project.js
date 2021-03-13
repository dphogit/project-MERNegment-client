import React from "react";

import Card from "../../UI/Card/Card";
import Button from "../../UI/Button/Button";
import Avatar from "../../UI/Image/Avatar";
import { dateFormatter } from "../../../util/dateFormatter";
import classes from "./Project.module.css";

// * Header, Body, Footer => Project Card Component (bottom) which is default export

// * Project Card Header (Title and Triple Dots Option Dropdown)
const Header = ({
  project,
  projects,
  setIsEditMode,
  setProjectId,
  setLoadedProject,
}) => {
  const loadProject = (projectIdToLoad, projects) => {
    return projects.find((project) => project._id === projectIdToLoad);
  };

  const onStartEditHandler = (projectId, projects) => {
    console.log("Editing Project...");
    setProjectId(projectId);
    setLoadedProject(loadProject(projectId, projects));
    setIsEditMode(true);
  };

  const onViewHandler = (projectId, projects) => {
    console.log("Viewing Project...");
    setProjectId(projectId);
    setLoadedProject(loadProject(projectId, projects));
  };

  // Determine whether the first option is either joining or leaving the project (text only)
  let joinOrLeaveBtnText = "Join Project";
  const userId = localStorage.getItem("userId");
  const matched = project.team.filter((user) => user._id === userId);
  if (matched.length) {
    joinOrLeaveBtnText = "Leave Project";
  }

  // For rendering the edit/delete options for the user
  const isCreator = userId === project.creator;

  return (
    <div className={`card-header ${classes.CardHeader}`}>
      <h5 className={`card-title ${classes.CardTitle}`}>{project.title}</h5>
      <div className="dropdown">
        {/* TODO Buttons can be changed to made visible depending if it is the logged in user's project */}
        <Button btnType="options" className={classes.TripleDots} />
        <ul className="dropdown-menu">
          <li>
            <Button
              btnType="toggle-modal"
              className="dropdown-item"
              modalIdTarget="viewProject"
              clickEvent={() => onViewHandler(project._id, projects)}
            >
              {joinOrLeaveBtnText}
            </Button>
          </li>
          {isCreator && (
            <li>
              <Button
                btnType="toggle-modal"
                className="dropdown-item"
                modalIdTarget="editProject"
                clickEvent={() => onStartEditHandler(project._id, projects)}
              >
                Edit Project
              </Button>
            </li>
          )}
          {isCreator && (
            <li>
              <Button
                btnType="toggle-modal"
                className="dropdown-item"
                modalIdTarget="deleteProject"
                clickEvent={() => onViewHandler(project._id, projects)}
              >
                Delete Project
              </Button>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

// * Project Card Body (Description, Creation Date, Deadline Date)
const Body = ({ project }) => {
  const description = project.description;
  const createdAt = dateFormatter(project.createdAt);
  const deadline = dateFormatter(project.deadline);
  const overdue = new Date() > new Date(project.deadline);

  return (
    <div className={`card-body ${classes.CardBody}`}>
      {overdue && <section className={classes.Overdue}>Late!!!</section>}
      <section>{description}</section>
      <section className={classes.Dates}>
        <section>
          <p className={classes.SectionText}>Created At:</p>
          <p className={classes.SectionText}>{createdAt}</p>
        </section>
        <section>
          <p className={classes.SectionText}>Deadline:</p>
          <p className={classes.SectionText}>{deadline}</p>
        </section>
      </section>
    </div>
  );
};

// * Project Card Footer (Team represented by avatars)
const Footer = ({ project }) => {
  const MAX_TEAM_MEMBERS = 5;
  const avatarStyles = {
    height: "30px",
    width: "30px",
  };

  let teamAvatars, numAdditionalUsers, moreUsersText;

  // Helper function that produces the avatars (used twice below hence preventing DRY)
  const produceAvatars = (team) => {
    teamAvatars = team.map((user) => {
      return (
        <div key={user._id} className={classes.SingleAvatar}>
          <Avatar
            imageUrl={`http://localhost:8080/${user.profilePictureUrl}`}
            avatarStyles={avatarStyles}
          />
        </div>
      );
    });
    return teamAvatars;
  };

  // Will produce avatars up to MAX_TEAM_MEMBERS and display/calculate `+ x members`
  if (project.team.length > MAX_TEAM_MEMBERS) {
    // shallow copy is ok as populated team field of users only has level 1 properties (i.e. no nesting)
    const firstFiveOfTeam = project.team.slice(0, MAX_TEAM_MEMBERS);
    teamAvatars = produceAvatars(firstFiveOfTeam);

    numAdditionalUsers = project.team.length - MAX_TEAM_MEMBERS;
    moreUsersText =
      numAdditionalUsers === 1
        ? (moreUsersText = "+ 1 Other")
        : (moreUsersText = `+ ${numAdditionalUsers} Others`);
  } else {
    // Just produce avatars for array size of less than MAX_TEAM_MEMBERS
    teamAvatars = produceAvatars(project.team);
  }

  return (
    <div className={`card-footer ${classes.CardFooter}`}>
      <p className={classes.FooterText}>Team:</p>
      <div className={classes.TeamAvatars}>{teamAvatars}</div>

      {numAdditionalUsers && (
        <p className={classes.FooterText}>{moreUsersText}</p>
      )}
    </div>
  );
};

const Project = ({
  project,
  setProjectId,
  setIsEditMode,
  setLoadedProject,
  projects,
  mode,
}) => {
  return (
    <Card className={`${classes.ProjectCard} card`}>
      <Header
        project={project}
        projects={projects}
        setProjectId={setProjectId}
        setIsEditMode={setIsEditMode}
        setLoadedProject={setLoadedProject}
        mode={mode}
      />
      <Body project={project} />
      <Footer project={project} />
    </Card>
  );
};

export default Project;
