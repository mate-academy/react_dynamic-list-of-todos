import { User, Todo, InterpolatingUser, InterpolatingTodo, TotalInterpolation } from '../types/types';

const BASE_URL = 'https://mate.academy/students-api';
const interpolateTodosUrl: InterpolatingTodo = (id?, completed?) => {
  if (!id) {
    return `${BASE_URL}/todos`
  }

  return `${BASE_URL}/todos?userId=${id}&completed=${completed}`;
};

const interpolateUserUrl: InterpolatingUser = (id?) => {
  if (!id) {
    return `${BASE_URL}/users`;
  }

  return `${BASE_URL}/users/${id}`;
};

export const request = (callback: TotalInterpolation, id?: number, completed?: boolean) => {
  return fetch(callback(id, completed))
    .then(response => {
      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }

      return response.json();
    });
};

export function getTodos(): Promise<Todo[]> {
  return request(interpolateTodosUrl);
};

export function getUser(userId: number): Promise<User> {
  return request(interpolateUserUrl, userId);
}

export function getUsers(): Promise<User[]> {
  return request(interpolateUserUrl)
}
