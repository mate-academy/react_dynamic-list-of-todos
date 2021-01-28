const BASE_URL = 'https://mate-api.herokuapp.com';
const userUrl = '/users/';
const todosUrl = '/todos';

const request = async(url) => {
  const response = await fetch(`${BASE_URL}${url}`);

  if (!response.ok) {
    throw new Error(
      `${response.status} - ${response.statusText}`,
    );
  }

  return response.json();
};

export const getTodos = async() => {
  const todos = await request(todosUrl);

  return todos.data;
};

export const getUser = async(userId) => {
  const url = `${userUrl}${userId}`;
  const todos = await request(url);

  return todos.data;
};
