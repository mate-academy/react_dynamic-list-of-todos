import { request } from './api';

export const getUser = userId => request(`/users/${userId}`);
