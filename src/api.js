const BASE_URL = 'https://mate-api.herokuapp.com';

export const ACTIVE = 'Active';
export const COMPLETED = 'Completed';

export const request = (endpoint, id) => fetch(`${BASE_URL}/${endpoint}/`)
  .then(response => response.json()).then(result => result.data);
