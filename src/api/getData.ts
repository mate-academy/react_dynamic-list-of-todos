async function getData(url: string) {
  const response = await fetch(url);

  return response.json();
}

export const getTodos = () => {
  return getData('https://jsonplaceholder.typicode.com/todos');
};

export const getUsers = () => {
  return getData('https://jsonplaceholder.typicode.com/users');
};
