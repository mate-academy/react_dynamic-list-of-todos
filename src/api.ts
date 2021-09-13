const BASE_URL = 'https://mate.academy/students-api';

const getData = (url: string) => {
  return fetch(`${BASE_URL}${url}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }

      return response.json();
    });
};

export const getTodos = (): Promise<Todo[]> => {
  return getData('/todos');
};

export const getUser = (userId: number): Promise<User> => {
  return getData(`/users/${+userId}`);
};
