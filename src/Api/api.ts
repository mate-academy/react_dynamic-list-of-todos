export const request = (url: string) => {
  return fetch(`https://mate.academy/students-api${url}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`${response.status}-${response.statusText}`);
      }

      return response.json();
    });
};

export const getTodos = () => {
  return request('/todos');
};

export const getUserInfo = (num: number) => {
  return request(`/users/${num}`);
};
// export type { Todo } from '../components/TodoList/index';

// const API_URL = 'https://mate.academy/students-api/';
// const todosUrl = `${API_URL}todos`;
// const usersUrl = `${API_URL}users/`;

// function getAll(url:string) {
//   return fetch(url)
//     .then(response => response.json());
// }

// export function getAllTodos() {
//   return getAll(todosUrl)
//     .then(result => result);
// }

// // export function getTodosSelectedUser(idNewUser: number) {
// //   return getAll(todosUrl)
// //     .then(result => result.filter((el: any) => el.userId === idNewUser));
// // }

// export function getUserInfo(id: number) {
//   return getAll(`${usersUrl}${id}`)
//     .then(result => result);
// }
