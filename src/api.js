
import { request } from './helper';

export const getTodos = () => request('/todos');

export const getUser = userId => request(`/users/${userId}`);
