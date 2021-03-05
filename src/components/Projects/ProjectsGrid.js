import React from "react";

import Project from "./Project/Project";

const ProjectsGrid = ({
  setIsEditMode,
  projects,
  setProjectId,
  setLoadedProject,
}) => {
  return (
    <div className="container">
      <div className="row gy-5">
        {projects.length ? (
          projects.map((project) => {
            return (
              <div className="col lg-4" key={project._id}>
                <Project
                  project={project}
                  setIsEditMode={setIsEditMode}
                  setProjectId={setProjectId}
                  setLoadedProject={setLoadedProject}
                  projects={projects}
                />
              </div>
            );
          })
        ) : (
          <h1>You have no projects!</h1>
        )}
      </div>
    </div>
  );
};

export default ProjectsGrid;
