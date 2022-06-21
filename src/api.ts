const API = 'https://mate.academy/students-api';

export const getTodos = (): Promise<Todo[]> => {
  return fetch(`${API}/todos`)
    .then(response => {
      if (!response.ok) {
        return Promise.reject();
      }

      return response.json();
    });
};

export const getUser = (id: number): Promise<User> => {
  return fetch(`${API}/users/${id}`)
    .then(response => {
      if (!response.ok) {
        return Promise.reject();
      }

      return response.json();
    });
};
