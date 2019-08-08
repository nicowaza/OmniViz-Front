import axios from 'axios';

export default () => {
  return axios.create({
    baseURL: process.env.AXIOS_BASE_URL,
    withCredentials: true,
    timeout: 20000,
  });
};
