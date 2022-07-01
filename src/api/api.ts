const API_URL = 'https://mate.academy/students-api';

export const getTodos = ():Promise<Todo[]> => {
  return fetch(`${API_URL}/todos`)
    .then(response => response.json());
};

export const getUser = (userId: number):Promise<User> => {
  return fetch(`${API_URL}/users/${userId}`)
    .then(response => response.json());
};
