const BASE_URL = 'https://mate-api.herokuapp.com';

export function getData(endPoint) {
  return fetch(`${BASE_URL}${endPoint}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }

      return response.json();
    });
}

export const getUsers = () => getData('/users');
export const getUser = userId => getData(`/users/${userId}`);
