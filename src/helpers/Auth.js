import axios from 'axios';

// vérifie l'existence d'une session ouverte pour l'utilisateur
export default function isAuthenticated() {
  return axios.get(process.env.AXIOS_BASE_URL);
}
