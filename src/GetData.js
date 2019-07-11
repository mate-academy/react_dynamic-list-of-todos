export const todosLink = 'https://jsonplaceholder.typicode.com/todos';
export const usersLink = 'https://jsonplaceholder.typicode.com/users';

export const loadData = async(link) => {
  let result = await fetch(link);
  result = await result.json();
  return result;
};
