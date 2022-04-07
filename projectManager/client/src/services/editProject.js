import axios from 'axios';

export default async (
  id,
  imageUrl,
  name,
  description,
  tasks,
  dueDate,
  isDone = false
) => {
  console.log(tasks);
  try {
    await axios.put(`http://localhost:5000/projects/${id}`, {
      id: id,
      name: name,
      description: description,
      tasks: tasks,
      imageUrl: imageUrl,
      dueDate: dueDate,
      isDone: isDone
    });
  } catch (err) {
    console.log(err);
  }
};
