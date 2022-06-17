const todosURL = 'https://mate.academy/students-api/todos';
const userURL = 'https://mate.academy/students-api/users/';

const request = (endPoint: string) => {
  return fetch(endPoint)
    .then(response => {
      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }

      return response.json();
    });
};

export const getTodos = () => {
  return request(todosURL);
};

export const getUser = (userId: number) => {
  return request(`${userURL}${userId}`);
};
