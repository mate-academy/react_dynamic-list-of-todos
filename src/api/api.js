import { request } from './request';

export const getTodos = () => request('todos');
export const getUser = userId => request(`users/${userId}`);
