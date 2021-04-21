import { request } from './helper';

export const getUser = id => request(`/users/${id}`);
