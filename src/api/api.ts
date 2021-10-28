const TODO_URL = 'https://mate.academy/students-api/todos';
const STUDENTS_URL = 'https://mate.academy/students-api/users/';

export const getTodos = () => {
  return fetch(TODO_URL)
    .then(response => response.json());
};

export const getUser = (userId: number) => {
  return fetch(`${STUDENTS_URL}${userId}`)
    .then(response => response.json());
};
