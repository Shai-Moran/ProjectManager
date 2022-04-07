import React, { useEffect, useState } from 'react';
import getProjects from '../services/getProjects';
import ProjectItem from './ProjectItem';
import './styles/Main.css';

const Main = () => {
  const [refresh, setRefresh] = useState(false);
  const [projects, setProjects] = useState();

  useEffect(() => {
    loadProjects();
  }, [refresh]);

  const loadProjects = async () => {
    const result = await getProjects();
    setProjects(result);
    console.log(result);
  };

  const onNewProjectHandler = () => {
    window.location.href = '/new-project';
  };

  return (
    <div className="projects_container">
      <h1>Project Manager</h1>
      <button
        className="projects_container_new-project"
        onClick={onNewProjectHandler}
      >
        New Project +
      </button>
      {projects && projects.length > 0 ? (
        projects.map((p) => {
          if (!p.isDone)
            return <ProjectItem key={p.id} data={p} setRefresh={setRefresh} />;
        })
      ) : (
        <h1>No project at this time</h1>
      )}
      <h1>Finished Projects:</h1>
      {projects && projects.length > 0 ? (
        projects.map((p) => {
          if (p.isDone)
            return <ProjectItem key={p.id} data={p} setRefresh={setRefresh} />;
        })
      ) : (
        <h1>No finished projects</h1>
      )}
    </div>
  );
};

export default Main;
