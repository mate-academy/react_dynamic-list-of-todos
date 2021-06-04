import { get } from './_base';

export const getUser = userId => get(`/users/${userId}`);
