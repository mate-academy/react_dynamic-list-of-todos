import { request } from './helpers';

export const getTodos = () => request('/todos');
export const getUserById = userId => request(`/users/${userId}`);
