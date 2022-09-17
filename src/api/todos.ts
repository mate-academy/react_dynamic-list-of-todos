import { request } from './request';

export const getTodos = (addUrl = '') => request(`/todos${addUrl}`);
