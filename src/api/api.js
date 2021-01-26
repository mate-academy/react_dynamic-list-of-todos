const BASE_URL = 'https://mate-api.herokuapp.com';
const userUrl = '/users/';
const todosUrl = '/todos';

const request = (url, option) => fetch(`${BASE_URL}${url}`, option)
  .then((response) => {
    if (!response.ok) {
      throw new Error(
        `${response.status} - ${response.statusText}`,
      );
    }

    return response.json();
  });

export const getTodos = () => request(todosUrl)
  .then(todos => todos.data);

export const getUser = (userId) => {
  const url = `${userUrl}${userId}`;

  return request(url)
    .then(user => user.data);
};
