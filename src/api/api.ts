import { Todo, User } from '../types';

const MAIN_URL = 'https://mate.academy/students-api';

export function getTodo(): Promise<Todo[]> {
  return fetch(`${MAIN_URL}/todos`)
    .then(response => {
      if (!response.ok) {
        return Promise.reject();
      }

      return response.json();
    })
    .catch(error => {
      // eslint-disable-next-line
      console.warn('Error', error);
    });
}

export function getUser(endpoint: string): Promise<User> {
  return fetch(`${MAIN_URL}/users/${endpoint}`)
    .then(response => {
      if (!response.ok) {
        return Promise.reject();
      }

      return response.json();
    })
    .catch(error => {
      // eslint-disable-next-line
      console.warn('Error', error);
    });
}
