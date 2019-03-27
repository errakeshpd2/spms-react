import axios from 'axios';
import localStore from 'store';
import { startSpinner, stopSpinner } from '../data/spinner/actions';
import store from '../store';

const { dispatch } = store;
const token = localStore.get('jwt');

axios.defaults.xsrfCookieName = 'CSRF-TOKEN';
axios.defaults.xsrfHeaderName = 'X-CSRF-Token';
axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.headers.common = {'Authorization': `bearer ${token}`}

axios.interceptors.request.use(
  config => {
    dispatch(startSpinner());
    return config;
  },
  error => {
    dispatch(stopSpinner());
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  response => {
    dispatch(stopSpinner());
    return response;
  },
  error => {
    dispatch(stopSpinner());
    return Promise.reject(error);
  }
);

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
  updateProfile: (user) => axios.put(`api/v1/users/${user.id}`, {user})
    .then(res => Promise.resolve(res))
    .catch(err => Promise.reject(err)),
  tickets: (user, page) => axios.get('api/v1/tickets', {params: { assigned_user_id: user.id }})
    .then(res => Promise.resolve(res))
    .catch(err => Promise.reject(err)),
  createTicket: (ticket) => axios.post(`api/v1/tickets/`, {ticket})
    .then(res => Promise.resolve(res))
    .catch(err => Promise.reject(err)),
  updateTicket: (ticket, ticketId) => axios.put(`api/v1/tickets/${ticketId}`, {ticket})
    .then(res => Promise.resolve(res))
    .catch(err => Promise.reject(err)),
  deleteTicket: (ticket) => axios.delete(`api/v1/tickets/${ticket.data.id}`)
    .then(res => Promise.resolve(res))
    .catch(err => Promise.reject(err)),
  ticketActivityLogs: (user, page) => axios.get('api/v1/ticket_activity_logs', {params: { user_id: user.id }})
    .then(res => Promise.resolve(res))
    .catch(err => Promise.reject(err)),
};

export default api
