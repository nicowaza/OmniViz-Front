import axios from 'axios';
// vérifie l'existence d'une session ouverte pour l'utilisateur
export default function isAuthenticated() {
  return axios.get('http://localhost:5000', { withCredentials: true })
    .then(({ data }) => {
      console.log(data.status);
    });
}
