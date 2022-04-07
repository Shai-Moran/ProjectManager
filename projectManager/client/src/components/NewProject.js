import React, { useState } from 'react';
import newProject from '../services/newProject';
import './styles/NewProject.css';

const NewProject = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [name, setName] = useState('');
  const [description, setDescriptione] = useState('');
  const [tasks, setTasks] = useState('');
  const [dueDate, setDueDate] = useState();

  const onCreateHandler = async () => {
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
    await newProject(imageUrl, name, description, tasksArray, dueDate);
    window.location.href = '/';
  };

  return (
    <div className="edit_project_container">
      <h1>New Project</h1>
      <input
        type="text"
        placeholder="image url..."
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <input
        type="text"
        placeholder="name..."
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="description..."
        onChange={(e) => setDescriptione(e.target.value)}
      />
      <input
        type="text"
        placeholder="tasks..."
        onChange={(e) => setTasks(e.target.value)}
      />
      <span>enter the tasks with a ', ' between</span>
      <input
        type="date"
        onChange={(e) => setDueDate(new Date(e.target.value))}
      />
      <button className="edit_project_btn" onClick={onCreateHandler}>
        Create Project +
      </button>
    </div>
  );
};

export default NewProject;
