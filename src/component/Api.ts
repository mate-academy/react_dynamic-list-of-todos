const getFromServer = async (url: string) => {
  const response = await fetch(url);

  return response.json();
};

const TodosUrl = 'https://jsonplaceholder.typicode.com/todos';
const UsersUrl = 'https://jsonplaceholder.typicode.com/users';

let response: [TodoType[], UserType[]];

export const getTodos = async (): Promise<[TodoType[], UserType[]]> => {
  await Promise.all([getFromServer(TodosUrl), getFromServer(UsersUrl)]).then((values) => {
    response = values;
  });

  return response;
};
