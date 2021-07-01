import { request } from './api';

export const getTodos = () => request('/todos');
