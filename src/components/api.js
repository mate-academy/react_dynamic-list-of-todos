const BASE_URL = 'https://mate-api.herokuapp.com/';

export const getAllTodos
  = async() => (await fetch(`${BASE_URL}todos`)).json();

export const getUser
  = async userId => (await fetch(`${BASE_URL}users/${userId}`)).json();
