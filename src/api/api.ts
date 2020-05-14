const URL = 'https://jsonplaceholder.typicode.com/';


const responceTodos = () => {
  return fetch(`${URL}todos`)
    .then(response => response.json());
};

const responceUsers = () => {
  return fetch(`${URL}users`)
    .then(response => response.json());
};

export const getTodos = async () => {
  const todosData = await responceTodos();
  const usersData = await responceUsers();


  return todosData.map((todo: Todo) => {
    const userInfo = usersData.find((user: User) => todo.userId === user.id);

    return {
      ...todo,
      user: userInfo.name,
    };
  });
};
