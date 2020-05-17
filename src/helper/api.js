const URL_API = 'https://jsonplaceholder.typicode.com';

export const getTodos = async () => {
  const response = await fetch(`${URL_API}/todos`)
  return response.json();
}

export const getUsers = async () => {
  const response = await fetch(`${URL_API}/users`)
  return response.json();
}
