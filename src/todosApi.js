export const loadDataFromServer = async(url) => {
  const response = await fetch(url);

  return response.json();
};
