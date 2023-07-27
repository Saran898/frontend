import axios from 'axios';

// Configuration object with headers and other options
const config = {
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  withCredentials: false,
};

export function fetchRoles() {
  return axios.get('http://192.168.11.150:4000/roles');
}

export function addRole(newRole) {
  return axios.post('http://192.168.11.150:4000/roles', newRole, config);
}
