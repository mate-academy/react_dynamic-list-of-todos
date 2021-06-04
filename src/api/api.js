import { get } from './_base';

export const getTodos = () => get('/todos');

export const getUser = userId => get(`/users/${userId}`);
