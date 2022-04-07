import React, { useEffect, useState } from 'react';
import {
  ChartComponent,
  Inject,
  LineSeries,
  SeriesCollectionDirective,
  SeriesDirective
} from '@syncfusion/ej2-react-charts';
import getProjectById from '../services/getProjectById';
import editProject from '../services/editProject';
import './styles/ViewProject.css';

const ViewProject = () => {
  const [project, setProject] = useState();
  const [chartData, setChartData] = useState();
  useEffect(async () => {
    const proj = await getProject();
    if (proj) {
      setProject(proj);
      createChartData(proj);
    }
  }, []);

  const updateProject = async () => {
    await editProject(
      project.id,
      project.imageUrl,
      project.name,
      project.description,
      project.tasks,
      project.dueDate
    );
  };

  const taskChange = (flag, taskName) => {
    setProject((prev) => {
      var index = prev.tasks
        .map(function (e) {
          return e.task;
        })
        .indexOf(taskName);
      console.log(index, taskName);
      if (index >= 0)
        if (new Date().getMonth + 1 < 10)
          prev.tasks[index] = {
            task: taskName,
            isDone: flag,
            doneDate: `${new Date().getFullYear()}-0${
              new Date().getMonth() + 1
            }-${new Date().getDate()}`
          };
        else
          prev.tasks[index] = {
            task: taskName,
            isDone: flag,
            doneDate: `${new Date().getFullYear()}-${
              new Date().getMonth() + 1
            }-${new Date().getDate()}`
          };
      return prev;
    });
  };

  const getProject = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');
    const result = await getProjectById(id);
    return result;
  };
  const createChartData = (proj) => {
    let data = [];
    for (let i = 0; i < 14; i++) {
      let tasks = proj.tasks.length;
      var date = new Date();
      date.setDate(date.getDate() - 14 + i);
      for (let j = 0; j < proj.tasks.length; j++) {
        const task = proj.tasks[j];
        if (new Date(task.doneDate) < new Date(date) && task.doneDate !== null)
          tasks--;
      }
      data.push({
        day: i - 14,
        tasksLeft: tasks
      });
    }
    setChartData(data);
  };
  return (
    <div className="view_project">
      {project && (
        <div>
          <h1>{project.name}</h1>
          <div>
            <h3>Description:</h3>
            <span>{project.description}.</span>
          </div>
          <div>
            <h3>Tasks:</h3>
            {project.tasks.map((t) => {
              return (
                <div className="view_project_task" key={t.task}>
                  <input
                    className="view_project_task_checkbox"
                    id={t.task}
                    type="checkbox"
                    defaultChecked={t.isDone}
                    onChange={(e) => taskChange(e.target.checked, t.task)}
                  />
                  <label className="view_project_task_label" htmlFor={t.task}>
                    {t.task}
                  </label>
                </div>
              );
            })}
            <button onClick={updateProject}>save</button>
            <div>
              <h3>Due Date:</h3>
              <span>{project.dueDate}</span>
            </div>
          </div>
          <h3>Number of tasks left from the last two weeks:</h3>
          <div className="view_project_chart">
            <ChartComponent
              primaryXAxis={{ title: 'Day' }}
              primaryYAxis={{ title: 'Tasks lest' }}
            >
              <Inject services={[LineSeries]}></Inject>
              <SeriesCollectionDirective>
                <SeriesDirective
                  type="Line"
                  dataSource={chartData}
                  xName="day"
                  yName="tasksLeft"
                ></SeriesDirective>
              </SeriesCollectionDirective>
            </ChartComponent>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewProject;
