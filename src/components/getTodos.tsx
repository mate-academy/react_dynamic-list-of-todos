import { Todo, User } from './interfaces';

const usersUrl = 'https://jsonplaceholder.typicode.com/users';
const todosUrl = 'https://jsonplaceholder.typicode.com/todos';

const getData = async (url: string) => {
  const preparedDatas = await fetch(url);
  const readyData = await preparedDatas.json();

  return readyData;
};

export const allTodosDatas = async () => {
  const usersDatas: User[] = await getData(usersUrl);
  const todosDatas: Todo[] = await getData(todosUrl);

  const allDatas = todosDatas.map((todo: Todo) => {
    const todoOwner = usersDatas.find(user => user.id === todo.userId);

    return {
      ...todo,
      user: todoOwner,
    };
  });

  return allDatas;
};
