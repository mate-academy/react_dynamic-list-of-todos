// eslint-disable-next-line
const baseURL = 'https://mate-api.herokuapp.com/';

const getData = url => fetch(`${baseURL}${url}`)
  .then(response => response.json())
  .then(response => response.data);

export default getData;
