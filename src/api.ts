import { Todo } from './types/Todo';
import { User } from './types/User';

const BASE_URL = 'https://mate.academy/students-api';

function get<T>(url: string): Promise<T> {
  return fetch(BASE_URL + url)
    .then(res => res.json());
}

export const getTodos = () => {
  return get<Todo[]>('/todos');
};

export const getUser = (userId: number | null) => {
  return get<User>(`/users/${userId}`);
};
