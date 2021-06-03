import { request } from './helpers';

export const getTodos = () => request('/todos');
export const getUser = userId => request(`/users/${userId}`);
