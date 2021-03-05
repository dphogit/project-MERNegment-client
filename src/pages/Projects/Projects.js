/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useState } from "react";
import Navigation from "../../components/UI/Navigation/Navigation";

import Button from "../../components/UI/Button/Button";
import ProjectsGrid from "../../components/Projects/ProjectsGrid";
import EditProject from "../../components/Projects/EditProject/EditProject";
import DeleteProject from "../../components/Projects/DeleteProject/DeleteProject";
import Paginator from "../../components/UI/Paginator/Paginator";
import classes from "./Projects.module.css";

// This is set up at backend => needs to be changed in front end and backend.
const PROJECTS_PER_PAGE = 6;
const DEFAULT_PAGE = 1;

/* TODO Design Projects Page designed in FIGMA 
= Pagination
- Search Form
- Dashboard 
*/

const Projects = ({ logoutHandler, activePath, setActivePath, user }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [projectIdSelected, setProjectIdSelected] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loadedProject, setLoadedProject] = useState(null);
  const [currentPage, setCurrentPage] = useState(DEFAULT_PAGE);
  const [totalProjects, setTotalProjects] = useState(null);

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

  return (
    user &&
    projects && (
      <Fragment>
        <Navigation
          logoutHandler={logoutHandler}
          activePath={activePath}
          profilePictureUrl={user.profilePictureUrl}
        />
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
        <EditProject
          editMode={isEditMode}
          setIsEditMode={setIsEditMode}
          projectIdToEdit={projectIdSelected}
          setProjectId={setProjectIdSelected}
          loadedProject={loadedProject}
          setLoadedProject={setLoadedProject}
        />
        <DeleteProject
          projectIdToDelete={projectIdSelected}
          setProjectId={setProjectIdSelected}
          setProjects={setProjects}
        />
        <ProjectsGrid
          setIsEditMode={setIsEditMode}
          setProjectId={setProjectIdSelected}
          projects={projects}
          setLoadedProject={setLoadedProject}
        />
        <Paginator
          onPrevious={getProjects}
          onNext={getProjects}
          lastPage={Math.ceil(totalProjects / PROJECTS_PER_PAGE)}
          currentPage={currentPage}
        />
      </Fragment>
    )
  );
};

export default Projects;
