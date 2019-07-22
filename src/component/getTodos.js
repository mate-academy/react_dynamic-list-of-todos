const getTodos = async() => {
  const responce = await fetch('https://jsonplaceholder.typicode.com/todos');
  return await responce.json();
};

export default getTodos;
