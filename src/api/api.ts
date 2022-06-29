import axios from 'axios';

const API_URL = 'https://mate.academy/students-api';

export function getUsers(id: number): Promise<User> {
  return axios.get(`${API_URL}/users/${id}`)
    .then(res => res.data);
}

export function getTodos(): Promise<Todo[]> {
  return axios.get(`${API_URL}/todos`)
    .then(res => res.data);
}
