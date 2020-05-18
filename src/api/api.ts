const URL = 'https://jsonplaceholder.typicode.com/';


const responseTodos = () => {
  return fetch(`${URL}todos`)
    .then(response => response.json());
};

const responseUsers = () => {
  return fetch(`${URL}users`)
    .then(response => response.json());
};

export const getTodos = async () => {
  const todosData = await responseTodos();
  const usersData = await responseUsers();


  return todosData.map((todo: Todo) => {
    const userInfo = usersData.find((user: User) => todo.userId === user.id);

    return {
      ...todo,
      user: userInfo.name,
    };
  });
};

export const BUTTONS = [
  {
    name: 'title',
    text: ' Sort by Title',
  },
  {
    name: 'user',
    text: ' Sort by Name',
  },
  {
    name: 'completed',
    text: ' Sort by Completed',
  },
];
