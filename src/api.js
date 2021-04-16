const BASE_URL = 'https://mate-api.herokuapp.com/';

export const request = async(url) => {
  const response = await fetch(`${BASE_URL}${url}`);

  if (!response.ok) {
    throw new Error(`Failed to load data ${url}`);
  }

  const body = await response.json();

  return body.data || body;
};
