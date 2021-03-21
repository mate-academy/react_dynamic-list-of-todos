const url
  = 'https://mate-api.herokuapp.com/todos';

export const getData = () => (
  fetch(url)
    .then(response => response.json())
    .then(response => response.data)
);
