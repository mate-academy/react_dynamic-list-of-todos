// eslint-disable-next-line @typescript-eslint/naming-convention
const BASE__URL = 'https://mate.academy/students-api';

export const request = (url: string) => {
  return fetch(`${BASE__URL}${url}`)
    .then(res => {
      if (!res.ok) {
        throw new Error('Problem with loading...');
      }

      return res.json();
    });
};

export const getTodos = () => {
  return request('/todos');
};

export const getUser = (id: number) => {
  return request(`/users/${id}`);
};
