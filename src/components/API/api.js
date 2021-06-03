export const request = async(url, endpoint = '') => {
  const response = await fetch(url + endpoint);
  const result = await response.json();

  return result.data;
};
