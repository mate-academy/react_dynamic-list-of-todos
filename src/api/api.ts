const API_URL = 'https://mate-academy.github.io/react_dynamic-list-of-todos/api/';

export interface Users {
  id: number;
  name: string;
}

export interface Todos {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
  user?: Users;
}

export const getTodos = (): Promise<Todos[]> => {
  return fetch(`${API_URL}/todos.json`)
    .then(response => response.json())
};

export const getUsers = (): Promise<Users[]> => {
  return fetch(`${API_URL}/users.json`)
    .then(response => response.json())
};


