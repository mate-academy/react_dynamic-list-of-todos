import { request } from './api';

export function getTodos() {
  return request('/todos');
}

export function getUserById(userId) {
  return request(`/users/${userId}`);
}
