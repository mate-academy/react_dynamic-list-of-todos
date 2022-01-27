export const baseUrl = 'https://mate.academy/students-api/';

export const loadFromServer = (url = '') => {
  return fetch(`${baseUrl}${url}`).then(response => {
    if (!response.ok) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }

    return response.json();
  });
};

export const getTodos = () => {
  return loadFromServer('todos');
};

export const getUser = (userId: number) => {
  return loadFromServer(`users/${userId}`);
};
