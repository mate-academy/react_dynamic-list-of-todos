export const getFromServer = async (url: string) => {
  const response = await fetch(url);

  return response.json();
};
