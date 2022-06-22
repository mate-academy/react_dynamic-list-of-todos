const API_URL = 'https://mate.academy/students-api';

const request = (url: string): Promise<any> => {
  return fetch(`${API_URL}${url}`)
    .then(response => response.json());
};

export const getTodos = ():Promise<Todo[]> => {
  return request('/todos')
    .then(todosFromServer => todosFromServer);
};

export const getUser = (userId: number):Promise<User> => {
  return request(`/users/${userId}`)
    .then(UserFromServer => UserFromServer);
};
