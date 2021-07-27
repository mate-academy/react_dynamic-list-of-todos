const todosUrl = 'https://mate-api.herokuapp.com/todos';
const userUrl = 'https://mate-api.herokuapp.com/users';

export const getTodos = async() => {
  try {
    const response = await fetch(todosUrl);
    const todo = await response.json();

    return todo.data;
  } catch {
    return 'Something wrong..';
  }
};

export function getUserInfo(id) {
  return fetch(`${userUrl}/${id}`)
    .then(result => result.json())
    .then(response => response.data);
}
