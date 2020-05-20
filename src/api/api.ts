const API_URL = 'https://jsonplaceholder.typicode.com';

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
  return fetch(`${API_URL}/todos`)
    .then(response => response.json())
};

export const getUsers = (): Promise<Users[]> => {
  return fetch(`${API_URL}/users`)
    .then(response => response.json())
};


