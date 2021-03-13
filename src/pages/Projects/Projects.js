/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useState } from "react";
import Navigation from "../../components/UI/Navigation/Navigation";

import Button from "../../components/UI/Button/Button";
import ProjectsGrid from "../../components/Projects/ProjectsGrid";
import EditProject from "../../components/Projects/EditProject/EditProject";
import DeleteProject from "../../components/Projects/DeleteProject/DeleteProject";
import JoinProject from "../../components/Projects/JoinOrLeaveProject/JoinOrLeaveproject";
import Paginator from "../../components/UI/Paginator/Paginator";
import classes from "./Projects.module.css";

// This is set up at backend => needs to be changed in front end and backend.
const PROJECTS_PER_PAGE = 6;
const DEFAULT_PAGE = 1;

const Projects = ({ logoutHandler, activePath, setActivePath, user }) => {
  // TODO !! Clean up redundant state e.g. projectID is superseded by loadedProject => clean up EditProject to not rely on projectIdSelected state
  const [isEditMode, setIsEditMode] = useState(false);
  const [projectIdSelected, setProjectIdSelected] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loadedProject, setLoadedProject] = useState(null);
  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE);
  const [totalProjects, setTotalProjects] = useState(null);
  const [joinOrLeave, setJoinOrLeave] = useState("join");

  const getProjects = async (direction = null) => {
    let page = currentPage;
    if (direction === "previous") {
      page--;
      setCurrentPage(page);
    }
    if (direction === "next") {
      page++;
      setCurrentPage(page);
    }
    const response = await fetch(
      `http://localhost:8080/projects?page=${page}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    const json = await response.json();

    // Error checking for status code of >= 400
    if (response.status >= 400) {
      throw new Error(json.message);
    }

    setProjects(json.data.projects);
    setTotalProjects(json.data.totalProjects);
    console.log(json);
  };

  useEffect(() => {
    getProjects();
    setActivePath("projects");
    localStorage.setItem("currentRoute", "/projects");
  }, []);

  // joinOrLeave === "join" check to prevent infinite re-rendering
  if (loadedProject && joinOrLeave === "join") {
    const userId = localStorage.getItem("userId");
    // Filter through the team in the loaded project and check if the logged in user id is in the loaded project team. Sets to leaving mode.
    const matched = loadedProject.team.filter((user) => user._id === userId);
    if (matched.length) {
      setJoinOrLeave("leave");
    }
  }

  return (
    user &&
    projects && (
      <Fragment>
        <Navigation
          logoutHandler={logoutHandler}
          activePath={activePath}
          profilePictureUrl={user.profilePictureUrl}
        />
        <div className="container" id="content">
          <div className={classes.Dashboard}>
            <div className={classes.DashboardText}>
              <h2>{totalProjects} projects to be completed!</h2>
            </div>
            <div className={classes.DashboardControls}>
              <div className={classes.AddProjectWrapper}>
                <Button
                  btnType="toggle-modal"
                  className={`btn ${classes.AddBtn}`}
                  modalIdTarget="editProject"
                  clickEvent={() => {
                    setIsEditMode(false);
                  }}
                >
                  + Add Project
                </Button>
              </div>
              <Paginator
                onPrevious={getProjects}
                onNext={getProjects}
                lastPage={Math.ceil(totalProjects / PROJECTS_PER_PAGE)}
                currentPage={currentPage}
              />
            </div>
          </div>
          <EditProject
            editMode={isEditMode}
            setIsEditMode={setIsEditMode}
            projectIdToEdit={projectIdSelected}
            setProjectId={setProjectIdSelected}
            loadedProject={loadedProject}
            setLoadedProject={setLoadedProject}
          />
          <DeleteProject
            setProjectId={setProjectIdSelected}
            setProjects={setProjects}
            loadedProject={loadedProject}
          />
          <JoinProject
            loadedProject={loadedProject}
            setLoadedProject={setLoadedProject}
            mode={joinOrLeave}
            setMode={setJoinOrLeave}
          />
          <ProjectsGrid
            setIsEditMode={setIsEditMode}
            setProjectId={setProjectIdSelected}
            projects={projects}
            setLoadedProject={setLoadedProject}
          />
        </div>
      </Fragment>
    )
  );
};

export default Projects;
