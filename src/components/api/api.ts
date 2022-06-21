export const urlTodos = 'https://mate.academy/students-api/todos';

export const urlUser = 'https://mate.academy/students-api/users/';

export const requestUser = (url: string) => {
  return fetch(url);
};

export const request = (url: string) => {
  return fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error('Something is wrong');
      }

      return response.json();
    });
};
