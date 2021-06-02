
const getResponse = url => fetch(url)
  .then(response => response.json())
  .then(response => response.data);

export default getResponse;
