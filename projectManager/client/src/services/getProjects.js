import axios from 'axios';

export default async () => {
  try {
    const result = await axios.get('http://localhost:5000/projects');
    return result.data;
  } catch (err) {
    console.log(err);
  }
}
