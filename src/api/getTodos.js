const getTodos = async() => {
  const url = 'https://jsonplaceholder.typicode.com/todos';

  return fetch(url)
    .then(response => response.json());
};

export default getTodos;
