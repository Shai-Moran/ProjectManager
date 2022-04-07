import React, { useEffect, useState } from 'react';
import editProject from '../services/editProject';
import getProjectById from '../services/getProjectById';
import './styles/EditProject.css';

const EditProject = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [name, setName] = useState('');
  const [description, setDescriptione] = useState('');
  const [tasks, setTasks] = useState('');
  const [dueDate, setDueDate] = useState();

  useEffect(async () => {
    const project = await getProject();
    console.log(project);
    setImageUrl(project.imageUrl);
    setName(project.name);
    setDescriptione(project.description);
    let tasksString = '';
    for (let i = 0; i < project.tasks.length; i++) {
      const element = project.tasks[i];
      tasksString += element.task + ', ';
    }
    setTasks(tasksString);
    if (new Date(project.dueDate).getMonth() > 9) {
      setDueDate(
        `${new Date(project.dueDate).getFullYear()}-${new Date(
          project.dueDate
        ).getMonth()}-${new Date(project.dueDate).getDate()}`
      );
    } else {
      setDueDate(
        `${new Date(project.dueDate).getFullYear()}-0${new Date(
          project.dueDate
        ).getMonth()}-${new Date(project.dueDate).getDate()}`
      );
    }
  }, []);

  const getProject = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const result = await getProjectById(id);
    return result;
  };

  const onEditHandler = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const tmp = tasks.split(', ');
    let tasksArray = [];
    for (let i = 0; i < tmp.length; i++) {
      const element = tmp[i];
      tasksArray.push({
        task: element,
        isDone: false,
        doneDate: null
      });
    }
    await editProject(id, imageUrl, name, description, tasksArray, dueDate);
    window.location.href = '/';
  };

  return (
    <div className="edit_project_container">
      <h1>Edit Project</h1>
      <input
        type="text"
        placeholder="image url..."
        onChange={(e) => setImageUrl(e.target.value)}
        value={imageUrl}
      />
      <input
        type="text"
        placeholder="name..."
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      <input
        type="text"
        placeholder="description..."
        onChange={(e) => setDescriptione(e.target.value)}
        value={description}
      />
      <input
        type="text"
        placeholder="tasks..."
        onChange={(e) => setTasks(e.target.value)}
        value={tasks}
      />
      <span>enter the tasks with a ', ' between</span>
      <input
        type="date"
        onChange={(e) => setDueDate(new Date(e.target.value))}
        value={dueDate}
      />
      <button className="edit_project_btn" onClick={onEditHandler}>
        Edit Project
      </button>
    </div>
  );
};

export default EditProject;
