const mateApi = 'https://mate.academy/students-api/';

export const GetEndpoint = (name: string, id = '') => {
  return fetch(`${mateApi}${name}${id}`)
    .then(responce => responce.json());
};
