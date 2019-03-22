import axios from 'axios';
import localStore from 'store';

const token = localStore.get('jwt');

axios.defaults.xsrfCookieName = 'CSRF-TOKEN';
axios.defaults.xsrfHeaderName = 'X-CSRF-Token';
axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.headers.common = {'Authorization': `bearer ${token}`}

const api = {
  login: (email, password) => axios.post('api/v1/login', {email, password, password_confirmation	: password })
    .then(res => Promise.resolve(res))
    .catch(err => Promise.reject(err)),
  validate_token: () => axios.post('api/v1/validate_token', {})
    .then(res => Promise.resolve(res))
    .catch(err => Promise.reject(err)),
  dashboard: (start_date) => axios.get('api/v1/dashboard', {params: { start_date }})
    .then(res => Promise.resolve(res))
    .catch(err => Promise.reject(err)),
};


export default api;