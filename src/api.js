const BASE__URL = 'https://mate-api.herokuapp.com';

export const request = endPoint => new Promise((resolve, reject) => {
  fetch(`${BASE__URL}${endPoint}`)
    .then(response => resolve(response.json()));
});

export const getUser = userId => request(`/users/${userId}`);
