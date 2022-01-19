const BASE_URL = 'https://mate.academy/students-api';

function request(url: string) {
  return fetch(`${BASE_URL}${url}`)
    .then(response => {
      if (!response.ok) {
        return Promise.reject(new Error());
      }

      return response.json();
    });
}

export const getTodos = (): Promise<Todo[]> => request('/todos');
export const getUser = (id: number):Promise<User> => request(`/users/${id}`);
