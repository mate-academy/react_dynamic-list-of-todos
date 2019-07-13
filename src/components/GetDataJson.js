const getDataJson = async(url) => {
  const response = await fetch(url);
  const data = await response.json();

  return data;
};

export default getDataJson;
