import axios from 'axios';

export default async (id) => {
  try {
    const result = await axios.get(`http://localhost:5000/projects/${id}`);
    return result.data;
  } catch (err) {
    console.log(err);
  }
};
