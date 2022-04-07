import axios from 'axios';

export default async (id) => {
  try {
    const result = await axios.delete(`http://localhost:5000/projects/${id}`);
  } catch (err) {
    console.log(err);
  }
};
