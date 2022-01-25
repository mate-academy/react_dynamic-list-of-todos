const BASE_URL = 'https://mate.academy/students-api';

function getData(url: string) {
  return fetch(`${BASE_URL}${url}`)
    .then(response => response.json());
}

export const getTodos = ():Promise<Todo[]> => getData('/todos');
export const getUser = (userId: number):Promise<User> => getData(`/users/${userId}`);
