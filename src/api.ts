/* eslint-disable prefer-promise-reject-errors */
const BASE_URL = 'https://mate.academy/students-api';

export const getData = (url: string) => {
  return (fetch(`${BASE_URL}/${url}`)
    .then(resp => (resp.ok
      ? resp.json()
      : Promise.reject(`${resp.status} - ${resp.statusText}`)))
  );
};

export const getTodos = () => getData('/todos');
export const getUsers = () => getData('/users');
export const getUser = (id: number) => getData(`/users/${id}`);
