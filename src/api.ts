/* eslint-disable max-len */
/* eslint-disable prefer-promise-reject-errors */
const BASE_URL = 'https://mate-academy.github.io/react_dynamic-list-of-todos/api';

export const getData = (url: string) => {
  return (fetch(`${BASE_URL}/${url}`)
    .then(resp => (resp.ok
      ? resp.json()
      : Promise.reject(`${resp.status} - ${resp.statusText}`)))
  );
};

export const getTodos = () => getData('/todos.json');
export const getUser = (id: number) => getData(`/users/${id}.json`);
