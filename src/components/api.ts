const API_URL = 'https://mate.academy/students-api/';
const todosUrl = 'todos';

export const request = (url: string) => {
  return fetch(`${API_URL}${url}`)
    .then(res => {
      if (!res.ok) {
        throw new Error(`${res.status}-${res.statusText}`);
      }

      return res.json();
    });
};

export const getTodos = (): Promise<Todo[]> => {
  return request(todosUrl);
};

export const getUser = (id:number): Promise<User> => {
  return request(`users/${id}`);
};
