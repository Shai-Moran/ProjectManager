import React, { useEffect } from 'react';
import deleteProject from '../services/deleteProject';
import editProject from '../services/editProject';
import './styles/ProjectItem.css';

const ProjectItem = (props) => {
  const onViewHandler = () => {
    window.location.href = `/view-project?id=${props.data.id}`;
  };

  const onUpdateHandler = () => {
    window.location.href = `/edit-project?id=${props.data.id}`;
  };

  const onDeleteHandler = async () => {
    if (window.confirm('are you sure you want to delete this project?')) {
      await deleteProject(props.data.id);
      props.setRefresh((s) => !s);
    }
  };

  const onFinishProjectHandler = async () => {
    if (window.confirm('are you sure you want to mark this project as done?')) {
      await editProject(
        props.data.id,
        props.data.imageUrl,
        props.data.name,
        props.data.description,
        props.data.tasks,
        props.data.dueDate,
        true
      );
      props.setRefresh((s) => !s);
    }
  };

  return (
    <div className="project-item">
      <img className="project-item-image" src={props.data.imageUrl} />
      <span className="project-item-name">{props.data.name}</span>
      <div className="project-item-tasks">
        Tasks:
        {props.data.tasks &&
          props.data.tasks.map((t) => {
            if (!t.isDone)
              return (
                <span key={t.task} className="project-item-task">
                  {t.task}
                </span>
              );
          })}
      </div>
      <span className="project-item-dueDate">
        Due Date:{' '}
        {`${new Date(props.data.dueDate).getFullYear()}-
          ${new Date(props.data.dueDate).getMonth() + 1}-
          ${new Date(props.data.dueDate).getDate()}`}
      </span>
      <button className="project-item-btn" onClick={onViewHandler}>
        View
      </button>
      |
      <button className="project-item-btn" onClick={onUpdateHandler}>
        Edit
      </button>
      |
      <button className="project-item-btn" onClick={onDeleteHandler}>
        Delete
      </button>
      <button
        className="project-item-done-btn"
        onClick={onFinishProjectHandler}
      >
        Finish
      </button>
    </div>
  );
};

export default ProjectItem;
