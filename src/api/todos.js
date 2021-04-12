// import { wait } from '@testing-library/react';
import { request } from './helpers';

export const getTodos = () => request('todos');

export const getUser = userId => request(`users/${userId}`);

// export const getUserTodos = userId => request(`/users/${userId}/todos`);

// function wait(delay) {
//   return new Promise(resolve => setTimeout(resolve, delay));
// }

// export const getUsers = async () => {
//   await wait(2000);
//   return request('/Users');
// }

// export const getUser = (userId) => {
//   return request(`/users/${userId}`);
// };

// export const getUserTodos = (userId) => {
//   return request(`/users/${userId}/todos`);
// }
