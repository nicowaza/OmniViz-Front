import axios from 'axios';

export default () => {
  return axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true,
    timeout: 20000,
  });
};
