
const baseURL = 'https://mate-api.herokuapp.com/';

const getResponse = url => fetch(`${baseURL}${url}`)
  .then(response => response.json())
  .then(response => response.data);

export default getResponse;
