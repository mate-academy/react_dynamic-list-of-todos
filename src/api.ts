const URL_USERS = 'https://jsonplaceholder.typicode.com/users';
const URL_TODO = 'https://jsonplaceholder.typicode.com/todos';

const getUsersFromServer = () => {
  return fetch(URL_USERS)
    .then(data => data.json());
};

const getTasksFromServer = () => {
  return fetch(URL_TODO)
    .then(data => data.json());
};

export const getFullTaskList = async () => {
  const users = await getUsersFromServer().then(data => data);
  const tasks = await getTasksFromServer().then(data => data);

  return tasks.map((item: TodoItem) => {
    return {
      ...item,
      user: users.find((person: User) => item.userId === person.id),
    };
  });
};
