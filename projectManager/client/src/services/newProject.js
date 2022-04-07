import axios from 'axios';
import { v4 as uuid4 } from 'uuid';

export default async (imageUrl, name, description, tasks, dueDate) => {
  try {
    await axios.post('http://localhost:5000/projects', {
      id: uuid4(),
      name: name,
      description: description,
      tasks: tasks,
      imageUrl: imageUrl,
      dueDate: dueDate,
      isDone: false
    });
  } catch (err) {
    console.log(err);
  }
};
