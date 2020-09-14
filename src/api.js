
const API_URL = `https://mate-api.herokuapp.com/todos`;

export function getAll() {
  return fetch(API_URL)
    .then(response => response.json());
}

// const init = async() => {
//   const result = await getAll();
//   console.log(result);
// }

// init();
