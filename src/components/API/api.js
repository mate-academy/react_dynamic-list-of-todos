const URL = 'https://mate-api.herokuapp.com';

export const request = async(endpoint = '') => {
  const response = await fetch(URL + endpoint);
  const result = await response.json();

  return result.data;
};
